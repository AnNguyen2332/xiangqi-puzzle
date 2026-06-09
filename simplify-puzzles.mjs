// simplify-puzzles.mjs
// Strips each puzzle down to its essential pieces + up to MAX_DECOYS decoys per side.
// A piece is "essential" if removing it causes the scripted solution to fail.
// Decoys are non-essential pieces re-added closest to the action (most deceptive).
//
// Usage: node simplify-puzzles.mjs [maxDecoys=4]

import { writeFileSync } from 'fs';
import { XiangqiEngine } from './xiangqi-engine.js';
import { PUZZLES } from './co-the/puzzles.js';

const MAX_DECOYS = parseInt(process.argv[2] ?? '4', 10); // per side
const eng = new XiangqiEngine();

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Play solution through engine; return true iff red wins by checkmate. */
function solveCheck(pieces, turn, solution) {
  eng.setupPosition(pieces, turn);
  for (let i = 0; i < solution.length; i++) {
    const m = solution[i];
    const r = eng.move(m.fromCol, m.fromRow, m.toCol, m.toRow);
    if (!r.ok) return false;
    if (r.gameOver) {
      return r.condition === 'checkmate' && r.winner === 'red' && i % 2 === 0;
    }
  }
  return false;
}

/** Minimum Manhattan distance from piece to any square touched by solution. */
function distToAction(piece, solution) {
  let d = Infinity;
  for (const m of solution) {
    d = Math.min(d,
      Math.abs(piece.col - m.fromCol) + Math.abs(piece.row - m.fromRow),
      Math.abs(piece.col - m.toCol)   + Math.abs(piece.row - m.toRow)
    );
  }
  return d;
}

// ── Core simplification ───────────────────────────────────────────────────────

function simplify(p) {
  const { pieces, turn, solution } = p;

  // Non-king pieces sorted farthest-from-action first (remove those first).
  // Kings are never touched — they're always essential.
  const nonKings = pieces
    .filter(x => x.type !== 'G')
    .slice()
    .sort((a, b) => distToAction(b, solution) - distToAction(a, solution));

  // Greedy removal pass: drop a piece if it doesn't break the solution.
  let essential = [...pieces];
  const dropped = [];

  for (const piece of nonKings) {
    const candidate = essential.filter(x => x !== piece);
    if (solveCheck(candidate, turn, solution)) {
      essential = candidate;
      dropped.push(piece);
    }
  }

  // Re-add decoys: closest-to-action first (hardest to ignore), verify each.
  dropped.sort((a, b) => distToAction(a, solution) - distToAction(b, solution));

  const used = { red: 0, black: 0 };
  let final = [...essential];

  for (const piece of dropped) {
    if (used[piece.color] >= MAX_DECOYS) continue;
    const candidate = [...final, piece];
    if (solveCheck(candidate, turn, solution)) {
      final = candidate;
      used[piece.color]++;
    }
  }

  return { ...p, pieces: final };
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`Simplifying ${PUZZLES.length} puzzles  (max ${MAX_DECOYS} decoys/side)…\n`);

const out = [];
let sumBefore = 0, sumAfter = 0;

for (const p of PUZZLES) {
  const s = simplify(p);
  sumBefore += p.pieces.length;
  sumAfter  += s.pieces.length;
  const d = s.pieces.length - p.pieces.length;
  console.log(
    `  [${String(p.id).padStart(2)}] mate-in-${p.movesToMate}` +
    `  ${p.pieces.length}→${s.pieces.length}  (${d >= 0 ? '+' : ''}${d})`
  );
  out.push(s);
}

const avgBefore = (sumBefore / PUZZLES.length).toFixed(1);
const avgAfter  = (sumAfter  / PUZZLES.length).toFixed(1);
console.log(`\nAverage pieces/puzzle: ${avgBefore} → ${avgAfter}`);

// ── Validate all puzzles ──────────────────────────────────────────────────────

let allGood = true;
for (const p of out) {
  if (!solveCheck(p.pieces, p.turn, p.solution)) {
    console.error(`  ✗ BROKEN: puzzle ${p.id} (mate-in-${p.movesToMate})`);
    allGood = false;
  }
}
if (allGood) console.log('Validation: all 50 puzzles pass ✓\n');

// ── Write output ──────────────────────────────────────────────────────────────

const lines = [
  '// puzzles.js — verified scraped puzzles (simplified)',
  '// Source: play.xiangqi.com  Theme: checkmate  Turn: red',
  `// count: ${out.length}`,
  '',
  'export const PUZZLES = [',
];
for (const p of out) {
  lines.push('  {');
  lines.push(`    id: ${p.id}, title: "${p.title}", movesToMate: ${p.movesToMate}, turn: "${p.turn}",`);
  lines.push(`    pieces: ${JSON.stringify(p.pieces)},`);
  lines.push(`    solution: ${JSON.stringify(p.solution)},`);
  lines.push('  },');
}
lines.push('];');
lines.push('');

writeFileSync('./co-the/puzzles.js', lines.join('\n'), 'utf8');
console.log(`Saved ${out.length} simplified puzzles → co-the/puzzles.js`);
