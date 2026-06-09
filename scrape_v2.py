#!/usr/bin/env python3
"""
Cờ Thế — Puzzle Scraper v2
Uses real API: /api/puzzle/challenge + /api/puzzle/C/{id}
theme=1 (CHECKMATE only), player_turn=2 (Red to move)
"""
import asyncio, json, sys, time
from pathlib import Path
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'): sys.stderr.reconfigure(encoding='utf-8')

PIECE_MAP = {
    'K': ('G','red'),  'k': ('G','black'),
    'A': ('A','red'),  'a': ('A','black'),
    'B': ('E','red'),  'b': ('E','black'),
    'N': ('H','red'),  'n': ('H','black'),
    'R': ('R','red'),  'r': ('R','black'),
    'C': ('C','red'),  'c': ('C','black'),
    'P': ('P','red'),  'p': ('P','black'),
}

def fen_to_pieces(fen_string):
    board_part = fen_string.split(' ')[0]
    turn_part  = fen_string.split(' ')[1] if ' ' in fen_string else 'w'
    rows, pieces = board_part.split('/'), []
    for row_idx, row in enumerate(rows):
        col_idx = 0
        for ch in row:
            if ch.isdigit():
                col_idx += int(ch)
            elif ch in PIECE_MAP:
                ptype, color = PIECE_MAP[ch]
                pieces.append({'type': ptype, 'color': color, 'col': col_idx, 'row': row_idx})
                col_idx += 1
    return pieces, ('red' if turn_part == 'w' else 'black')

COL_MAP = {'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7,'i':8}
def iccs_to_move(s):
    try:
        return {
            'fromCol': COL_MAP[s[0].lower()],
            'fromRow': 9 - int(s[1]),
            'toCol':   COL_MAP[s[2].lower()],
            'toRow':   9 - int(s[3]),
        }
    except:
        return None

# ─────────────────────────────────────────────────────────────────────────────

async def scrape(count=50, max_attempts=300):
    from playwright.async_api import async_playwright

    puzzles    = []
    seen_ids   = set()
    api_calls  = []   # (url, body) of puzzle C/ responses

    # We intercept /api/puzzle/C/ responses while cycling through puzzles
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        page = await context.new_page()

        # ── Intercept puzzle API responses ──────────────────────────────────
        async def on_response(response):
            url = response.url
            if '/api/puzzle/C/' in url:
                try:
                    body = await response.body()
                    api_calls.append(json.loads(body.decode('utf-8')))
                except:
                    pass

        page.on('response', on_response)

        # ── Load lobby + enter puzzle mode ──────────────────────────────────
        print('Loading puzzle lobby...')
        await page.goto('https://play.xiangqi.com/puzzle', timeout=30000)
        await page.wait_for_timeout(2000)

        print('Entering Play Puzzle...')
        btn = await page.query_selector('.puzzle-room-btn.primary-btn')
        if btn:
            await btn.click()
            await page.wait_for_timeout(3000)
        print(f'URL: {page.url}')

        # ── Cycle through puzzles ────────────────────────────────────────────
        attempts = 0
        while len(puzzles) < count and attempts < max_attempts:
            attempts += 1
            # Drain any freshly intercepted API responses
            while api_calls:
                raw = api_calls.pop(0)
                pid = raw.get('puzzle_id', '')
                if pid in seen_ids:
                    continue
                # Filter: checkmate (theme=1) + red to move (player_turn=2)
                if raw.get('theme') != 1:
                    print(f'  skip {pid}: theme={raw.get("theme")} (want 1=checkmate)')
                    continue
                if raw.get('player_turn') != 2:
                    print(f'  skip {pid}: player_turn={raw.get("player_turn")} (want 2=red)')
                    continue

                fen = raw.get('initial_fen', '')
                model_answer = raw.get('model_answer', [])
                full_moves   = raw.get('full_moves', 0)  # red moves to mate

                if not fen or not model_answer:
                    print(f'  skip {pid}: missing fen or moves')
                    continue

                pieces, turn = fen_to_pieces(fen)
                solution = [m for m in (iccs_to_move(mv) for mv in model_answer) if m]

                if not solution:
                    print(f'  skip {pid}: could not parse moves {model_answer}')
                    continue

                # moves_to_mate = red moves in solution = ceil(total/2)
                moves_to_mate = (len(solution) + 1) // 2

                seen_ids.add(pid)
                puzzles.append({
                    'id':          len(puzzles) + 1,
                    'puzzle_id':   pid,
                    'title':       f'Chieu het trong {moves_to_mate} nuoc',
                    'movesToMate': moves_to_mate,
                    'turn':        turn,
                    'fen':         fen,
                    'pieces':      pieces,
                    'solution':    solution,
                })
                print(f'  [{len(puzzles)}/{count}] {pid} '
                      f'theme=checkmate player=red '
                      f'moves_to_mate={moves_to_mate}')

            if len(puzzles) >= count:
                break

            # ── Click "Skip" or "Next puzzle" to advance ──────────────────
            advanced = False
            for sel in [
                'button:has-text("Skip")',
                'button:has-text("Next")',
                'button:has-text("Tiep")',
                '[data-testid="next-puzzle"]',
                '[data-testid="skip-puzzle"]',
                '.skip-btn', '.next-puzzle-btn',
                'button:has-text("Go Easy")',
            ]:
                try:
                    el = await page.query_selector(sel)
                    if el:
                        await el.click()
                        await page.wait_for_timeout(2000)
                        advanced = True
                        break
                except:
                    pass

            if not advanced:
                # Try navigating to main puzzle page again to get a new challenge
                await page.goto('https://play.xiangqi.com/puzzle', timeout=15000)
                await page.wait_for_timeout(1000)
                btn = await page.query_selector('.puzzle-room-btn.primary-btn')
                if btn:
                    await btn.click()
                    await page.wait_for_timeout(2500)
                else:
                    print(f'  attempt {attempts}: no navigation found, waiting...')
                    await page.wait_for_timeout(2000)

        await browser.close()

    print(f'\nDone: {len(puzzles)} checkmate puzzles collected after {attempts} attempts')
    return puzzles


def format_js(puzzles):
    lines = [
        '// puzzles.js — generated by scrape_v2.py',
        '// Source: play.xiangqi.com  Theme: checkmate  Turn: red',
        '',
        'export const PUZZLES = [',
    ]
    for p in puzzles:
        title = p['title'].replace('Chieu het trong', 'Chiều hết trong').replace('nuoc', 'nước')
        lines += [
            '  {',
            f'    id: {p["id"]},',
            f'    title: "{title}",',
            f'    movesToMate: {p["movesToMate"]},',
            f'    turn: "{p["turn"]}",',
            f'    // fen: {p["fen"]}',
            f'    // source: {p["puzzle_id"]}',
            f'    pieces: {json.dumps(p["pieces"], ensure_ascii=False)},',
            f'    solution: {json.dumps(p["solution"])},',
            '  },',
        ]
    lines += ['];', '']
    return '\n'.join(lines)


async def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--count', type=int, default=50)
    parser.add_argument('--out',   type=str, default='puzzles_scraped.js')
    args = parser.parse_args()

    puzzles = await scrape(count=args.count)

    if not puzzles:
        print('ERROR: no puzzles collected')
        sys.exit(1)

    out = Path(args.out)
    out.write_text(format_js(puzzles), encoding='utf-8')
    print(f'Saved {len(puzzles)} puzzles to {out}')

    # Also save raw JSON for verification
    raw_out = out.with_suffix('.json')
    raw_out.write_text(json.dumps(puzzles, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Raw JSON saved to {raw_out}')

asyncio.run(main())
