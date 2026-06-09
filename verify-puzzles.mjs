// Verification script — run: node verify-puzzles.mjs
import { XiangqiEngine } from './xiangqi-engine.js';

const PUZZLES = [
  {
    id: 1,
    title: "Chiếu tướng trong 2",
    movesToMate: 2,
    turn: "red",
    pieces: [
      // Red: General, Chariot x2, Cannon
      { type: "G", color: "red",   col: 4, row: 9 },
      { type: "R", color: "red",   col: 0, row: 4 },
      { type: "R", color: "red",   col: 8, row: 2 },
      // Black: General only (trapped in palace)
      { type: "G", color: "black", col: 4, row: 0 },
    ],
    solution: [
      { fromCol: 0, fromRow: 4, toCol: 0, toRow: 0 }, // Chariot to row 0
      { fromCol: 4, fromRow: 0, toCol: 3, toRow: 0 }, // forced: king moves left
      { fromCol: 8, fromRow: 2, toCol: 3, toRow: 2 }, // Chariot cuts off, but need to mate
    ],
  },

  // Puzzle 2: Simple back-rank mate with cannon
  {
    id: 2,
    title: "Chiếu tướng trong 2",
    movesToMate: 2,
    turn: "red",
    pieces: [
      { type: "G", color: "red",   col: 4, row: 9 },
      { type: "R", color: "red",   col: 4, row: 5 },
      { type: "C", color: "red",   col: 0, row: 2 },
      { type: "G", color: "black", col: 4, row: 0 },
      { type: "A", color: "black", col: 3, row: 0 },
      { type: "A", color: "black", col: 5, row: 0 },
    ],
    solution: [
      { fromCol: 4, fromRow: 5, toCol: 4, toRow: 0 }, // Chariot takes center, check
      { fromCol: 3, fromRow: 0, toCol: 4, toRow: 1 }, // advisor blocks
      { fromCol: 0, fromRow: 2, toCol: 4, toRow: 2 }, // cannon fires over advisor, mate
    ],
  },
];

function verify(puzzle) {
  const engine = new XiangqiEngine();
  engine.setupPosition(puzzle.pieces, puzzle.turn);

  console.log(`\n=== Puzzle ${puzzle.id}: ${puzzle.title} ===`);

  for (let i = 0; i < puzzle.solution.length; i++) {
    const move = puzzle.solution[i];
    const result = engine.move(move.fromCol, move.fromRow, move.toCol, move.toRow);
    const side = i % 2 === 0 ? puzzle.turn : (puzzle.turn === 'red' ? 'black' : 'red');

    if (!result.ok) {
      console.log(`  Move ${i+1} (${side}): FAILED - ${result.reason}`);
      console.log(`  Piece at (${move.fromCol},${move.fromRow}):`, engine.pieceAt(move.fromCol, move.fromRow));
      const lm = engine.legalMoves(move.fromCol, move.fromRow);
      console.log(`  Legal moves:`, lm);
      return false;
    }

    const marker = result.gameOver ? ` → GAME OVER (${result.condition}, winner: ${result.winner})` :
                   result.inCheck ? ' → CHECK' : '';
    console.log(`  Move ${i+1} (${side}): (${move.fromCol},${move.fromRow})→(${move.toCol},${move.toRow})  ok${marker}`);

    if (result.gameOver) {
      console.log(`  ✓ Mate achieved after ${i+1} moves`);
      return true;
    }
  }

  console.log('  ✗ No mate after all solution moves');
  return false;
}

for (const p of PUZZLES) verify(p);
