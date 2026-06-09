// merge-puzzles.mjs
// Takes the newly verified batch (puzzles_verified.js) + the existing simplified
// puzzles (co-the/puzzles.js), simplifies the new batch, merges, sorts by
// difficulty (movesToMate asc → pieces.length asc), renumbers IDs, writes back.
//
// Usage: node merge-puzzles.mjs [maxDecoys=4]

import { writeFileSync } from 'fs';
import { XiangqiEngine } from './xiangqi-engine.js';
import { PUZZLES as EXISTING } from './co-the/puzzles.js';
import { PUZZLES as NEW_RAW  } from './puzzles_verified.js';

const MAX_DECOYS = parseInt(process.argv[2] ?? '4', 10);
const eng = new XiangqiEngine();

// ── Simplification helpers (same logic as simplify-puzzles.mjs) ───────────────

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

function simplify(p) {
  const { pieces, turn, solution } = p;

  // Sort non-kings farthest-from-action first (try removing those first).
  const nonKings = pieces
    .filter(x => x.type !== 'G')
    .slice()
    .sort((a, b) => distToAction(b, solution) - distToAction(a, solution));

  let essential = [...pieces];
  const dropped = [];

  for (const piece of nonKings) {
    const candidate = essential.filter(x => x !== piece);
    if (solveCheck(candidate, turn, solution)) {
      essential = candidate;
      dropped.push(piece);
    }
  }

  // Re-add decoys: closest to action first, verify each one.
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

console.log(`Existing puzzles : ${EXISTING.length}`);
console.log(`New (raw) puzzles: ${NEW_RAW.length}`);
console.log(`Simplifying new batch (max ${MAX_DECOYS} decoys/side)…\n`);

const newSimplified = [];
for (const p of NEW_RAW) {
  const s = simplify(p);
  const d = s.pieces.length - p.pieces.length;
  console.log(`  mate-in-${p.movesToMate}  ${p.pieces.length}→${s.pieces.length} (${d >= 0 ? '+' : ''}${d})`);
  newSimplified.push(s);
}

// Merge: existing + new simplified
const merged = [...EXISTING, ...newSimplified];

// Sort: movesToMate asc → then pieces.length asc (simpler board = earlier within same tier)
merged.sort((a, b) =>
  a.movesToMate !== b.movesToMate
    ? a.movesToMate - b.movesToMate
    : a.pieces.length - b.pieces.length
);

// Renumber IDs 1..N
merged.forEach((p, i) => { p.id = i + 1; });

// ── Validate all ──────────────────────────────────────────────────────────────

console.log(`\nValidating all ${merged.length} puzzles…`);
let allGood = true;
for (const p of merged) {
  if (!solveCheck(p.pieces, p.turn, p.solution)) {
    console.error(`  ✗ BROKEN: id=${p.id} mate-in-${p.movesToMate}`);
    allGood = false;
  }
}
if (allGood) console.log(`  ✓ All ${merged.length} pass\n`);

// ── Distribution ──────────────────────────────────────────────────────────────

const dist = {};
merged.forEach(p => { dist[p.movesToMate] = (dist[p.movesToMate] || 0) + 1; });
console.log('Distribution:');
for (const k of Object.keys(dist).sort((a,b) => +a - +b))
  console.log(`  mate-in-${k}: ${dist[k]} puzzles`);

const avg = (merged.reduce((s, p) => s + p.pieces.length, 0) / merged.length).toFixed(1);
console.log(`Average pieces/puzzle: ${avg}\n`);

// ── Write ──────────────────────────────────────────────────────────────────────

const lines = [
  '// puzzles.js — verified scraped puzzles (simplified, merged)',
  '// Source: play.xiangqi.com  Theme: checkmate  Turn: red',
  `// count: ${merged.length}`,
  '',
  'export const PUZZLES = [',
];
for (const p of merged) {
  lines.push('  {');
  lines.push(`    id: ${p.id}, title: "${p.title}", movesToMate: ${p.movesToMate}, turn: "${p.turn}",`);
  lines.push(`    pieces: ${JSON.stringify(p.pieces)},`);
  lines.push(`    solution: ${JSON.stringify(p.solution)},`);
  lines.push('  },');
}
lines.push('];');
lines.push('');

writeFileSync('./co-the/puzzles.js', lines.join('\n'), 'utf8');
console.log(`Saved ${merged.length} puzzles → co-the/puzzles.js`);
