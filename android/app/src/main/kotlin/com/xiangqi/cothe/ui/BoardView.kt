package com.xiangqi.cothe.ui

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import android.view.animation.DecelerateInterpolator
import com.xiangqi.cothe.engine.*
import kotlin.math.min
import kotlin.math.roundToInt

class BoardView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null
) : View(context, attrs) {

    // ── Callbacks ──────────────────────────────────────────────────────────────
    var onMoveMade: ((Move) -> Unit)? = null

    // ── State ──────────────────────────────────────────────────────────────────
    private var pieces: List<PiecePos> = emptyList()
    private var legalMoveTargets: List<Coord> = emptyList()
    private var selectedPiece: PiecePos? = null
    private var lastMove: Move? = null
    private var interactive: Boolean = true

    // Animation
    private var animPiece: PiecePos? = null
    private var animFromX = 0f; private var animFromY = 0f
    private var animToX = 0f;   private var animToY = 0f
    private var animProgress = 1f
    private var animator: ValueAnimator? = null

    // ── Geometry ───────────────────────────────────────────────────────────────
    private var cellSize = 0f
    private var boardOffX = 0f
    private var boardOffY = 0f
    private var pieceRadius = 0f

    // ── Paints ─────────────────────────────────────────────────────────────────
    private val boardBgPaint = Paint().apply {
        color = Color.parseColor("#3d1f05"); style = Paint.Style.FILL
    }
    private val boardSurfPaint = Paint().apply {
        color = Color.parseColor("#c8956a"); style = Paint.Style.FILL
    }
    private val linePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#7a5c2e"); style = Paint.Style.STROKE; strokeWidth = 1.5f
    }
    private val lineLightPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#7a5c2e"); style = Paint.Style.STROKE; strokeWidth = 1f
        alpha = 130
    }
    private val riverTextPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#7a5c2e"); textAlign = Paint.Align.CENTER; alpha = 150
    }
    private val redFillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#cc0000"); style = Paint.Style.FILL
    }
    private val redBorderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#8b0000"); style = Paint.Style.STROKE
    }
    private val blackFillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#1a1a1a"); style = Paint.Style.FILL
    }
    private val blackBorderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#000000"); style = Paint.Style.STROKE
    }
    private val redTextPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.WHITE; textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
    }
    private val blackTextPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#e0d0b0"); textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
    }
    private val selectedRingPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#ffd700"); style = Paint.Style.STROKE
    }
    private val legalDotPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#80ffff00"); style = Paint.Style.FILL
    }
    private val legalCapturePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#60ffd700"); style = Paint.Style.STROKE
    }
    private val lastMovePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#4000ff80"); style = Paint.Style.FILL
    }

    // ── Public API ─────────────────────────────────────────────────────────────

    fun setPosition(newPieces: List<PiecePos>, lastMv: Move? = null) {
        pieces = newPieces
        lastMove = lastMv
        legalMoveTargets = emptyList()
        selectedPiece = null
        invalidate()
    }

    fun setInteractive(on: Boolean) { interactive = on }

    fun animateMove(mv: Move, afterPieces: List<PiecePos>, callback: () -> Unit) {
        val movingPiece = pieces.find { it.col == mv.fromCol && it.row == mv.fromRow } ?: run {
            setPosition(afterPieces, mv); callback(); return
        }
        animPiece = movingPiece
        animFromX = colToX(mv.fromCol); animFromY = rowToY(mv.fromRow)
        animToX   = colToX(mv.toCol);   animToY   = rowToY(mv.toRow)
        animProgress = 0f

        val piecesWithoutMoving = pieces.filter { it != movingPiece }
            .filter { !(it.col == mv.toCol && it.row == mv.toRow) }

        animator?.cancel()
        animator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 220
            interpolator = DecelerateInterpolator()
            addUpdateListener {
                animProgress = it.animatedValue as Float
                // swap out old pos, keep others
                invalidate()
            }
            doOnEnd {
                animPiece = null
                animProgress = 1f
                setPosition(afterPieces, mv)
                callback()
            }
            start()
        }
        this.pieces = piecesWithoutMoving
        invalidate()
    }

    // ── Layout ─────────────────────────────────────────────────────────────────

    override fun onSizeChanged(w: Int, h: Int, ow: Int, oh: Int) {
        super.onSizeChanged(w, h, ow, oh)
        recalcGeometry(w, h)
    }

    private fun recalcGeometry(w: Int, h: Int) {
        // Board has 9 intersection columns (8 gaps) × 10 intersection rows (9 gaps).
        // cellSize is chosen so the 8/9-gap grid plus one-cell padding fits the view.
        val cellW = w.toFloat() / 9f   // 8 gaps + ~1 cell for margins
        val cellH = h.toFloat() / 10f
        cellSize = min(cellW, cellH)
        // Center the grid: 9 intersection points span 8 gaps = 8*cellSize
        boardOffX = (w - cellSize * 8f) / 2f
        // Center the grid: 10 intersection points span 9 gaps = 9*cellSize
        boardOffY = (h - cellSize * 9f) / 2f
        pieceRadius = cellSize * 0.42f

        // Scale-dependent paints
        redBorderPaint.strokeWidth = cellSize * 0.05f
        blackBorderPaint.strokeWidth = cellSize * 0.05f
        selectedRingPaint.strokeWidth = cellSize * 0.08f
        legalCapturePaint.strokeWidth = cellSize * 0.07f
        redTextPaint.textSize = cellSize * 0.44f
        blackTextPaint.textSize = cellSize * 0.44f
        riverTextPaint.textSize = cellSize * 0.28f
    }

    private fun colToX(col: Int) = boardOffX + col * cellSize
    private fun rowToY(row: Int) = boardOffY + row * cellSize

    // ── Drawing ────────────────────────────────────────────────────────────────

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        if (cellSize == 0f) recalcGeometry(width, height)

        drawBoard(canvas)
        drawLastMove(canvas)
        drawLegalMoves(canvas)
        drawPieces(canvas)
        drawAnimatedPiece(canvas)
        drawSelection(canvas)
    }

    private fun drawBoard(canvas: Canvas) {
        // Background
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), boardBgPaint)
        // Board surface — extends half-cell beyond the outermost grid lines so
        // edge pieces (col 0, col 8, row 0, row 9) are fully drawn on the board.
        canvas.drawRect(
            boardOffX - cellSize * 0.5f, boardOffY - cellSize * 0.5f,
            boardOffX + cellSize * 8.5f, boardOffY + cellSize * 9.5f,
            boardSurfPaint
        )
        // Vertical lines
        for (col in 0..8) {
            val x = colToX(col)
            val p = if (col == 0 || col == 8) linePaint else lineLightPaint
            canvas.drawLine(x, boardOffY, x, boardOffY + cellSize * 9f, p)
        }
        // Horizontal lines (skip verticals in river for side cols)
        for (row in 0..9) {
            val y = rowToY(row)
            val p = if (row == 0 || row == 9 || row == 4 || row == 5) linePaint else lineLightPaint
            canvas.drawLine(boardOffX, y, boardOffX + cellSize * 8f, y, p)
        }
        // Side col lines stop at river
        for (col in listOf(0, 8)) {
            val x = colToX(col)
            canvas.drawLine(x, rowToY(0), x, rowToY(4), linePaint)
            canvas.drawLine(x, rowToY(5), x, rowToY(9), linePaint)
        }
        // Palace diagonals
        val pd = lineLightPaint
        // Black palace (top)
        canvas.drawLine(colToX(3), rowToY(0), colToX(5), rowToY(2), pd)
        canvas.drawLine(colToX(5), rowToY(0), colToX(3), rowToY(2), pd)
        // Red palace (bottom)
        canvas.drawLine(colToX(3), rowToY(7), colToX(5), rowToY(9), pd)
        canvas.drawLine(colToX(5), rowToY(7), colToX(3), rowToY(9), pd)
        // River text
        val riverY = boardOffY + cellSize * 4.55f
        val riverCenterX = boardOffX + cellSize * 4f
        canvas.drawText("楚 河", riverCenterX - cellSize * 1.2f, riverY, riverTextPaint)
        canvas.drawText("汉 界", riverCenterX + cellSize * 1.2f, riverY, riverTextPaint)
    }

    private fun drawLastMove(canvas: Canvas) {
        val lm = lastMove ?: return
        val dotR = cellSize * 0.2f
        for ((c, r) in listOf(lm.fromCol to lm.fromRow, lm.toCol to lm.toRow)) {
            canvas.drawCircle(colToX(c), rowToY(r), dotR, lastMovePaint)
        }
    }

    private fun drawLegalMoves(canvas: Canvas) {
        if (legalMoveTargets.isEmpty()) return
        val dotR = cellSize * 0.15f
        for ((c, r) in legalMoveTargets) {
            val x = colToX(c); val y = rowToY(r)
            val targetPiece = pieces.find { it.col == c && it.row == r }
            if (targetPiece != null) {
                // Capture ring
                canvas.drawCircle(x, y, pieceRadius + cellSize * 0.06f, legalCapturePaint)
            } else {
                // Dot
                canvas.drawCircle(x, y, dotR, legalDotPaint)
            }
        }
    }

    private fun drawPieces(canvas: Canvas) {
        for (p in pieces) drawPiece(canvas, p, colToX(p.col), rowToY(p.row))
    }

    private fun drawAnimatedPiece(canvas: Canvas) {
        val ap = animPiece ?: return
        val x = animFromX + (animToX - animFromX) * animProgress
        val y = animFromY + (animToY - animFromY) * animProgress
        drawPiece(canvas, ap, x, y)
    }

    private fun drawSelection(canvas: Canvas) {
        val sel = selectedPiece ?: return
        val x = colToX(sel.col); val y = rowToY(sel.row)
        canvas.drawCircle(x, y, pieceRadius + cellSize * 0.1f, selectedRingPaint)
    }

    private fun drawPiece(canvas: Canvas, piece: PiecePos, x: Float, y: Float) {
        val isRed = piece.color == "red"
        val fillPaint = if (isRed) redFillPaint else blackFillPaint
        val borderPaint = if (isRed) redBorderPaint else blackBorderPaint
        val textPaint = if (isRed) redTextPaint else blackTextPaint
        // Shadow
        val shadow = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.argb(80, 0, 0, 0); style = Paint.Style.FILL
        }
        canvas.drawCircle(x + cellSize * 0.04f, y + cellSize * 0.04f, pieceRadius, shadow)
        // Fill
        canvas.drawCircle(x, y, pieceRadius, fillPaint)
        // Border
        canvas.drawCircle(x, y, pieceRadius, borderPaint)
        // Inner ring (decorative)
        val innerRingPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = if (isRed) Color.parseColor("#ff4040") else Color.parseColor("#333333")
            style = Paint.Style.STROKE; strokeWidth = cellSize * 0.02f; this.alpha = 120
        }
        canvas.drawCircle(x, y, pieceRadius * 0.82f, innerRingPaint)
        // Character
        val ch = XiangqiEngine.charFor(com.xiangqi.cothe.engine.Piece(piece.type, piece.color))
        val textY = y - (textPaint.descent() + textPaint.ascent()) / 2f
        canvas.drawText(ch, x, textY, textPaint)
    }

    // ── Touch ──────────────────────────────────────────────────────────────────

    override fun onTouchEvent(event: MotionEvent): Boolean {
        if (!interactive || animPiece != null) return true
        if (event.action != MotionEvent.ACTION_UP) return true

        val touchX = event.x; val touchY = event.y
        val col = ((touchX - boardOffX) / cellSize).roundToInt()
        val row = ((touchY - boardOffY) / cellSize).roundToInt()
        if (col !in 0..8 || row !in 0..9) { clearSelection(); return true }

        handleTap(col, row)
        return true
    }

    // Called by GameActivity with the legal moves for the currently-selected piece
    fun showLegalMoves(targets: List<Coord>) {
        legalMoveTargets = targets
        invalidate()
    }

    private fun handleTap(col: Int, row: Int) {
        val tapped = pieces.find { it.col == col && it.row == row }
        val sel = selectedPiece

        if (sel != null && legalMoveTargets.any { it.col == col && it.row == row }) {
            // Legal move → emit
            val mv = Move(sel.col, sel.row, col, row)
            clearSelection()
            onMoveMade?.invoke(mv)
            return
        }

        if (tapped != null) {
            if (sel == tapped) { clearSelection(); return }
            selectedPiece = tapped
            legalMoveTargets = emptyList()
            invalidate()
            // Activity will call showLegalMoves() after computing them
            onMoveMade?.invoke(Move(-1, -1, tapped.col, tapped.row))  // signal "piece selected"
        } else {
            clearSelection()
        }
    }

    fun clearSelection() {
        selectedPiece = null
        legalMoveTargets = emptyList()
        invalidate()
    }
}

// ── ValueAnimator extension ───────────────────────────────────────────────────
private fun ValueAnimator.doOnEnd(action: () -> Unit) {
    addListener(object : android.animation.AnimatorListenerAdapter() {
        override fun onAnimationEnd(a: android.animation.Animator) { action() }
    })
}
