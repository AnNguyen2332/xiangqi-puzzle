package com.xiangqi.cothe

import android.content.SharedPreferences
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.xiangqi.cothe.databinding.ActivityGameBinding
import com.xiangqi.cothe.engine.*

class GameActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_PUZZLE_ID = "puzzle_id"
        /** Player gets (movesToMate × this factor) total red moves before failing. */
        private const val MOVE_LIMIT_FACTOR = 3
    }

    private lateinit var binding: ActivityGameBinding
    private lateinit var prefs: SharedPreferences

    private val engine = XiangqiEngine()
    private lateinit var puzzle: PuzzleDef

    // ── Puzzle state ───────────────────────────────────────────────────────────
    private var currentPieces: List<PiecePos> = emptyList()

    /**
     * Index into puzzle.solution tracking how far along the *scripted* path we are.
     * Only advances when the player's move matches solution[solutionStep].
     * solution is red-first: even indices = red's moves, odd = black's responses.
     */
    private var solutionStep = 0

    /** Total red moves made (correct + wrong). Used for move-limit enforcement. */
    private var playerMoveCount = 0

    private var hintCount = 0
    private var gameWon = false
    private var gameFailed = false

    /**
     * Saves solutionStep *before* each red move so undoMove() can restore it exactly,
     * regardless of whether the move was correct or not.
     */
    private val moveHistory = mutableListOf<Int>()

    // ── Timer ──────────────────────────────────────────────────────────────────
    private var secondsElapsed = 0
    private val handler = Handler(Looper.getMainLooper())
    private val timerRunnable = object : Runnable {
        override fun run() {
            if (!gameWon && !gameFailed) {
                secondsElapsed++
                binding.tvTimer.text = "${secondsElapsed}s"
                handler.postDelayed(this, 1000)
            }
        }
    }

    // ── Lifecycle ──────────────────────────────────────────────────────────────

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGameBinding.inflate(layoutInflater)
        setContentView(binding.root)

        prefs = getSharedPreferences("co_the_prefs", MODE_PRIVATE)

        val puzzleId = intent.getIntExtra(EXTRA_PUZZLE_ID, 1)
        puzzle = PuzzleData.ALL.find { it.id == puzzleId } ?: PuzzleData.ALL[0]

        setupPuzzle()
        setupButtons()
        setupBoardCallbacks()
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(timerRunnable)
    }

    // ── Setup ──────────────────────────────────────────────────────────────────

    private fun setupPuzzle() {
        solutionStep = 0
        playerMoveCount = 0
        hintCount = 0
        gameWon = false
        gameFailed = false
        secondsElapsed = 0
        moveHistory.clear()

        currentPieces = puzzle.pieces.toList()
        engine.setupPosition(currentPieces, "red")

        updateHeader()
        updateProgressDots()
        handler.post(timerRunnable)

        binding.boardView.setInteractive(true)
        binding.boardView.setPosition(currentPieces, null)
        binding.failOverlay.visibility = View.GONE
        binding.winOverlay.visibility = View.GONE
    }

    private fun updateHeader() {
        binding.tvPuzzleLevel.text = "THẾ ${puzzle.id} / ${PuzzleData.ALL.size}"
        binding.tvPuzzleHeading.text = puzzle.title
    }

    private fun updateProgressDots() {
        binding.progressRow.removeAllViews()
        val totalRedMoves = (puzzle.solution.size + 1) / 2
        // Dots reflect correct solution steps completed: (solutionStep+1)/2
        val correctSoFar = (solutionStep + 1) / 2
        for (i in 0 until totalRedMoves) {
            val dot = View(this).apply {
                val dp8 = (8 * resources.displayMetrics.density).toInt()
                val dp4 = (4 * resources.displayMetrics.density).toInt()
                layoutParams = LinearLayout.LayoutParams(dp8, dp8).also { it.setMargins(dp4, 0, dp4, 0) }
                setBackgroundResource(
                    if (i < correctSoFar) R.drawable.circle_dot else R.drawable.circle_dot_empty
                )
            }
            binding.progressRow.addView(dot)
        }
    }

    private fun setupButtons() {
        binding.btnBack.setOnClickListener { finish() }
        binding.btnHint.setOnClickListener { showHint() }
        binding.btnUndo.setOnClickListener { undoMove() }
        binding.btnRetry.setOnClickListener {
            binding.failOverlay.visibility = View.GONE
            setupPuzzle()
        }
        binding.btnNext.setOnClickListener { loadNextPuzzle() }
        binding.btnReplay.setOnClickListener {
            binding.winOverlay.visibility = View.GONE
            setupPuzzle()
        }
    }

    private fun setupBoardCallbacks() {
        binding.boardView.onMoveMade = { move ->
            if (move.fromCol == -1) {
                // Piece selected — show legal moves only on red's turn
                if (engine.currentTurn == "red") {
                    binding.boardView.showLegalMoves(engine.legalMoves(move.toCol, move.toRow))
                } else {
                    binding.boardView.clearSelection()
                }
            } else {
                handlePlayerMove(move)
            }
        }
    }

    // ── Game logic ─────────────────────────────────────────────────────────────

    private fun handlePlayerMove(move: Move) {
        if (gameWon || gameFailed || engine.currentTurn != "red") return

        val result = engine.move(move.fromCol, move.fromRow, move.toCol, move.toRow)
        if (!result.ok) return

        // Save solutionStep BEFORE the move for undo
        moveHistory.add(solutionStep)
        playerMoveCount++

        val newPieces = boardToList()
        binding.boardView.setInteractive(false)
        binding.boardView.animateMove(move, newPieces) {
            currentPieces = newPieces

            // ── Win / loss by game result ──────────────────────────────────────
            if (result.gameOver) {
                if (result.condition == "checkmate" && result.winner == "red") {
                    updateProgressDots()
                    handleWin()
                } else {
                    handleFail()
                }
                return@animateMove
            }

            // ── Move limit (checked after game-over so a mating move always wins) ──
            val maxRedMoves = puzzle.movesToMate * MOVE_LIMIT_FACTOR
            if (playerMoveCount >= maxRedMoves) {
                updateProgressDots()
                handleFail()
                return@animateMove
            }

            // ── Advance solution path if move matches ──────────────────────────
            if (solutionStep < puzzle.solution.size && move == puzzle.solution[solutionStep]) {
                solutionStep++
            }
            updateProgressDots()

            // ── Black responds ─────────────────────────────────────────────────
            handler.postDelayed({ playBlackResponse() }, 600)
        }
    }

    /**
     * Black's response after red's move.
     * Tries the scripted solution move first; falls back to any legal black move
     * if the position has diverged from the expected solution path.
     */
    private fun playBlackResponse() {
        // Scripted response: solutionStep must point to an odd index (black's turn)
        val scripted = if (solutionStep % 2 == 1 && solutionStep < puzzle.solution.size) {
            puzzle.solution[solutionStep]
        } else null

        if (scripted != null) {
            val result = engine.move(scripted.fromCol, scripted.fromRow, scripted.toCol, scripted.toRow)
            if (result.ok) {
                solutionStep++
                val newPieces = boardToList()
                binding.boardView.animateMove(scripted, newPieces) {
                    currentPieces = newPieces
                    if (result.gameOver) { handleFail(); return@animateMove }
                    binding.boardView.setInteractive(true)
                }
                return
            }
            // Scripted move is no longer legal (position diverged) — fall through
        }

        // Fallback: find any legal move for black
        playAnyLegalBlackMove()
    }

    /** Plays the first legal move found for whichever black piece has one. */
    private fun playAnyLegalBlackMove() {
        val mv = findAnyLegalBlackMove()
        if (mv != null) {
            val result = engine.move(mv.fromCol, mv.fromRow, mv.toCol, mv.toRow)
            if (result.ok) {
                val newPieces = boardToList()
                binding.boardView.animateMove(mv, newPieces) {
                    currentPieces = newPieces
                    if (result.gameOver) { handleFail(); return@animateMove }
                    binding.boardView.setInteractive(true)
                }
                return
            }
        }
        // No legal black moves (very unusual mid-game) — give red control back
        binding.boardView.setInteractive(true)
    }

    /** Iterates all squares to find the first black piece with at least one legal move. */
    private fun findAnyLegalBlackMove(): Move? {
        for (row in 0..9) for (col in 0..8) {
            val piece = engine.pieceAt(col, row) ?: continue
            if (piece.color != "black") continue
            val targets = engine.legalMoves(col, row)
            if (targets.isNotEmpty()) return Move(col, row, targets[0].col, targets[0].row)
        }
        return null
    }

    // ── Hint ──────────────────────────────────────────────────────────────────

    private fun showHint() {
        if (gameWon || gameFailed || solutionStep >= puzzle.solution.size) return
        // Hint points to the next expected RED move (even solutionStep index)
        val hintIdx = if (solutionStep % 2 == 0) solutionStep else solutionStep + 1
        if (hintIdx >= puzzle.solution.size) return
        val hintMove = puzzle.solution[hintIdx]
        hintCount++
        binding.boardView.showHintSelection(
            hintMove.fromCol, hintMove.fromRow,
            hintMove.toCol, hintMove.toRow
        )
        handler.postDelayed({ binding.boardView.clearSelection() }, 1500)
    }

    // ── Undo ──────────────────────────────────────────────────────────────────

    private fun undoMove() {
        if (gameWon || gameFailed || playerMoveCount == 0) return

        // Undo black's response (if one was played)
        // After a complete red+black turn, engine's history has 2 moves to undo.
        // After red's move with no black response yet (very brief window), only 1.
        // Safe heuristic: always try to undo 2; the engine ignores an extra undo
        // only if there's nothing to undo (it returns false internally).
        engine.undo()  // undo black's response
        engine.undo()  // undo red's move

        playerMoveCount--
        // Restore exact solutionStep from before this red move
        solutionStep = if (moveHistory.isNotEmpty()) moveHistory.removeLast() else 0

        currentPieces = boardToList()
        binding.boardView.setPosition(currentPieces, null)
        binding.boardView.setInteractive(true)
        updateProgressDots()
    }

    // ── Win / Fail ─────────────────────────────────────────────────────────────

    private fun handleWin() {
        gameWon = true
        handler.removeCallbacks(timerRunnable)
        binding.boardView.setInteractive(false)

        prefs.edit()
            .putInt("solved", prefs.getInt("solved", 0) + 1)
            .putInt("attempts", prefs.getInt("attempts", 0) + 1)
            .putInt("streak", prefs.getInt("streak", 0) + 1)
            .putInt("last_puzzle_id", puzzle.id + 1)
            .apply()

        binding.tvWinMoves.text = playerMoveCount.toString()
        binding.tvWinHints.text = hintCount.toString()
        binding.tvWinTime.text  = "${secondsElapsed}s"

        handler.postDelayed({ binding.winOverlay.visibility = View.VISIBLE }, 500)
    }

    private fun handleFail() {
        gameFailed = true
        handler.removeCallbacks(timerRunnable)
        binding.boardView.setInteractive(false)

        prefs.edit()
            .putInt("attempts", prefs.getInt("attempts", 0) + 1)
            .putInt("streak", 0)
            .apply()

        handler.postDelayed({ binding.failOverlay.visibility = View.VISIBLE }, 400)
    }

    private fun loadNextPuzzle() {
        val nextId = (puzzle.id + 1).coerceAtMost(PuzzleData.ALL.size)
        puzzle = PuzzleData.ALL.find { it.id == nextId } ?: PuzzleData.ALL.last()
        binding.winOverlay.visibility = View.GONE
        setupPuzzle()
    }

    // ── Helpers ────────────────────────────────────────────────────────────────

    private fun boardToList(): List<PiecePos> {
        val list = mutableListOf<PiecePos>()
        for (row in 0..9) for (col in 0..8) {
            val p = engine.pieceAt(col, row)
            if (p != null) list.add(PiecePos(p.type, p.color, col, row))
        }
        return list
    }
}
