// rebuild-all.mjs
// Rebuilds co-the/puzzles.js from scratch using BOTH scrape batches.
// 1. Loads puzzles_scraped.json  (batch 1) + puzzles_scraped2.json (batch 2)
// 2. Verifies each puzzle through the engine (max mate-in-4)
// 3. Simplifies each to essential + up to MAX_DECOYS decoys per side
// 4. Deduplicates by puzzle_id
// 5. Sorts by movesToMate asc → pieces.length asc
// 6. Writes combined result to co-the/puzzles.js
//
// Usage: node rebuild-all.mjs [maxMate=4] [maxDecoys=4] [maxOut=unlimited]

import { readFileSync, writeFileSync } from 'fs';
import { XiangqiEngine } from './xiangqi-engine.js';

const MAX_MATE   = parseInt(process.argv[2] ?? '4', 10);
const MAX_DECOYS = parseInt(process.argv[3] ?? '4', 10);
const MAX_OUT    = parseInt(process.argv[4] ?? '9999', 10); // unlimited by default
const eng = new XiangqiEngine();

// ── Engine helpers ────────────────────────────────────────────────────────────

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
  const nonKings = pieces
    .filter(x => x.type !== 'G')
    .slice()
    .sort((a, b) => distToAction(b, solution) - distToAction(a, solution));

  let essential = [...pieces];
  const dropped = [];
  for (const piece of nonKings) {
    const candidate = essential.filter(x => x !== piece);
    if (solveCheck(candidate, turn, solution)) { essential = candidate; dropped.push(piece); }
  }

  dropped.sort((a, b) => distToAction(a, solution) - distToAction(b, solution));
  const used = { red: 0, black: 0 };
  let final = [...essential];
  for (const piece of dropped) {
    if (used[piece.color] >= MAX_DECOYS) continue;
    const candidate = [...final, piece];
    if (solveCheck(candidate, turn, solution)) { final = candidate; used[piece.color]++; }
  }
  return { ...p, pieces: final };
}

// ── Load + verify batches ──────────────────────────────────────────────────────

function loadAndVerify(jsonPath, label) {
  const raw = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const pass = [], fail = [];
  for (const p of raw) {
    if (p.movesToMate > MAX_MATE) { fail.push({ id: p.puzzle_id, reason: `mate-in-${p.movesToMate}>max` }); continue; }
    if (!solveCheck(p.pieces, p.turn, p.solution)) { fail.push({ id: p.puzzle_id, reason: 'engine-fail' }); continue; }
    pass.push(p);
  }
  console.log(`${label}: ${pass.length}/${raw.length} pass  (${fail.length} fail: ${fail.map(f=>f.reason).slice(0,5).join(', ')}…)`);
  return pass;
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`Rebuild: MAX_MATE=${MAX_MATE}  MAX_DECOYS=${MAX_DECOYS}  MAX_OUT=${MAX_OUT === 9999 ? 'unlimited' : MAX_OUT}\n`);

const batch1 = loadAndVerify('./puzzles_scraped.json',  'Batch 1 (original)');
const batch2 = loadAndVerify('./puzzles_scraped2.json', 'Batch 2 (new)     ');

// Deduplicate by puzzle_id
const allRaw = [...batch1, ...batch2];
const seen = new Set();
const deduped = [];
for (const p of allRaw) {
  if (!seen.has(p.puzzle_id)) { seen.add(p.puzzle_id); deduped.push(p); }
}
console.log(`\nTotal after dedup: ${deduped.length} (removed ${allRaw.length - deduped.length} duplicates)`);

// Simplify all
console.log(`Simplifying ${deduped.length} puzzles…`);
let sumBefore = 0, sumAfter = 0;
const simplified = deduped.map(p => {
  const s = simplify(p);
  sumBefore += p.pieces.length;
  sumAfter  += s.pieces.length;
  return s;
});
console.log(`Average pieces: ${(sumBefore/deduped.length).toFixed(1)} → ${(sumAfter/deduped.length).toFixed(1)}`);

// Sort: movesToMate asc → pieces.length asc
simplified.sort((a, b) =>
  a.movesToMate !== b.movesToMate ? a.movesToMate - b.movesToMate : a.pieces.length - b.pieces.length
);

// Apply limit
const output = simplified.slice(0, MAX_OUT);
output.forEach((p, i) => { p.id = i + 1; });

// Validate
console.log(`\nValidating ${output.length} puzzles…`);
let allGood = true;
for (const p of output) {
  if (!solveCheck(p.pieces, p.turn, p.solution)) {
    console.error(`  ✗ BROKEN id=${p.id}`); allGood = false;
  }
}
if (allGood) console.log(`  ✓ All ${output.length} pass`);

// Distribution
const dist = {};
output.forEach(p => { dist[p.movesToMate] = (dist[p.movesToMate]||0)+1; });
console.log('\nDistribution:');
for (const k of Object.keys(dist).sort((a,b)=>+a-+b))
  console.log(`  mate-in-${k}: ${dist[k]} puzzles`);

// Write
const lines = [
  '// puzzles.js — verified scraped puzzles (simplified, sorted easy→hard)',
  '// Source: play.xiangqi.com  Theme: checkmate  Turn: red',
  `// count: ${output.length}  (mate-in-1..${MAX_MATE})`,
  '',
  'export const PUZZLES = [',
];
for (const p of output) {
  lines.push('  {');
  lines.push(`    id: ${p.id}, title: "${p.title}", movesToMate: ${p.movesToMate}, turn: "${p.turn}",`);
  lines.push(`    pieces: ${JSON.stringify(p.pieces)},`);
  lines.push(`    solution: ${JSON.stringify(p.solution)},`);
  lines.push('  },');
}
lines.push('];');
lines.push('');

writeFileSync('./co-the/puzzles.js', lines.join('\n'), 'utf8');
console.log(`\nSaved ${output.length} puzzles → co-the/puzzles.js`);
