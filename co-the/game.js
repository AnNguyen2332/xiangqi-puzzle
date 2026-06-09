import { XiangqiEngine, PIECE_CHARS } from './engine.js';
import { PUZZLES } from './puzzles.js';

// ── State ──────────────────────────────────────────────────────────────────────
const engine = new XiangqiEngine();
let puzzle       = null;
let puzzleIndex  = 0;
let redMovesMade = 0;    // how many red moves completed this puzzle
let selected     = null; // { col, row }
let legalMoveSet = [];   // [{ col, row }]
let moveCount    = 0;
let hintCount    = 0;
let startTime    = null;
let opponentBusy = false;
let timerInterval = null;

// ── DOM refs ───────────────────────────────────────────────────────────────────
const screenHome   = document.getElementById('screen-home');
const screenPuzzle = document.getElementById('screen-puzzle');
const screenWin    = document.getElementById('screen-win');

const btnStart    = document.getElementById('btn-start');
const btnContinue = document.getElementById('btn-continue');
const btnBack     = document.getElementById('btn-back');
const btnHint     = document.getElementById('btn-hint');
const btnUndo     = document.getElementById('btn-undo');
const btnNext     = document.getElementById('btn-next');
const btnReplay   = document.getElementById('btn-replay');

const puzzleLevelEl  = document.getElementById('puzzle-level');
const puzzleHeadEl   = document.getElementById('puzzle-heading');
const puzzleSubEl    = document.getElementById('puzzle-sub');
const turnDotEl      = document.getElementById('turn-dot');
const turnTextEl     = document.getElementById('turn-text');
const timerEl        = document.getElementById('timer');
const boardInner     = document.getElementById('board-inner');
const progressRow    = document.getElementById('progress-row');

const winMovesEl  = document.getElementById('win-moves');
const winHintsEl  = document.getElementById('win-hints');
const winTimeEl   = document.getElementById('win-time');

const failModal = document.getElementById('fail-modal');
const btnRetry  = document.getElementById('btn-retry');

const statSolvedEl   = document.getElementById('stat-solved');
const statAccuracyEl = document.getElementById('stat-accuracy');
const statStreakEl   = document.getElementById('stat-streak');

// ── Board container click — snap tap to nearest intersection ───────────────────
boardInner.addEventListener('click', e => {
  if (e.target !== boardInner) return;
  const rect = boardInner.getBoundingClientRect();
  const col  = Math.round((e.clientX - rect.left) / rect.width  * 8);
  const row  = Math.round((e.clientY - rect.top)  / rect.height * 9);
  if (col < 0 || col > 8 || row < 0 || row > 9) return;
  onCellClick(col, row);
});

// ── Init ───────────────────────────────────────────────────────────────────────
loadHomeStats();
checkContinue();

btnStart.addEventListener('click', () => startPuzzle(0));
btnContinue.addEventListener('click', () => {
  const saved = loadProgress();
  if (saved) startPuzzle(saved.puzzleIndex);
});
btnBack.addEventListener('click', () => { stopTimer(); hideFailModal(); showHome(); });
btnHint.addEventListener('click', doHint);
btnUndo.addEventListener('click', doUndo);
btnRetry.addEventListener('click', () => { hideFailModal(); startPuzzle(puzzleIndex); });
btnNext.addEventListener('click', () => {
  const next = puzzleIndex + 1;
  if (next < PUZZLES.length) startPuzzle(next);
  else showHome();
});
btnReplay.addEventListener('click', () => startPuzzle(puzzleIndex));

// ── Screen navigation ──────────────────────────────────────────────────────────
function showHome() {
  screenHome.classList.add('active');
  screenPuzzle.classList.remove('active');
  screenWin.classList.remove('active');
  loadHomeStats();
  checkContinue();
}

function showPuzzle() {
  screenPuzzle.classList.add('active');
  screenHome.classList.remove('active');
  screenWin.classList.remove('active');
}

function showWin() {
  stopTimer();
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  winMovesEl.textContent = moveCount;
  winHintsEl.textContent = hintCount;
  winTimeEl.textContent  = elapsed + 's';

  updateStats();
  clearProgress();

  screenWin.classList.add('active');
  screenPuzzle.classList.remove('active');
  screenHome.classList.remove('active');

  const isLast = puzzleIndex >= PUZZLES.length - 1;
  btnNext.textContent = isLast ? 'Về trang chủ' : 'Thế cờ tiếp theo';
}

// ── Fail modal ─────────────────────────────────────────────────────────────────
function showFailModal() {
  stopTimer();
  failModal.classList.remove('hidden');
}

function hideFailModal() {
  failModal.classList.add('hidden');
}

// ── Timer ──────────────────────────────────────────────────────────────────────
function startTimer() {
  startTime = Date.now();
  if (timerEl) timerEl.textContent = '0s';
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timerEl) timerEl.textContent = Math.floor((Date.now() - startTime) / 1000) + 's';
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// ── Puzzle lifecycle ───────────────────────────────────────────────────────────
function startPuzzle(index) {
  puzzleIndex  = index;
  puzzle       = PUZZLES[index];
  redMovesMade = 0;
  selected     = null;
  legalMoveSet = [];
  moveCount    = 0;
  hintCount    = 0;
  opponentBusy = false;

  hideFailModal();
  engine.setupPosition(puzzle.pieces, puzzle.turn);

  puzzleLevelEl.textContent = `THẾ ${puzzle.id}`;
  puzzleHeadEl.textContent  = puzzle.title;
  puzzleSubEl.textContent   = puzzle.turn === 'red' ? 'Đỏ đi trước' : 'Đen đi trước';

  renderProgress();
  renderBoard();
  updateTurnIndicator();
  showPuzzle();
  startTimer();
  saveProgress();
}

// ── Board rendering ────────────────────────────────────────────────────────────
function colPct(col) { return `${(col / 8) * 100}%`; }
function rowPct(row) { return `${(row / 9) * 100}%`; }

function pieceSVG(type, color, captureTarget = false) {
  const char   = PIECE_CHARS[color][type];
  const fill   = '#c8a252';
  const ring   = color === 'red' ? '#a0200e' : '#2a1000';
  const text   = color === 'red' ? '#8b1a10' : '#1a0a00';
  const stroke = color === 'red' ? '#c0392b' : '#3a1a00';
  // Capture ring drawn inside the SVG at cx=18 cy=18 (same centre as the piece).
  // overflow:visible lets r=19.5 extend just past the 36×36 viewBox — always pixel-perfect.
  const captureCircle = captureTarget
    ? `<circle cx="18" cy="18" r="19.5" fill="rgba(192,57,43,0.08)" stroke="rgba(192,57,43,0.75)" stroke-width="2"/>`
    : '';
  return `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"${captureTarget ? ' style="overflow:visible"' : ''}>
    ${captureCircle}
    <circle cx="18" cy="18" r="16" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>
    <circle cx="18" cy="18" r="12" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0.7"/>
    <text x="18" y="23.5" text-anchor="middle" dominant-baseline="auto"
      font-family="'Noto Serif SC',serif" font-size="15" font-weight="700"
      fill="${text}">${char}</text>
  </svg>`;
}

function renderBoard() {
  boardInner.querySelectorAll('.piece, .move-hint').forEach(el => el.remove());

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const p = engine.pieceAt(col, row);
      if (!p) continue;

      const isCaptureTarget = legalMoveSet.some(m => m.col === col && m.row === row);

      const btn = document.createElement('button');
      btn.className  = 'piece';
      btn.dataset.col = col;
      btn.dataset.row = row;
      btn.style.left  = colPct(col);
      btn.style.top   = rowPct(row);
      btn.innerHTML   = pieceSVG(p.type, p.color, isCaptureTarget);
      btn.setAttribute('aria-label', `${p.color} ${p.type} tại ${col},${row}`);

      if (selected && selected.col === col && selected.row === row) {
        btn.classList.add('selected');
      }
      btn.addEventListener('click', () => onCellClick(col, row));
      boardInner.appendChild(btn);
    }
  }

  // Empty-square hint dots only (captures show ring inside their SVG)
  for (const m of legalMoveSet) {
    if (engine.pieceAt(m.col, m.row)) continue;
    const dot = document.createElement('div');
    dot.className  = 'move-hint';
    dot.style.left = colPct(m.col);
    dot.style.top  = rowPct(m.row);
    dot.addEventListener('click', () => onCellClick(m.col, m.row));
    boardInner.appendChild(dot);
  }
}

// ── Interaction ────────────────────────────────────────────────────────────────
function onCellClick(col, row) {
  if (opponentBusy) return;
  if (engine.currentTurn !== puzzle.turn) return;

  const piece = engine.pieceAt(col, row);

  if (selected && legalMoveSet.some(m => m.col === col && m.row === row)) {
    doPlayerMove(selected.col, selected.row, col, row);
    return;
  }

  if (piece && piece.color === puzzle.turn) {
    selected     = { col, row };
    legalMoveSet = engine.legalMoves(col, row);
    renderBoard();
    return;
  }

  selected     = null;
  legalMoveSet = [];
  renderBoard();
}

// ── Player move (any legal move — checks checkmate after movesToMate rounds) ───
function doPlayerMove(fc, fr, tc, tr) {
  const result = engine.move(fc, fr, tc, tr);
  if (!result.ok) return;

  moveCount++;
  redMovesMade++;
  selected     = null;
  legalMoveSet = [];
  renderBoard();
  updateTurnIndicator();
  saveProgress();

  // Win immediately on checkmate
  if (result.gameOver && result.condition === 'checkmate') {
    setTimeout(showWin, 300);
    return;
  }

  // Exhausted all moves without checkmate → show fail popup
  if (redMovesMade >= puzzle.movesToMate) {
    setTimeout(showFailModal, 400);
    return;
  }

  // Black responds
  opponentBusy = true;
  setTimeout(() => {
    const resp = findBlackResponse();
    if (resp) {
      const r2 = engine.move(resp.fromCol, resp.fromRow, resp.toCol, resp.toRow);
      opponentBusy = false;
      renderBoard();
      updateTurnIndicator();
      if (r2.gameOver) setTimeout(showWin, 300);
    } else {
      opponentBusy = false;
      setTimeout(showWin, 300); // black has no moves
    }
  }, 400);
}

// ── Black response: try scripted move, fall back to first legal ────────────────
function findBlackResponse() {
  const scriptedIdx = redMovesMade * 2 - 1;
  const scripted    = puzzle.solution[scriptedIdx];

  if (scripted) {
    const p = engine.pieceAt(scripted.fromCol, scripted.fromRow);
    if (p && p.color === 'black') {
      const legal = engine.legalMoves(scripted.fromCol, scripted.fromRow);
      if (legal.some(m => m.col === scripted.toCol && m.row === scripted.toRow)) {
        return scripted;
      }
    }
  }

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const p = engine.pieceAt(c, r);
      if (p && p.color === 'black') {
        const moves = engine.legalMoves(c, r);
        if (moves.length > 0) {
          return { fromCol: c, fromRow: r, toCol: moves[0].col, toRow: moves[0].row };
        }
      }
    }
  }
  return null;
}

// ── Hint ───────────────────────────────────────────────────────────────────────
function doHint() {
  if (opponentBusy) return;
  const move = puzzle.solution[redMovesMade * 2];
  if (!move) return;

  hintCount++;
  selected     = null;
  legalMoveSet = [];
  renderBoard();

  const fromPiece = boardInner.querySelector(
    `.piece[data-col="${move.fromCol}"][data-row="${move.fromRow}"]`
  );
  if (fromPiece) {
    fromPiece.classList.add('hint-highlight', 'selected');
    setTimeout(() => {
      legalMoveSet = [{ col: move.toCol, row: move.toRow }];
      selected     = { col: move.fromCol, row: move.fromRow };
      renderBoard();
      const p = boardInner.querySelector(
        `.piece[data-col="${move.fromCol}"][data-row="${move.fromRow}"]`
      );
      if (p) p.classList.add('hint-highlight', 'selected');
    }, 600);
  }
}

// ── Undo ───────────────────────────────────────────────────────────────────────
function doUndo() {
  if (opponentBusy || redMovesMade === 0) return;
  engine.undo(); // undo black's response
  engine.undo(); // undo player's move
  redMovesMade--;
  selected     = null;
  legalMoveSet = [];
  renderBoard();
  updateTurnIndicator();
  saveProgress();
}

// ── Turn indicator ─────────────────────────────────────────────────────────────
function updateTurnIndicator() {
  const isRed   = engine.currentTurn === 'red';
  const moveNum = redMovesMade + 1;
  const total   = puzzle ? puzzle.movesToMate : 1;
  turnDotEl.className    = 'turn-dot' + (isRed ? '' : ' black-turn');
  turnTextEl.textContent = isRed
    ? `Lượt của Đỏ · Nước ${moveNum}/${total}`
    : `Đen đang đi...`;
}

// ── Progress dots ──────────────────────────────────────────────────────────────
function renderProgress() {
  progressRow.innerHTML = '';
  const solved = JSON.parse(localStorage.getItem('co-the-stats') || '{}').solvedIds || [];
  PUZZLES.forEach((p, i) => {
    const dot = document.createElement('div');
    dot.className = 'prog-dot' +
      (solved.includes(p.id) ? ' done'    :
       i === puzzleIndex      ? ' current' : '');
    progressRow.appendChild(dot);
  });
}

// ── localStorage ──────────────────────────────────────────────────────────────
function saveProgress() {
  localStorage.setItem('co-the-progress', JSON.stringify({
    puzzleIndex, redMovesMade, moveCount, hintCount,
  }));
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem('co-the-progress')); }
  catch { return null; }
}

function clearProgress() {
  localStorage.removeItem('co-the-progress');
  const stats = loadStats();
  if (!stats.solvedIds.includes(puzzle.id)) {
    stats.solvedIds.push(puzzle.id);
    stats.solved     = stats.solvedIds.length;
    stats.totalMoves = (stats.totalMoves || 0) + moveCount;
    stats.totalIdeal = (stats.totalIdeal || 0) + puzzle.movesToMate;
    stats.accuracy   = Math.min(100, Math.round((stats.totalIdeal / stats.totalMoves) * 100));
    stats.streak     = hintCount === 0 ? (stats.streak || 0) + 1 : 0;
    localStorage.setItem('co-the-stats', JSON.stringify(stats));
  }
}

function loadStats() {
  try { return JSON.parse(localStorage.getItem('co-the-stats')) || defaultStats(); }
  catch { return defaultStats(); }
}

function defaultStats() {
  return { solved: 0, solvedIds: [], accuracy: 100, streak: 0, totalMoves: 0, totalIdeal: 0 };
}

function loadHomeStats() {
  const s = loadStats();
  statSolvedEl.textContent   = s.solved;
  statAccuracyEl.textContent = s.accuracy + '%';
  statStreakEl.textContent   = s.streak;
}

function updateStats() { loadHomeStats(); }

function checkContinue() {
  const saved = loadProgress();
  if (saved && saved.puzzleIndex < PUZZLES.length) {
    btnContinue.classList.remove('hidden');
    btnContinue.textContent = `Tiếp tục · THẾ ${PUZZLES[saved.puzzleIndex].id}`;
  } else {
    btnContinue.classList.add('hidden');
  }
}
