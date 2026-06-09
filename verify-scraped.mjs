// verify-scraped.mjs
// Plays each puzzle's scripted solution through the engine.
// Filters: solution must end in checkmate, movesToMate <= maxMate.
// Usage: node verify-scraped.mjs [maxMate=3]
import { readFileSync, writeFileSync } from 'fs';
import { XiangqiEngine } from './xiangqi-engine.js';

const MAX_MATE  = parseInt(process.argv[2] ?? '4', 10);
const MAX_OUT   = parseInt(process.argv[3] ?? '60', 10);
const INPUT     = process.argv[4]          ?? './puzzles_scraped.json';

const raw = JSON.parse(readFileSync(INPUT, 'utf8'));
console.log(`Verifying ${raw.length} puzzles (max mate-in-${MAX_MATE})...\n`);

const engine  = new XiangqiEngine();
const passing = [];
const failing = [];

for (const p of raw) {
  engine.setupPosition(p.pieces, p.turn);

  // Reject puzzles harder than maxMate
  if (p.movesToMate > MAX_MATE) {
    failing.push({ id: p.puzzle_id, reason: `mate-in-${p.movesToMate} > ${MAX_MATE}` });
    continue;
  }

  // Play the scripted solution
  let ok     = true;
  let mated  = false;
  let reason = '';

  for (let i = 0; i < p.solution.length; i++) {
    const m    = p.solution[i];
    const side = i % 2 === 0 ? 'Red' : 'Blk';
    const r    = engine.move(m.fromCol, m.fromRow, m.toCol, m.toRow);

    if (!r.ok) {
      reason = `step ${i+1} (${side}) illegal: (${m.fromCol},${m.fromRow})→(${m.toCol},${m.toRow})`;
      ok = false;
      break;
    }

    if (r.gameOver) {
      if (r.condition === 'checkmate' && i % 2 === 0) {
        mated = true;  // red's move was checkmate ✓
      } else {
        reason = `game over at step ${i+1} but condition=${r.condition} side=${side}`;
        ok = false;
      }
      break;
    }
  }

  if (ok && !mated) {
    reason = 'solution exhausted without checkmate';
    ok = false;
  }

  if (ok && mated) {
    passing.push(p);
    console.log(`  PASS  ${p.puzzle_id}  mate-in-${p.movesToMate}  rating=${p.rating}`);
  } else {
    failing.push({ id: p.puzzle_id, reason });
    console.log(`  FAIL  ${p.puzzle_id}  ${reason}`);
  }
}

console.log(`\n── Summary ─────────────────────────────────────────────`);
console.log(`  Passed: ${passing.length}  /  ${raw.length}`);
console.log(`  Failed: ${failing.length}`);
if (failing.length) {
  console.log('  Failures:');
  for (const f of failing) console.log(`    ${f.id}: ${f.reason}`);
}

// Sort by movesToMate asc, then rating asc (easier first), take top MAX_OUT
passing.sort((a, b) =>
  a.movesToMate !== b.movesToMate
    ? a.movesToMate - b.movesToMate
    : a.rating - b.rating
);
const output = passing.slice(0, MAX_OUT);

// Renumber IDs 1..N
output.forEach((p, i) => { p.id = i + 1; });

// Build puzzles.js
const jsLines = [
  '// puzzles.js — verified scraped puzzles',
  '// Source: play.xiangqi.com  Theme: checkmate  Turn: red',
  `// count: ${output.length}`,
  '',
  'export const PUZZLES = [',
];
for (const p of output) {
  jsLines.push('  {');
  jsLines.push(`    id: ${p.id},`);
  jsLines.push(`    title: "${p.title}",`);
  jsLines.push(`    movesToMate: ${p.movesToMate},`);
  jsLines.push(`    turn: "${p.turn}",`);
  jsLines.push(`    // fen: ${p.fen}`);
  jsLines.push(`    // source: ${p.puzzle_id}  rating: ${p.rating}`);
  jsLines.push(`    pieces: ${JSON.stringify(p.pieces)},`);
  jsLines.push(`    solution: ${JSON.stringify(p.solution)},`);
  jsLines.push('  },');
}
jsLines.push('];');
jsLines.push('');

const jsOut = './puzzles_verified.js';
writeFileSync(jsOut, jsLines.join('\n'), 'utf8');
console.log(`\nSaved ${output.length}/${passing.length} verified puzzles → ${jsOut}`);
