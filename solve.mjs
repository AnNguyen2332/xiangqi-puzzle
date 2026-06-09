import { XiangqiEngine } from './xiangqi-engine.js';

function allLegal(engine, color) {
  const moves = [];
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 9; c++) {
      if (engine.board[r][c]?.color !== color) continue;
      for (const m of engine.legalMoves(c, r))
        moves.push({ fromCol: c, fromRow: r, toCol: m.col, toRow: m.row });
    }
  return moves;
}

function canMateIn(engine, atk, depth) {
  const def = atk === 'red' ? 'black' : 'red';
  if (depth === 0) return false;
  for (const m of allLegal(engine, atk)) {
    const r = engine.move(m.fromCol, m.fromRow, m.toCol, m.toRow);
    if (!r.ok) continue;
    if (r.gameOver && r.condition === 'checkmate') { engine.undo(); return { firstMove: m }; }
    const responses = allLegal(engine, def);
    let allLose = responses.length > 0;
    for (const m2 of responses) {
      const r2 = engine.move(m2.fromCol, m2.fromRow, m2.toCol, m2.toRow);
      if (!r2.ok) continue;
      if (r2.gameOver) { engine.undo(); allLose = false; break; }
      const sub = canMateIn(engine, atk, depth - 1);
      engine.undo();
      if (!sub) { allLose = false; break; }
    }
    engine.undo();
    if (allLose) return { firstMove: m };
  }
  return false;
}

function findMate(engine, atk, max = 3) {
  for (let d = 1; d <= max; d++) {
    const r = canMateIn(engine, atk, d);
    if (r) return { depth: d, ...r };
  }
  return null;
}

const engine = new XiangqiEngine();

const puzzles = [
  {
    label: 'P1 (horse-cannon mate-in-1)',
    pieces: [
      { type:'G', color:'red',   col:4, row:9 },
      { type:'C', color:'red',   col:4, row:6 },
      { type:'H', color:'red',   col:2, row:2 },
      { type:'R', color:'red',   col:8, row:1 },
      { type:'G', color:'black', col:4, row:0 },
      { type:'A', color:'black', col:3, row:0 },
      { type:'A', color:'black', col:5, row:0 },
    ],
    expected: 1,
    solution: [
      { fromCol:2, fromRow:2, toCol:4, toRow:1 }, // H→(4,1) intended; R→(4,1) also works
    ],
  },
  {
    label: 'P2 (double-rook quiet first move, mate-in-2)',
    pieces: [
      { type:'G', color:'red',   col:4, row:9 },
      { type:'C', color:'red',   col:4, row:8 },
      { type:'R', color:'red',   col:8, row:2 },
      { type:'R', color:'red',   col:0, row:3 },
      { type:'G', color:'black', col:4, row:0 },
      { type:'A', color:'black', col:3, row:1 },
      { type:'A', color:'black', col:5, row:1 },
    ],
    expected: 2,
    solution: [
      { fromCol:0, fromRow:3, toCol:0, toRow:2 }, // Red: R slides up
      { fromCol:4, fromRow:0, toCol:3, toRow:0 }, // Black forced: king left
      { fromCol:0, fromRow:2, toCol:0, toRow:0 }, // Red: R mates from corner
    ],
  },
  {
    label: 'P3 candidate (R check on col4, corner rook mate-in-2)',
    pieces: [
      { type:'G', color:'red',   col:4, row:9 },
      { type:'C', color:'red',   col:4, row:8 },
      { type:'R', color:'red',   col:0, row:1 },
      { type:'R', color:'red',   col:8, row:2 },
      { type:'G', color:'black', col:4, row:0 },
      { type:'A', color:'black', col:3, row:1 },
      { type:'A', color:'black', col:5, row:1 },
    ],
    expected: 2,
    solution: [
      { fromCol:8, fromRow:2, toCol:4, toRow:2 }, // Red: R checks col4
      { fromCol:4, fromRow:0, toCol:3, toRow:0 }, // Black forced: king flees left
      { fromCol:0, fromRow:1, toCol:0, toRow:0 }, // Red: R corners, mates
    ],
  },
];

for (const p of puzzles) {
  engine.setupPosition(p.pieces, 'red');
  const result = findMate(engine, 'red', 3);
  const ok = result?.depth === p.expected;
  console.log(`\n${ok ? '✓' : '✗'} ${p.label}`);
  console.log('  Found: mate-in-' + (result?.depth ?? 'none'), '| firstMove:', JSON.stringify(result?.firstMove));

  // Trace the intended solution
  console.log('  Verifying intended solution:');
  engine.setupPosition(p.pieces, 'red');
  let solutionOk = true;
  for (let i = 0; i < p.solution.length; i++) {
    const m = p.solution[i];
    const r = engine.move(m.fromCol, m.fromRow, m.toCol, m.toRow);
    const side = i % 2 === 0 ? 'Red' : 'Blk';
    if (!r.ok) {
      console.log(`    Step ${i+1} ${side}: FAIL (${r.reason})`);
      solutionOk = false; break;
    }
    const flag = r.gameOver ? `GAME OVER (${r.condition})` : r.inCheck ? 'check' : '';
    console.log(`    Step ${i+1} ${side}: (${m.fromCol},${m.fromRow})→(${m.toCol},${m.toRow})  ${flag}`);
    if (r.gameOver) break;
  }
}
