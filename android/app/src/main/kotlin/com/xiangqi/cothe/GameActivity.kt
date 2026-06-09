package com.xiangqi.cothe

import android.content.SharedPreferences
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.xiangqi.cothe.databinding.ActivityGameBinding
import com.xiangqi.cothe.engine.*
import com.xiangqi.cothe.ui.BoardView

class GameActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_PUZZLE_ID = "puzzle_id"
        private const val MOVE_LIMIT_FACTOR = 3  // allow movesToMate × 3 red moves
    }

    private lateinit var binding: ActivityGameBinding
    private lateinit var prefs: SharedPreferences

    private val engine = XiangqiEngine()
    private lateinit var puzzle: PuzzleDef

    // Puzzle state
    private var currentPieces: List<PiecePos> = emptyList()
    private var solutionStep = 0       // index into puzzle.solution
    private var playerMoveCount = 0    // red moves made by the player
    private var hintCount = 0
    private var failCount = 0
    private var gameWon = false
    private var gameFailed = false

    // Timer
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
        for (i in 0 until totalRedMoves) {
            val dot = View(this).apply {
                val dp8 = (8 * resources.displayMetrics.density).toInt()
                val dp4 = (4 * resources.displayMetrics.density).toInt()
                layoutParams = LinearLayout.LayoutParams(dp8, dp8).also { it.setMargins(dp4, 0, dp4, 0) }
                val filled = (i < playerMoveCount)
                setBackgroundResource(if (filled) R.drawable.circle_dot else R.drawable.circle_dot_empty)
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
                // Piece selected — compute legal moves
                val targets = engine.legalMoves(move.toCol, move.toRow)
                // Only show if it's red's turn (player's turn)
                if (engine.currentTurn == "red") {
                    binding.boardView.showLegalMoves(targets)
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

        playerMoveCount++
        val newPieces = boardToList()

        binding.boardView.setInteractive(false)
        binding.boardView.animateMove(move, newPieces) {
            currentPieces = newPieces
            updateProgressDots()

            if (result.gameOver) {
                if (result.condition == "checkmate" && result.winner == "red") {
                    handleWin()
                } else {
                    handleFail()
                }
                return@animateMove
            }

            // Check move limit
            val maxRedMoves = puzzle.movesToMate * MOVE_LIMIT_FACTOR
            if (playerMoveCount > maxRedMoves) { handleFail(); return@animateMove }

            // Check if this matches the expected solution step
            if (solutionStep < puzzle.solution.size && move == puzzle.solution[solutionStep]) {
                solutionStep++
            }

            // Auto-play black's response if solution has next move
            if (solutionStep < puzzle.solution.size) {
                val blackMove = puzzle.solution[solutionStep]
                handler.postDelayed({ playBlackMove(blackMove) }, 600)
            } else {
                binding.boardView.setInteractive(true)
            }
        }
    }

    private fun playBlackMove(move: Move) {
        val result = engine.move(move.fromCol, move.fromRow, move.toCol, move.toRow)
        if (!result.ok) { binding.boardView.setInteractive(true); return }

        solutionStep++
        val newPieces = boardToList()

        binding.boardView.animateMove(move, newPieces) {
            currentPieces = newPieces
            if (result.gameOver) { handleFail(); return@animateMove }
            binding.boardView.setInteractive(true)
        }
    }

    private fun showHint() {
        if (gameWon || gameFailed || solutionStep >= puzzle.solution.size) return
        val hintMove = puzzle.solution[solutionStep]
        hintCount++
        // Flash the piece
        binding.boardView.showLegalMoves(listOf(
            Coord(hintMove.toCol, hintMove.toRow)
        ))
        handler.postDelayed({ binding.boardView.clearSelection() }, 1500)
    }

    private fun undoMove() {
        if (gameWon || gameFailed || playerMoveCount == 0) return
        // Undo black + red moves
        if (solutionStep > 0) { engine.undo(); solutionStep-- }  // undo black
        engine.undo()                                              // undo red
        playerMoveCount--
        if (solutionStep > 0) solutionStep--

        currentPieces = boardToList()
        engine.setupPosition(currentPieces, "red")
        binding.boardView.setPosition(currentPieces, null)
        binding.boardView.setInteractive(true)
        updateProgressDots()
    }

    private fun handleWin() {
        gameWon = true
        handler.removeCallbacks(timerRunnable)
        binding.boardView.setInteractive(false)

        // Update prefs
        prefs.edit()
            .putInt("solved", prefs.getInt("solved", 0) + 1)
            .putInt("attempts", prefs.getInt("attempts", 0) + 1)
            .putInt("streak", prefs.getInt("streak", 0) + 1)
            .putInt("last_puzzle_id", puzzle.id + 1)
            .apply()

        // Show win screen
        binding.tvWinMoves.text = playerMoveCount.toString()
        binding.tvWinHints.text = hintCount.toString()
        binding.tvWinTime.text  = "${secondsElapsed}s"

        handler.postDelayed({
            binding.winOverlay.visibility = View.VISIBLE
        }, 500)
    }

    private fun handleFail() {
        gameFailed = true
        handler.removeCallbacks(timerRunnable)
        binding.boardView.setInteractive(false)
        failCount++

        prefs.edit()
            .putInt("attempts", prefs.getInt("attempts", 0) + 1)
            .putInt("streak", 0)
            .apply()

        handler.postDelayed({
            binding.failOverlay.visibility = View.VISIBLE
        }, 400)
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
