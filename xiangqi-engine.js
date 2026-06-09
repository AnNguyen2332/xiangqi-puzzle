/**
 * Xiangqi (Chinese Chess) game engine
 *
 * Board coordinates: col 0–8 (left→right), row 0–9 (top→bottom)
 *   row 0 = Black's back rank, row 9 = Red's back rank
 *   River runs between rows 4 and 5
 *
 * Piece types (internal): G A E H R C P
 *   G = General (将/帅)    A = Advisor (士/仕)    E = Elephant (象/相)
 *   H = Horse   (馬/马)    R = Chariot (車/车)    C = Cannon   (炮/砲)
 *   P = Pawn    (卒/兵)
 */

// ── Constants ────────────────────────────────────────────────────────────────

export const COLORS = { RED: 'red', BLACK: 'black' };

/** Maps any Chinese piece character to its internal piece type. */
export const CHAR_TO_TYPE = {
  '将': 'G', '將': 'G',
  '仕': 'A', '士': 'A',
  '相': 'E', '象': 'E',
  '傌': 'H', '馬': 'H', '马': 'H',
  '俥': 'R', '車': 'R', '车': 'R',
  '砲': 'C', '炮': 'C',
  '兵': 'P', '卒': 'P',
};

/** Display characters by color and type. */
export const PIECE_CHARS = {
  red:   { G: '将', A: '仕', E: '相', H: '傌', R: '俥', C: '砲', P: '兵' },
  black: { G: '將', A: '士', E: '象', H: '馬', R: '車', C: '炮', P: '卒' },
};

// Palace bounds (col 3–5; rows differ by side)
const PALACE = {
  red:   { rMin: 7, rMax: 9, cMin: 3, cMax: 5 },
  black: { rMin: 0, rMax: 2, cMin: 3, cMax: 5 },
};

// ── Board helpers ─────────────────────────────────────────────────────────────

function inBounds(col, row) {
  return col >= 0 && col <= 8 && row >= 0 && row <= 9;
}

function inPalace(col, row, color) {
  const p = PALACE[color];
  return col >= p.cMin && col <= p.cMax && row >= p.rMin && row <= p.rMax;
}

/** Has this pawn crossed the river? */
function crossedRiver(col, row, color) {
  return color === 'red' ? row < 5 : row > 4;
}

/** Collect pieces strictly between two squares on the same rank or file. */
function piecesBetween(board, c1, r1, c2, r2) {
  const result = [];
  if (c1 === c2) {
    const lo = Math.min(r1, r2), hi = Math.max(r1, r2);
    for (let r = lo + 1; r < hi; r++) if (board[r][c1]) result.push({ col: c1, row: r });
  } else if (r1 === r2) {
    const lo = Math.min(c1, c2), hi = Math.max(c1, c2);
    for (let c = lo + 1; c < hi; c++) if (board[r1][c]) result.push({ col: c, row: r1 });
  }
  return result;
}

// ── Pseudo-legal move generators ─────────────────────────────────────────────
// These do NOT check whether the move leaves own king in check.

function generalMoves(board, col, row, color) {
  const moves = [];
  for (const [dc, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) {
    const nc = col + dc, nr = row + dr;
    if (!inPalace(nc, nr, color)) continue;
    const target = board[nr]?.[nc];
    if (target?.color === color) continue;
    moves.push({ col: nc, row: nr });
  }
  return moves;
}

function advisorMoves(board, col, row, color) {
  const moves = [];
  for (const [dc, dr] of [[1,1],[1,-1],[-1,1],[-1,-1]]) {
    const nc = col + dc, nr = row + dr;
    if (!inPalace(nc, nr, color)) continue;
    const target = board[nr]?.[nc];
    if (target?.color === color) continue;
    moves.push({ col: nc, row: nr });
  }
  return moves;
}

function elephantMoves(board, col, row, color) {
  const moves = [];
  for (const [dc, dr] of [[2,2],[2,-2],[-2,2],[-2,-2]]) {
    const nc = col + dc, nr = row + dr;
    if (!inBounds(nc, nr)) continue;
    // Blocked by river
    if (color === 'red' && nr < 5) continue;
    if (color === 'black' && nr > 4) continue;
    // "Elephant's eye" – midpoint must be empty
    if (board[row + dr / 2][col + dc / 2]) continue;
    const target = board[nr][nc];
    if (target?.color === color) continue;
    moves.push({ col: nc, row: nr });
  }
  return moves;
}

function horseMoves(board, col, row, color) {
  const moves = [];
  // For each orthogonal "leg", if unblocked, add the two diagonal endpoints
  const directions = [
    { leg: [0,-1], ends: [[-1,-2],[1,-2]] },
    { leg: [0, 1], ends: [[-1, 2],[1, 2]] },
    { leg: [-1,0], ends: [[-2,-1],[-2, 1]] },
    { leg: [ 1,0], ends: [[ 2,-1],[ 2, 1]] },
  ];
  for (const { leg: [lc, lr], ends } of directions) {
    if (board[row + lr]?.[col + lc]) continue; // leg blocked
    for (const [dc, dr] of ends) {
      const nc = col + dc, nr = row + dr;
      if (!inBounds(nc, nr)) continue;
      const target = board[nr][nc];
      if (target?.color === color) continue;
      moves.push({ col: nc, row: nr });
    }
  }
  return moves;
}

function chariotMoves(board, col, row, color) {
  const moves = [];
  for (const [dc, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) {
    let nc = col + dc, nr = row + dr;
    while (inBounds(nc, nr)) {
      const target = board[nr][nc];
      if (!target) {
        moves.push({ col: nc, row: nr });
      } else {
        if (target.color !== color) moves.push({ col: nc, row: nr }); // capture
        break;
      }
      nc += dc; nr += dr;
    }
  }
  return moves;
}

function cannonMoves(board, col, row, color) {
  const moves = [];
  for (const [dc, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) {
    let nc = col + dc, nr = row + dr;
    let foundPlatform = false;
    while (inBounds(nc, nr)) {
      const target = board[nr][nc];
      if (!foundPlatform) {
        if (!target) {
          moves.push({ col: nc, row: nr }); // slide
        } else {
          foundPlatform = true; // this piece is the "platform"
        }
      } else {
        if (target) {
          if (target.color !== color) moves.push({ col: nc, row: nr }); // capture over platform
          break;
        }
      }
      nc += dc; nr += dr;
    }
  }
  return moves;
}

function pawnMoves(board, col, row, color) {
  const moves = [];
  const forward = color === 'red' ? -1 : 1; // red moves up (row↓), black moves down (row↑)

  // Always advance forward
  const fr = row + forward;
  if (inBounds(col, fr) && board[fr]?.[col]?.color !== color) {
    moves.push({ col, row: fr });
  }

  // Lateral moves only after crossing river
  if (crossedRiver(col, row, color)) {
    for (const dc of [-1, 1]) {
      const nc = col + dc;
      if (inBounds(nc, row) && board[row][nc]?.color !== color) {
        moves.push({ col: nc, row });
      }
    }
  }

  return moves;
}

// ── Engine class ──────────────────────────────────────────────────────────────

export class XiangqiEngine {
  constructor() {
    /** @type {(null | {type:string, color:string})[][]} 10×9 */
    this.board = this._emptyBoard();
    this.currentTurn = 'red';
    /** @type {{fromCol,fromRow,toCol,toRow,piece,captured}[]} */
    this.moveHistory = [];
  }

  _emptyBoard() {
    return Array.from({ length: 10 }, () => Array(9).fill(null));
  }

  // ── Piece access ──────────────────────────────────────────────────

  pieceAt(col, row) {
    return inBounds(col, row) ? this.board[row][col] : null;
  }

  _set(col, row, piece) { this.board[row][col] = piece; }

  // ── Setup ─────────────────────────────────────────────────────────

  /**
   * Load an arbitrary position.
   * @param {{type:string, color:string, col:number, row:number}[]} pieces
   */
  setupPosition(pieces, turn = 'red') {
    this.board = this._emptyBoard();
    this.moveHistory = [];
    this.currentTurn = turn;
    for (const { type, color, col, row } of pieces) {
      this.board[row][col] = { type, color };
    }
  }

  /** Set up the standard opening position. */
  setupStandard() {
    const back = ['R','H','E','A','G','A','E','H','R'];
    this.board = this._emptyBoard();
    this.moveHistory = [];
    this.currentTurn = 'red';

    back.forEach((type, col) => {
      this.board[0][col] = { type, color: 'black' };
      this.board[9][col] = { type, color: 'red' };
    });
    [1, 7].forEach(col => {
      this.board[2][col] = { type: 'C', color: 'black' };
      this.board[7][col] = { type: 'C', color: 'red' };
    });
    [0, 2, 4, 6, 8].forEach(col => {
      this.board[3][col] = { type: 'P', color: 'black' };
      this.board[6][col] = { type: 'P', color: 'red' };
    });
  }

  // ── Move generation ───────────────────────────────────────────────

  /** Pseudo-legal moves (ignore self-check). */
  pseudoMoves(col, row) {
    const piece = this.pieceAt(col, row);
    if (!piece) return [];
    const { type, color } = piece;
    const b = this.board;
    switch (type) {
      case 'G': return generalMoves(b, col, row, color);
      case 'A': return advisorMoves(b, col, row, color);
      case 'E': return elephantMoves(b, col, row, color);
      case 'H': return horseMoves(b, col, row, color);
      case 'R': return chariotMoves(b, col, row, color);
      case 'C': return cannonMoves(b, col, row, color);
      case 'P': return pawnMoves(b, col, row, color);
      default:  return [];
    }
  }

  /**
   * Legal moves — filters pseudo-legal moves that leave own king in check,
   * including flying-general violations.
   */
  legalMoves(col, row) {
    const piece = this.pieceAt(col, row);
    if (!piece) return [];
    const pseudo = this.pseudoMoves(col, row);
    return pseudo.filter(({ col: tc, row: tr }) => {
      return this._tryMove(col, row, tc, tr, () => !this.isInCheck(piece.color));
    });
  }

  /** Execute fn after temporarily applying the move; restore board afterward. */
  _tryMove(fc, fr, tc, tr, fn) {
    const src = this.board[fr][fc];
    const dst = this.board[tr][tc];
    this.board[tr][tc] = src;
    this.board[fr][fc] = null;
    const result = fn();
    this.board[fr][fc] = src;
    this.board[tr][tc] = dst;
    return result;
  }

  // ── Check detection ───────────────────────────────────────────────

  findGeneral(color) {
    for (let r = 0; r < 10; r++)
      for (let c = 0; c < 9; c++)
        if (this.board[r][c]?.type === 'G' && this.board[r][c]?.color === color)
          return { col: c, row: r };
    return null;
  }

  isInCheck(color) {
    const gen = this.findGeneral(color);
    if (!gen) return true; // no king = already lost

    const opp = color === 'red' ? 'black' : 'red';

    // Flying-general rule: both generals on same file with no pieces between
    const oppGen = this.findGeneral(opp);
    if (oppGen && oppGen.col === gen.col) {
      if (piecesBetween(this.board, gen.col, gen.row, oppGen.col, oppGen.row).length === 0)
        return true;
    }

    // Any opponent piece attacking the general's square
    for (let r = 0; r < 10; r++)
      for (let c = 0; c < 9; c++) {
        const p = this.board[r][c];
        if (p?.color !== opp) continue;
        const attacks = this.pseudoMoves(c, r);
        if (attacks.some(m => m.col === gen.col && m.row === gen.row)) return true;
      }
    return false;
  }

  hasAnyLegalMove(color) {
    for (let r = 0; r < 10; r++)
      for (let c = 0; c < 9; c++)
        if (this.board[r][c]?.color === color && this.legalMoves(c, r).length > 0)
          return true;
    return false;
  }

  // ── Move execution ────────────────────────────────────────────────

  /**
   * Attempt to make a move. Returns a result object.
   * @returns {{ ok: boolean, reason?: string, captured?: object,
   *             inCheck?: boolean, gameOver?: boolean, winner?: string, condition?: string }}
   */
  move(fromCol, fromRow, toCol, toRow) {
    const piece = this.pieceAt(fromCol, fromRow);
    if (!piece)                        return { ok: false, reason: 'empty' };
    if (piece.color !== this.currentTurn) return { ok: false, reason: 'wrong_turn' };

    const legal = this.legalMoves(fromCol, fromRow);
    if (!legal.some(m => m.col === toCol && m.row === toRow))
      return { ok: false, reason: 'illegal' };

    const captured = this.pieceAt(toCol, toRow);
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;
    this.moveHistory.push({ fromCol, fromRow, toCol, toRow, piece, captured: captured ?? null });

    const next = this.currentTurn === 'red' ? 'black' : 'red';
    this.currentTurn = next;

    const inCheck = this.isInCheck(next);
    const hasMoves = this.hasAnyLegalMove(next);

    const result = { ok: true, captured: captured ?? null, inCheck };
    if (!hasMoves) {
      result.gameOver = true;
      result.winner = piece.color;
      result.condition = inCheck ? 'checkmate' : 'stalemate';
    }
    return result;
  }

  /** Undo the last move. Returns false if history is empty. */
  undo() {
    if (!this.moveHistory.length) return false;
    const { fromCol, fromRow, toCol, toRow, piece, captured } = this.moveHistory.pop();
    this.board[fromRow][fromCol] = piece;
    this.board[toRow][toCol] = captured;
    this.currentTurn = piece.color;
    return true;
  }

  // ── Utilities ─────────────────────────────────────────────────────

  /** Serialize board as a plain object array for debugging / display. */
  snapshot() {
    return this.board.map(row =>
      row.map(p => p ? { ...p, char: PIECE_CHARS[p.color][p.type] } : null)
    );
  }

  /** Parse a piece character + color string into { type, color }. */
  static parseChar(char, color) {
    const type = CHAR_TO_TYPE[char];
    if (!type) throw new Error(`Unknown piece character: ${char}`);
    return { type, color };
  }
}
