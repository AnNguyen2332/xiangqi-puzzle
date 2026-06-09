#!/usr/bin/env python3
"""
Cờ Thế — Fast Puzzle Scraper (pure HTTP, no browser per puzzle)
Flow: guest_jwt → POST challenge → GET puzzle/C/{id} → repeat

Filter: theme=1 (checkmate), player_turn=1 (human first), FEN 'b' (black to move)

All checkmate puzzles on this site have black moving first and RED winning.
The model_answer is: [black_auto, red_attack, black_defense, ..., red_checkmate].

Strategy: apply the initial black auto-move to get a clean board state where
it is RED's turn.  Trim solution to solution[1:].  The puzzle is now identical
in format to a standard 'turn: red' puzzle — no flip needed.
"""
import sys, json, time, argparse
from pathlib import Path
from datetime import date
import requests

if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')

BASE = 'https://api.xiangqi.com'
HEADERS = {
    'Origin':       'https://play.xiangqi.com',
    'Referer':      'https://play.xiangqi.com/',
    'User-Agent':   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept':       'application/json',
    'Content-Type': 'application/json',
}

PIECE_MAP = {
    'K':('G','red'),  'k':('G','black'),
    'A':('A','red'),  'a':('A','black'),
    'B':('E','red'),  'b':('E','black'),
    'N':('H','red'),  'n':('H','black'),
    'R':('R','red'),  'r':('R','black'),
    'C':('C','red'),  'c':('C','black'),
    'P':('P','red'),  'p':('P','black'),
}
COL_MAP = {'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7,'i':8}


def fen_to_pieces(fen_string):
    board_part = fen_string.split()[0]
    turn_part  = fen_string.split()[1] if ' ' in fen_string else 'w'
    rows, pieces = board_part.split('/'), []
    for row_idx, row in enumerate(rows):
        col_idx = 0
        for ch in row:
            if ch.isdigit(): col_idx += int(ch)
            elif ch in PIECE_MAP:
                ptype, color = PIECE_MAP[ch]
                pieces.append({'type':ptype,'color':color,'col':col_idx,'row':row_idx})
                col_idx += 1
    return pieces, ('red' if turn_part == 'w' else 'black')


def iccs_to_move(s):
    try:
        return {'fromCol':COL_MAP[s[0].lower()],'fromRow':9-int(s[1]),
                'toCol':COL_MAP[s[2].lower()],'toRow':9-int(s[3])}
    except: return None


def apply_move(pieces, move):
    """Apply a single move to the pieces list (trusts the API's validity).
    Removes any captured piece at the destination, then moves the source piece."""
    fc, fr = move['fromCol'], move['fromRow']
    tc, tr = move['toCol'],   move['toRow']
    result = []
    for p in pieces:
        if p['col'] == tc and p['row'] == tr:
            continue                        # captured piece — remove it
        if p['col'] == fc and p['row'] == fr:
            result.append({**p, 'col': tc, 'row': tr})  # moved piece
        else:
            result.append(p)
    return result


# ── HTTP helpers ──────────────────────────────────────────────────────────────

def get_jwt(session):
    r = session.post(f'{BASE}/api/users/guest_jwt', json={}, timeout=10)
    r.raise_for_status()
    data = r.json()
    jwt  = data['jwt']
    session.headers['Authorization'] = f'Bearer {jwt}'
    print(f'JWT obtained: {data["identity"]}')
    return jwt

def get_challenge(session, seen_ids):
    body = {
        'guest_real_rating':      700,
        'guest_face_rating':      700,
        'previous_puzzle_ids':    list(seen_ids),
        'go_easy_puzzles_used_today': 0,
        'go_easy_last_reset_date': str(date.today()),
    }
    r = session.post(f'{BASE}/api/puzzle/challenge', json=body, timeout=10)
    if r.status_code != 200:
        return None
    return r.json().get('puzzle_id')

def get_puzzle(session, pid):
    r = session.get(f'{BASE}/api/puzzle/C/{pid}', timeout=10)
    if r.status_code != 200:
        return None
    data = r.json()
    if 'message' in data:
        return None
    return data


# ── Main scraper ──────────────────────────────────────────────────────────────

def scrape(count=50, max_attempts=500, init_seen=None):
    session = requests.Session()
    session.headers.update(HEADERS)
    get_jwt(session)

    puzzles  = []
    seen_ids = set(init_seen or [])   # pre-seed with excluded IDs
    skipped  = {'theme':0,'turn':0,'nodata':0,'dup':0,'noparse':0,'err':0}
    attempts = 0

    print(f'Collecting {count} checkmate puzzles (player_turn=1, fen=b, red wins)...')
    print('─' * 60)

    while len(puzzles) < count and attempts < max_attempts:
        attempts += 1

        pid = get_challenge(session, seen_ids)
        if not pid:
            skipped['err'] += 1
            time.sleep(0.5)
            continue

        if pid in seen_ids:
            skipped['dup'] += 1
            continue
        seen_ids.add(pid)

        raw = get_puzzle(session, pid)
        if not raw:
            skipped['nodata'] += 1
            continue

        # Filter: checkmate + human-first + black starts in FEN
        # These puzzles have the format: [black_auto, red_attack, ..., red_checkmate]
        if raw.get('theme') != 1:
            skipped['theme'] += 1
            continue
        if raw.get('player_turn') != 1:
            skipped['turn'] += 1
            continue
        fen = raw.get('initial_fen', '')
        fen_side = fen.split()[1] if ' ' in fen else '?'
        if fen_side != 'b':
            skipped['turn'] += 1
            continue

        model_answer = raw.get('model_answer', [])
        if not fen or not model_answer:
            skipped['nodata'] += 1
            continue

        # Need at least 2 moves: 1 black auto-move + 1 red checkmate
        if len(model_answer) < 2:
            skipped['noparse'] += 1
            continue

        pieces, _turn = fen_to_pieces(fen)
        full_solution = [m for m in (iccs_to_move(mv) for mv in model_answer) if m]
        if len(full_solution) < 2:
            skipped['noparse'] += 1
            continue

        # Apply the first black auto-move to advance the board to red's turn
        auto_move = full_solution[0]
        pieces    = apply_move(pieces, auto_move)
        solution  = full_solution[1:]   # red's moves start here
        turn      = 'red'               # it's now red's turn

        moves_to_mate = (len(solution) + 1) // 2

        puzzles.append({
            'id':          len(puzzles) + 1,
            'puzzle_id':   pid,
            'title':       f'Chiếu hết trong {moves_to_mate} nước',
            'movesToMate': moves_to_mate,
            'turn':        turn,
            'fen':         fen,          # kept for reference (pre-auto-move)
            'pieces':      pieces,       # board state AFTER black's auto-move
            'solution':    solution,     # [red_attack, black_defense, ..., red_checkmate]
            'rating':      raw.get('rating', 0),
        })
        print(f'  [{len(puzzles):3}/{count}] {pid}  mate-in-{moves_to_mate}'
              f'  rating={raw.get("rating","?")}  fen=...{fen[15:50]}...')

        time.sleep(0.1)

    print()
    print(f'Done: {len(puzzles)} puzzles in {attempts} attempts')
    print(f'Skipped — theme:{skipped["theme"]}  turn:{skipped["turn"]}  '
          f'dup:{skipped["dup"]}  nodata:{skipped["nodata"]}  '
          f'noparse:{skipped["noparse"]}  err:{skipped["err"]}')
    return puzzles


# ── Output formatter ──────────────────────────────────────────────────────────

def format_js(puzzles):
    lines = [
        '// puzzles.js — generated by scrape_fast.py',
        '// Source: play.xiangqi.com  Theme: checkmate  Turn: red',
        '',
        'export const PUZZLES = [',
    ]
    for p in puzzles:
        lines += [
            '  {',
            f'    id: {p["id"]},',
            f'    title: "{p["title"]}",',
            f'    movesToMate: {p["movesToMate"]},',
            f'    turn: "{p["turn"]}",',
            f'    // fen: {p["fen"]}  (position before black auto-move)',
            f'    // source: {p["puzzle_id"]}  rating: {p.get("rating",0)}',
            f'    pieces: {json.dumps(p["pieces"], ensure_ascii=False)},',
            f'    solution: {json.dumps(p["solution"])},',
            '  },',
        ]
    lines += ['];', '']
    return '\n'.join(lines)


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--count',        type=int, default=50)
    parser.add_argument('--out',          type=str, default='puzzles_scraped.js')
    parser.add_argument('--exclude-json', type=str, default=None,
                        help='JSON file of previously scraped puzzles whose IDs to exclude')
    args = parser.parse_args()

    init_seen = set()
    if args.exclude_json:
        try:
            prev = json.loads(Path(args.exclude_json).read_text(encoding='utf-8'))
            init_seen = {p['puzzle_id'] for p in prev}
            print(f'Excluding {len(init_seen)} previously scraped IDs from {args.exclude_json}')
        except Exception as e:
            print(f'Warning: could not read exclude file: {e}')

    puzzles = scrape(count=args.count, init_seen=init_seen)
    if not puzzles:
        print('ERROR: no puzzles collected'); sys.exit(1)

    out = Path(args.out)
    out.write_text(format_js(puzzles), encoding='utf-8')
    print(f'Saved {len(puzzles)} puzzles -> {out}')

    raw_out = out.with_suffix('.json')
    raw_out.write_text(json.dumps(puzzles, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Raw JSON -> {raw_out}')

main()
