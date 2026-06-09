package com.xiangqi.cothe

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.xiangqi.cothe.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var prefs: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        prefs = getSharedPreferences("co_the_prefs", MODE_PRIVATE)

        updateStats()

        binding.btnStart.setOnClickListener { startGame(fromBeginning = true) }
        binding.btnContinue.setOnClickListener { startGame(fromBeginning = false) }
    }

    override fun onResume() {
        super.onResume()
        updateStats()
    }

    private fun updateStats() {
        val solved   = prefs.getInt("solved", 0)
        val attempts = prefs.getInt("attempts", 0)
        val streak   = prefs.getInt("streak", 0)
        val lastPuzzle = prefs.getInt("last_puzzle_id", -1)
        val accuracy = if (attempts == 0) 100
                       else ((solved.toFloat() / attempts) * 100).toInt()

        binding.tvStatSolved.text = solved.toString()
        binding.tvStatAccuracy.text = "$accuracy%"
        binding.tvStatStreak.text = streak.toString()

        if (lastPuzzle > 0 && lastPuzzle < 147) {
            binding.btnContinue.text = "Tiếp tục  ·  THẾ $lastPuzzle"
            binding.btnContinue.visibility = android.view.View.VISIBLE
        } else {
            binding.btnContinue.visibility = android.view.View.GONE
        }
    }

    private fun startGame(fromBeginning: Boolean) {
        val puzzleId = if (fromBeginning) 1
                       else prefs.getInt("last_puzzle_id", 1).coerceAtLeast(1)
        val intent = Intent(this, GameActivity::class.java)
        intent.putExtra(GameActivity.EXTRA_PUZZLE_ID, puzzleId)
        startActivity(intent)
    }
}
