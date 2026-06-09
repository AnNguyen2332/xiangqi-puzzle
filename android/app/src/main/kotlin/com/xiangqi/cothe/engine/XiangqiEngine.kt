package com.xiangqi.cothe.engine

// ── Data classes ──────────────────────────────────────────────────────────────

data class Piece(val type: String, val color: String)
data class PiecePos(val type: String, val color: String, val col: Int, val row: Int)
data class Move(val fromCol: Int, val fromRow: Int, val toCol: Int, val toRow: Int)
data class Coord(val col: Int, val row: Int)

data class MoveResult(
    val ok: Boolean,
    val reason: String? = null,
    val captured: Piece? = null,
    val inCheck: Boolean = false,
    val gameOver: Boolean = false,
    val winner: String? = null,
    val condition: String? = null   // "checkmate" | "stalemate"
)

// ── Engine ────────────────────────────────────────────────────────────────────

class XiangqiEngine {
    /** 10 rows × 9 cols; null = empty */
    private var board: Array<Array<Piece?>> = emptyBoard()
    var currentTurn: String = "red"
        private set
    private val moveHistory = mutableListOf<HistoryEntry>()

    private data class HistoryEntry(
        val from: Coord, val to: Coord,
        val piece: Piece, val captured: Piece?
    )

    // ── Setup ─────────────────────────────────────────────────────────────────

    fun setupPosition(pieces: List<PiecePos>, turn: String = "red") {
        board = emptyBoard()
        moveHistory.clear()
        currentTurn = turn
        for (p in pieces) board[p.row][p.col] = Piece(p.type, p.color)
    }

    private fun emptyBoard(): Array<Array<Piece?>> =
        Array(10) { arrayOfNulls(9) }

    fun pieceAt(col: Int, row: Int): Piece? =
        if (col in 0..8 && row in 0..9) board[row][col] else null

    // ── Move generation ───────────────────────────────────────────────────────

    fun legalMoves(col: Int, row: Int): List<Coord> {
        val piece = pieceAt(col, row) ?: return emptyList()
        return pseudoMoves(col, row).filter { (tc, tr) ->
            tryMove(col, row, tc, tr) { !isInCheck(piece.color) }
        }
    }

    private fun pseudoMoves(col: Int, row: Int): List<Coord> {
        val piece = pieceAt(col, row) ?: return emptyList()
        return when (piece.type) {
            "G" -> generalMoves(col, row, piece.color)
            "A" -> advisorMoves(col, row, piece.color)
            "E" -> elephantMoves(col, row, piece.color)
            "H" -> horseMoves(col, row, piece.color)
            "R" -> chariotMoves(col, row, piece.color)
            "C" -> cannonMoves(col, row, piece.color)
            "P" -> pawnMoves(col, row, piece.color)
            else -> emptyList()
        }
    }

    private fun <T> tryMove(fc: Int, fr: Int, tc: Int, tr: Int, fn: () -> T): T {
        val src = board[fr][fc]
        val dst = board[tr][tc]
        board[tr][tc] = src
        board[fr][fc] = null
        val result = fn()
        board[fr][fc] = src
        board[tr][tc] = dst
        return result
    }

    // ── Move execution ─────────────────────────────────────────────────────────

    fun move(fromCol: Int, fromRow: Int, toCol: Int, toRow: Int): MoveResult {
        val piece = pieceAt(fromCol, fromRow)
            ?: return MoveResult(ok = false, reason = "empty")
        if (piece.color != currentTurn)
            return MoveResult(ok = false, reason = "wrong_turn")

        val legal = legalMoves(fromCol, fromRow)
        if (legal.none { it.col == toCol && it.row == toRow })
            return MoveResult(ok = false, reason = "illegal")

        val captured = pieceAt(toCol, toRow)
        board[toRow][toCol] = piece
        board[fromRow][fromCol] = null
        moveHistory.add(HistoryEntry(Coord(fromCol, fromRow), Coord(toCol, toRow), piece, captured))

        val next = if (currentTurn == "red") "black" else "red"
        currentTurn = next

        val inCheck = isInCheck(next)
        val hasMoves = hasAnyLegalMove(next)

        return if (!hasMoves) {
            MoveResult(
                ok = true, captured = captured, inCheck = inCheck,
                gameOver = true, winner = piece.color,
                condition = if (inCheck) "checkmate" else "stalemate"
            )
        } else {
            MoveResult(ok = true, captured = captured, inCheck = inCheck)
        }
    }

    fun undo(): Boolean {
        if (moveHistory.isEmpty()) return false
        val e = moveHistory.removeLast()
        board[e.from.row][e.from.col] = e.piece
        board[e.to.row][e.to.col] = e.captured
        currentTurn = e.piece.color
        return true
    }

    // ── Check detection ───────────────────────────────────────────────────────

    fun isInCheck(color: String): Boolean {
        val gen = findGeneral(color) ?: return true
        val opp = if (color == "red") "black" else "red"

        // Flying general
        val oppGen = findGeneral(opp)
        if (oppGen != null && oppGen.col == gen.col) {
            if (piecesBetween(gen.col, gen.row, oppGen.col, oppGen.row).isEmpty()) return true
        }

        // Attacker scan
        for (r in 0..9) for (c in 0..8) {
            val p = board[r][c] ?: continue
            if (p.color != opp) continue
            if (pseudoMoves(c, r).any { it.col == gen.col && it.row == gen.row }) return true
        }
        return false
    }

    private fun hasAnyLegalMove(color: String): Boolean {
        for (r in 0..9) for (c in 0..8)
            if (board[r][c]?.color == color && legalMoves(c, r).isNotEmpty()) return true
        return false
    }

    private fun findGeneral(color: String): Coord? {
        for (r in 0..9) for (c in 0..8)
            if (board[r][c]?.type == "G" && board[r][c]?.color == color) return Coord(c, r)
        return null
    }

    private fun piecesBetween(c1: Int, r1: Int, c2: Int, r2: Int): List<Coord> {
        val result = mutableListOf<Coord>()
        if (c1 == c2) {
            val lo = minOf(r1, r2); val hi = maxOf(r1, r2)
            for (r in lo + 1 until hi) if (board[r][c1] != null) result.add(Coord(c1, r))
        } else if (r1 == r2) {
            val lo = minOf(c1, c2); val hi = maxOf(c1, c2)
            for (c in lo + 1 until hi) if (board[r1][c] != null) result.add(Coord(c, r1))
        }
        return result
    }

    // ── Piece move generators ─────────────────────────────────────────────────

    private fun inBounds(c: Int, r: Int) = c in 0..8 && r in 0..9
    private fun inPalace(c: Int, r: Int, color: String): Boolean {
        val rMin = if (color == "red") 7 else 0
        val rMax = if (color == "red") 9 else 2
        return c in 3..5 && r in rMin..rMax
    }
    private fun canLand(c: Int, r: Int, color: String): Boolean {
        if (!inBounds(c, r)) return false
        return board[r][c]?.color != color
    }

    private fun generalMoves(col: Int, row: Int, color: String): List<Coord> {
        return listOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)
            .mapNotNull { (dc, dr) ->
                val nc = col + dc; val nr = row + dr
                if (inPalace(nc, nr, color) && canLand(nc, nr, color)) Coord(nc, nr) else null
            }
    }

    private fun advisorMoves(col: Int, row: Int, color: String): List<Coord> {
        return listOf(1 to 1, 1 to -1, -1 to 1, -1 to -1)
            .mapNotNull { (dc, dr) ->
                val nc = col + dc; val nr = row + dr
                if (inPalace(nc, nr, color) && canLand(nc, nr, color)) Coord(nc, nr) else null
            }
    }

    private fun elephantMoves(col: Int, row: Int, color: String): List<Coord> {
        val result = mutableListOf<Coord>()
        for ((dc, dr) in listOf(2 to 2, 2 to -2, -2 to 2, -2 to -2)) {
            val nc = col + dc; val nr = row + dr
            if (!inBounds(nc, nr)) continue
            if (color == "red" && nr < 5) continue
            if (color == "black" && nr > 4) continue
            if (board[row + dr / 2][col + dc / 2] != null) continue  // elephant eye blocked
            if (canLand(nc, nr, color)) result.add(Coord(nc, nr))
        }
        return result
    }

    private fun horseMoves(col: Int, row: Int, color: String): List<Coord> {
        data class Dir(val legC: Int, val legR: Int, val ends: List<Pair<Int,Int>>)
        val dirs = listOf(
            Dir(0, -1, listOf(-1 to -2, 1 to -2)),
            Dir(0,  1, listOf(-1 to  2, 1 to  2)),
            Dir(-1, 0, listOf(-2 to -1, -2 to 1)),
            Dir( 1, 0, listOf( 2 to -1,  2 to 1))
        )
        val result = mutableListOf<Coord>()
        for (d in dirs) {
            val lr = row + d.legR; val lc = col + d.legC
            if (!inBounds(lc, lr) || board[lr][lc] != null) continue  // leg blocked
            for ((dc, dr) in d.ends) {
                val nc = col + dc; val nr = row + dr
                if (inBounds(nc, nr) && canLand(nc, nr, color)) result.add(Coord(nc, nr))
            }
        }
        return result
    }

    private fun chariotMoves(col: Int, row: Int, color: String): List<Coord> {
        val result = mutableListOf<Coord>()
        for ((dc, dr) in listOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)) {
            var nc = col + dc; var nr = row + dr
            while (inBounds(nc, nr)) {
                val t = board[nr][nc]
                if (t == null) { result.add(Coord(nc, nr)) }
                else { if (t.color != color) result.add(Coord(nc, nr)); break }
                nc += dc; nr += dr
            }
        }
        return result
    }

    private fun cannonMoves(col: Int, row: Int, color: String): List<Coord> {
        val result = mutableListOf<Coord>()
        for ((dc, dr) in listOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)) {
            var nc = col + dc; var nr = row + dr
            var hasPlatform = false
            while (inBounds(nc, nr)) {
                val t = board[nr][nc]
                if (!hasPlatform) {
                    if (t == null) result.add(Coord(nc, nr))
                    else hasPlatform = true
                } else {
                    if (t != null) { if (t.color != color) result.add(Coord(nc, nr)); break }
                }
                nc += dc; nr += dr
            }
        }
        return result
    }

    private fun pawnMoves(col: Int, row: Int, color: String): List<Coord> {
        val result = mutableListOf<Coord>()
        val forward = if (color == "red") -1 else 1
        val fr = row + forward
        if (inBounds(col, fr) && canLand(col, fr, color)) result.add(Coord(col, fr))
        // Lateral only after crossing river
        val crossedRiver = if (color == "red") row < 5 else row > 4
        if (crossedRiver) {
            for (dc in listOf(-1, 1)) {
                val nc = col + dc
                if (inBounds(nc, row) && canLand(nc, row, color)) result.add(Coord(nc, row))
            }
        }
        return result
    }

    // ── Display helpers ───────────────────────────────────────────────────────

    companion object {
        val PIECE_CHARS = mapOf(
            "red"   to mapOf("G" to "将", "A" to "仕", "E" to "相", "H" to "傌", "R" to "俥", "C" to "砲", "P" to "兵"),
            "black" to mapOf("G" to "將", "A" to "士", "E" to "象", "H" to "馬", "R" to "車", "C" to "炮", "P" to "卒")
        )

        fun charFor(piece: Piece): String =
            PIECE_CHARS[piece.color]?.get(piece.type) ?: "?"
    }
}
