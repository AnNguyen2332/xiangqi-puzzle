# Cờ Thế — Project Brief v1
> Web app để validate concept: puzzle Cờ Tướng dạng "chiếu tướng trong N nước"

---

## Mục tiêu v1

Một web app chạy được trên trình duyệt (mobile-first), cho phép người dùng chơi thử 2–3 puzzle Cờ Tướng hardcoded. Không cần backend, không cần account. Mục đích: validate UI/UX và game feel.

---

## Tài nguyên có sẵn

### 1. UI Mockup — `pocket-xiangqi.html`
File HTML tĩnh chứa 3 màn hình đã được design:
- **Home screen** — tên app "Cờ Thế", nút "Bắt đầu"
- **Puzzle screen** — bàn cờ 9×10, quân cờ SVG flat style, move hints đỏ nhạt
- **Win screen** — hiển thị "Chiếu Tướng!", stats (số nước, gợi ý, thời gian), nút "Thế cờ tiếp theo"

**Visual language:**
- Nền tối (ink black `#1a0a00`) cho Home + Win
- Nền giấy ấm (`#f0e6d0`) cho Puzzle screen
- Accent: đỏ `#c0392b` xuyên suốt
- Quân cờ: SVG flat, disc fill `#c8a252`, viền màu theo phe (đỏ/đen), vòng tròn đơn bên trong
- Font: Noto Serif SC (chữ Hán), Noto Sans (UI)

### 2. Game Engine — `xiangqi-engine.js`
File ES Module đầy đủ với:
- Class `XiangqiEngine` — board state, move generation, check/checkmate detection
- `engine.setupPosition(pieces, turn)` — load thế cờ tùy ý
- `engine.legalMoves(col, row)` — trả về mảng nước đi hợp lệ
- `engine.move(fromCol, fromRow, toCol, toRow)` — thực hiện nước đi, trả về `{ ok, captured, inCheck, gameOver, winner, condition }`
- `engine.undo()` — hoàn tác
- `PIECE_CHARS` — map type → chữ Hán theo màu

---

## Yêu cầu v1

### Cấu trúc file
```
co-the/
├── index.html          # Entry point
├── style.css           # Tách CSS từ mockup ra
├── engine.js           # Copy từ xiangqi-engine.js
├── game.js             # Logic kết nối UI ↔ engine
└── puzzles.js          # Dữ liệu 3 puzzle hardcoded
```

### Màn hình cần implement

**1. Home screen**
- Hiển thị tên "Cờ Thế" + tagline "XIANGQI PUZZLES"
- Nút "Bắt đầu" → chuyển sang puzzle đầu tiên
- Nút "Tiếp tục" nếu có progress đã lưu (localStorage)
- Stats: số puzzle đã giải, accuracy, streak (lưu localStorage)

**2. Puzzle screen**
- Render bàn cờ 9×10 đúng tỉ lệ, responsive trên mobile
- Hiển thị level + "Chiếu tướng trong N nước"
- Indicator lượt đi (Đỏ/Đen đi trước)
- Click/tap quân → highlight nước đi hợp lệ (chấm đỏ nhạt)
- Click/tap ô đích → thực hiện nước đi
- Validate đúng/sai theo engine
- Nút gợi ý (💡): highlight nước đi đúng tiếp theo, trừ điểm accuracy
- Nút hoàn tác (↩): undo nước vừa đi

**3. Win screen**
- Hiển thị "Chiếu Tướng!"
- Stats: số nước đi, số lần dùng gợi ý, thời gian
- Nút "Thế cờ tiếp theo"
- Nút "Xem lại"

### Puzzle data format
```js
// puzzles.js
export const PUZZLES = [
  {
    id: 1,
    title: "Chiếu tướng trong 2",
    movesToMate: 2,
    turn: "red",           // phe đi trước
    pieces: [
      // setupPosition() format của engine
      { type: "G", color: "red",   col: 4, row: 9 },
      { type: "R", color: "red",   col: 2, row: 6 },
      // ...
    ],
    solution: [
      { fromCol: 2, fromRow: 6, toCol: 2, toRow: 0 },  // nước 1 (red)
      { fromCol: 4, fromRow: 0, toCol: 5, toRow: 0 },  // nước 2 (black, forced)
      { fromCol: 2, fromRow: 0, toCol: 5, toRow: 0 },  // nước 3 (red, mate)
    ]
  },
  // ...
]
```

### Interaction flow
```
Tap quân cờ (lượt mình)
  → legalMoves() → highlight ô hợp lệ

Tap ô hợp lệ
  → engine.move()
  → nếu gameOver → Win screen
  → nếu chưa xong → đối phương tự đi (forced move từ solution)
  → lặp lại

Tap ô không hợp lệ / quân khác
  → deselect hoặc select quân mới
```

### Xử lý nước đi của đối phương
Trong puzzle, đối phương chỉ có **một nước forced** (theo solution). Sau khi người chơi đi đúng:
1. Delay 400ms
2. Engine tự thực hiện nước của đối phương
3. Tiếp tục lượt người chơi

Nếu người chơi đi **sai** (không theo solution):
- Rung nhẹ animation trên quân cờ
- Undo tự động sau 600ms
- Không tính là sai (chỉ sai khi dùng gợi ý mới trừ điểm)

> **Lưu ý:** v1 chấp nhận đường đi duy nhất (theo solution). Nếu người chơi tìm ra đường khác dẫn đến checkmate, vẫn tính là đúng — engine sẽ detect `gameOver`.

---

## Puzzle gợi ý để hardcode

Dùng 3 thế cờ từ các màn hình trong mockup, hoặc tạo thế cờ đơn giản để test:

**Puzzle 1 — Mate in 2** (từ Level 22 trong mockup)
Tham khảo IMG_8101/8104 trong project. Thế cờ nhỏ 4×4, phù hợp để test flow cơ bản.

**Puzzle 2 — Mate in 2** (thế cờ khác)
Phức tạp hơn một chút, dùng nhiều loại quân hơn.

**Puzzle 3 — Mate in 4** (từ Level 90 trong mockup)
Tham khảo IMG_8103. Thế cờ đầy đủ hơn.

> Ưu tiên tạo thế cờ **hợp lệ và có solution rõ ràng**. Dùng engine để verify: `engine.setupPosition(pieces)` rồi check `engine.legalMoves()` và trace solution.

---

## Không cần làm ở v1

- Backend / database
- Account / login
- Nhiều hơn 3 puzzle
- Animation phức tạp
- Sound
- Leaderboard
- Chế độ chơi tự do (full game)

---

## Definition of Done

- [ ] Chạy được bằng `open index.html` hoặc `npx serve .` — không cần build step
- [ ] 3 puzzle chơi được end-to-end: bắt đầu → đi đúng → win screen
- [ ] Undo hoạt động đúng
- [ ] Gợi ý hiển thị nước đúng tiếp theo
- [ ] Responsive trên mobile (375px width)
- [ ] Visual đúng với mockup `pocket-xiangqi.html`
