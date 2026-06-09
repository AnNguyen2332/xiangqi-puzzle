#!/usr/bin/env python3
"""
Cờ Thế — Puzzle Scraper
Scrape puzzle FEN + solution từ play.xiangqi.com
Output: puzzles.js (format tương thích với engine.js)

Cách dùng:
  pip install playwright
  playwright install chromium
  python scrape_puzzles.py --count 50 --theme checkmate
"""

import asyncio
import json
import re
import argparse
import sys
from pathlib import Path

# Windows terminal UTF-8 fix (emoji + Vietnamese in print statements)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# ── Xiangqi FEN → engine pieces[] converter ──────────────────────────────────

PIECE_MAP = {
    # Chữ hoa = Đỏ, chữ thường = Đen
    'K': ('G', 'red'),   # 将/帅
    'k': ('G', 'black'),
    'A': ('A', 'red'),   # 仕/士
    'a': ('A', 'black'),
    'B': ('E', 'red'),   # 相/象
    'b': ('E', 'black'),
    'N': ('H', 'red'),   # 傌/馬
    'n': ('H', 'black'),
    'R': ('R', 'red'),   # 俥/車
    'r': ('R', 'black'),
    'C': ('C', 'red'),   # 砲/炮
    'c': ('C', 'black'),
    'P': ('P', 'red'),   # 兵/卒
    'p': ('P', 'black'),
}

def fen_to_pieces(fen_string):
    """
    Convert Xiangqi FEN sang format pieces[] của engine.
    FEN: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w'
    row 0 = hàng trên cùng (phía Đen), row 9 = hàng dưới (phía Đỏ)
    """
    board_part = fen_string.split(' ')[0]
    turn_part  = fen_string.split(' ')[1] if ' ' in fen_string else 'w'

    rows   = board_part.split('/')
    pieces = []

    for row_idx, row in enumerate(rows):
        col_idx = 0
        for ch in row:
            if ch.isdigit():
                col_idx += int(ch)
            elif ch in PIECE_MAP:
                ptype, color = PIECE_MAP[ch]
                pieces.append({
                    'type':  ptype,
                    'color': color,
                    'col':   col_idx,
                    'row':   row_idx,
                })
                col_idx += 1

    turn = 'red' if turn_part == 'w' else 'black'
    return pieces, turn


def iccs_to_move(iccs):
    """
    Convert ICCS move string sang {fromCol, fromRow, toCol, toRow}.
    ICCS format: 'a0b1' = cột a (0) hàng 0 → cột b (1) hàng 1
    Xiangqi ICCS: cột a-i (0-8), hàng 0-9 (bottom=0 cho đỏ, nhưng trong FEN row 0=top)
    """
    col_map = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4,
               'f': 5, 'g': 6, 'h': 7, 'i': 8}
    try:
        fc = col_map[iccs[0].lower()]
        fr = 9 - int(iccs[1])   # ICCS row 0=bottom → engine row 9=bottom
        tc = col_map[iccs[2].lower()]
        tr = 9 - int(iccs[3])
        return {'fromCol': fc, 'fromRow': fr, 'toCol': tc, 'toRow': tr}
    except Exception:
        return None


# ── Scraper ───────────────────────────────────────────────────────────────────

async def scrape_xiangqi_puzzles(count=20, theme='checkmate', headless=True):
    """
    Scrape puzzles từ play.xiangqi.com bằng Playwright.
    Intercept network requests để lấy raw API data (FEN + solution).
    """
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("❌ Playwright chưa được cài. Chạy: pip install playwright && playwright install chromium")
        sys.exit(1)

    puzzles = []
    api_responses = []

    print(f"🔍 Bắt đầu scrape {count} puzzle (theme: {theme})...")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=headless)
        context = await browser.new_context(
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        )
        page = await context.new_page()

        # ── Intercept API responses ──────────────────────────────────────────
        async def handle_response(response):
            url = response.url
            # Tìm API trả về puzzle data (FEN, moves)
            if any(kw in url for kw in ['puzzle', 'problem', 'endgame', 'fen']):
                try:
                    body = await response.json()
                    api_responses.append({'url': url, 'data': body})
                    print(f"  📡 API hit: {url[:80]}")
                except Exception:
                    pass

        page.on('response', handle_response)

        # ── Navigate đến trang puzzle ────────────────────────────────────────
        print("  🌐 Đang mở play.xiangqi.com/puzzle ...")
        try:
            await page.goto('https://play.xiangqi.com/puzzle?lang=vi', timeout=30000)
            await page.wait_for_timeout(3000)
        except Exception as e:
            print(f"  ⚠️  Không load được trang: {e}")
            print("  💡 Thử chạy với --no-headless để debug")
            await browser.close()
            return []

        # ── Lấy FEN từ page source hoặc JS state ────────────────────────────
        print("  🔎 Đang tìm puzzle data trong trang...")

        # Thử extract từ window state / React props
        fen_data = await page.evaluate("""
            () => {
                // Tìm FEN trong window object
                const keys = Object.keys(window);
                for (const k of keys) {
                    try {
                        const v = JSON.stringify(window[k]);
                        if (v && v.includes('fen') && v.length < 50000) return {key: k, val: v};
                    } catch(e) {}
                }
                // Tìm trong DOM
                const texts = Array.from(document.querySelectorAll('*'))
                    .map(el => el.getAttribute('data-fen') || el.getAttribute('data-position'))
                    .filter(Boolean);
                return texts.length ? {dom: texts} : null;
            }
        """)

        if fen_data:
            print(f"  ✅ Tìm thấy data: {str(fen_data)[:100]}")

        # ── Đếm số puzzle đã click qua ──────────────────────────────────────
        collected_fens = set()

        for i in range(count + 5):  # Click thêm để bù cho puzzle bị lỗi
            if len(puzzles) >= count:
                break

            # Chụp URL hiện tại để extract puzzle ID
            current_url = page.url
            puzzle_id_match = re.search(r'/puzzle/(\d+)', current_url)
            puzzle_id = int(puzzle_id_match.group(1)) if puzzle_id_match else i + 1

            # Lấy FEN từ page
            fen = await page.evaluate("""
                () => {
                    // Thử nhiều selector phổ biến của React chess apps
                    const candidates = [
                        document.querySelector('[data-fen]')?.dataset?.fen,
                        document.querySelector('[data-position]')?.dataset?.position,
                        window.__NEXT_DATA__?.props?.pageProps?.puzzle?.fen,
                        window.__REDUX_STATE__?.puzzle?.current?.fen,
                    ];
                    return candidates.find(Boolean) || null;
                }
            """)

            # Lấy solution
            solution_raw = await page.evaluate("""
                () => {
                    return window.__NEXT_DATA__?.props?.pageProps?.puzzle?.moves
                        || window.__REDUX_STATE__?.puzzle?.current?.moves
                        || null;
                }
            """)

            # Lấy thông tin từ API responses đã intercept
            if api_responses and not fen:
                for resp in reversed(api_responses):
                    data = resp['data']
                    if isinstance(data, dict):
                        fen = data.get('fen') or data.get('position') or data.get('board')
                        solution_raw = solution_raw or data.get('moves') or data.get('solution')

            if fen and fen not in collected_fens:
                collected_fens.add(fen)
                pieces, turn = fen_to_pieces(fen)

                # Parse solution moves
                solution = []
                if solution_raw:
                    move_strings = solution_raw if isinstance(solution_raw, list) else solution_raw.split()
                    for mv in move_strings:
                        parsed = iccs_to_move(mv)
                        if parsed:
                            solution.append(parsed)

                # Đếm số nước chiếu hết
                moves_to_mate = len([m for idx, m in enumerate(solution) if idx % 2 == 0])

                puzzle = {
                    'id':          puzzle_id,
                    'title':       f"Chiếu tướng trong {moves_to_mate} nước",
                    'movesToMate': moves_to_mate,
                    'turn':        turn,
                    'fen':         fen,
                    'pieces':      pieces,
                    'solution':    solution,
                }
                puzzles.append(puzzle)
                print(f"  ✅ Puzzle {len(puzzles)}/{count}: {puzzle['title']} (FEN: {fen[:40]}...)")

            # Click nút "puzzle tiếp theo"
            try:
                next_btn = await page.query_selector('button:has-text("Next"), button:has-text("Tiếp"), [data-testid="next-puzzle"]')
                if next_btn:
                    await next_btn.click()
                    await page.wait_for_timeout(1500)
                else:
                    # Thử navigate trực tiếp
                    await page.goto(f'https://play.xiangqi.com/puzzle/{puzzle_id + 1}?lang=vi', timeout=15000)
                    await page.wait_for_timeout(1500)
            except Exception as e:
                print(f"  ⚠️  Lỗi khi chuyển puzzle: {e}")
                break

        await browser.close()

    print(f"\n📦 Đã scrape được {len(puzzles)} puzzle")
    return puzzles


# ── Output formatter ──────────────────────────────────────────────────────────

def format_puzzles_js(puzzles):
    """Xuất ra format puzzles.js tương thích với game engine."""
    lines = [
        '// puzzles.js — Generated by scrape_puzzles.py',
        '// Source: play.xiangqi.com',
        '',
        'export const PUZZLES = [',
    ]

    for p in puzzles:
        pieces_str = json.dumps(p['pieces'], ensure_ascii=False)
        solution_str = json.dumps(p['solution'], ensure_ascii=False)
        lines += [
            '  {',
            f"    id: {p['id']},",
            f"    title: \"{p['title']}\",",
            f"    movesToMate: {p['movesToMate']},",
            f"    turn: \"{p['turn']}\",",
            f"    // FEN: {p['fen']}",
            f"    pieces: {pieces_str},",
            f"    solution: {solution_str},",
            '  },',
        ]

    lines += ['];', '']
    return '\n'.join(lines)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Scrape Xiangqi puzzles từ play.xiangqi.com')
    parser.add_argument('--count',      type=int, default=20,          help='Số puzzle cần scrape (default: 20)')
    parser.add_argument('--theme',      type=str, default='checkmate', help='checkmate | tactics (default: checkmate)')
    parser.add_argument('--out',        type=str, default='puzzles.js', help='File output (default: puzzles.js)')
    parser.add_argument('--no-headless',action='store_true',           help='Hiện browser (để debug)')
    parser.add_argument('--json',       action='store_true',           help='Xuất JSON thay vì JS')
    args = parser.parse_args()

    puzzles = asyncio.run(scrape_xiangqi_puzzles(
        count    = args.count,
        theme    = args.theme,
        headless = not args.no_headless,
    ))

    if not puzzles:
        print("\n⚠️  Không scrape được puzzle nào.")
        print("Nguyên nhân thường gặp:")
        print("  1. Trang dùng authentication — thêm cookie vào script")
        print("  2. JavaScript chưa render xong — thử --no-headless để xem")
        print("  3. API endpoint đã thay đổi — cần inspect lại Network tab")
        print("\n💡 Thay thế: dùng --json để thử export raw API responses")
        sys.exit(1)

    out_path = Path(args.out)

    if args.json:
        out_path = out_path.with_suffix('.json')
        out_path.write_text(json.dumps(puzzles, ensure_ascii=False, indent=2))
    else:
        out_path.write_text(format_puzzles_js(puzzles), encoding='utf-8')

    print(f"✅ Đã lưu {len(puzzles)} puzzle vào {out_path}")


if __name__ == '__main__':
    main()
