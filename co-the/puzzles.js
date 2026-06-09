// puzzles.js — verified scraped puzzles (simplified, sorted easy→hard)
// Source: play.xiangqi.com  Theme: checkmate  Turn: red
// count: 147  (mate-in-1..4)

export const PUZZLES = [
  {
    id: 1, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"R","color":"red","col":4,"row":1},{"type":"H","color":"red","col":5,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":4,"row":3},{"type":"R","color":"black","col":0,"row":2},{"type":"E","color":"black","col":2,"row":4},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":4,"fromRow":1,"toCol":4,"toRow":0}],
  },
  {
    id: 2, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":6,"row":0},{"type":"C","color":"red","col":7,"row":4},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":3,"row":9},{"type":"H","color":"black","col":7,"row":5},{"type":"P","color":"black","col":6,"row":5},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"red","col":5,"row":7}],
    solution: [{"fromCol":7,"fromRow":4,"toCol":7,"toRow":0}],
  },
  {
    id: 3, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":7,"row":0},{"type":"P","color":"red","col":5,"row":1},{"type":"G","color":"red","col":3,"row":9},{"type":"C","color":"black","col":5,"row":0},{"type":"C","color":"red","col":8,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"red","col":0,"row":0},{"type":"A","color":"red","col":5,"row":7}],
    solution: [{"fromCol":7,"fromRow":0,"toCol":5,"toRow":0}],
  },
  {
    id: 4, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":6,"row":0},{"type":"G","color":"black","col":5,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":4,"row":3},{"type":"H","color":"black","col":2,"row":3},{"type":"P","color":"black","col":8,"row":4},{"type":"P","color":"black","col":2,"row":4},{"type":"C","color":"red","col":5,"row":7},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"red","col":2,"row":6}],
    solution: [{"fromCol":6,"fromRow":0,"toCol":5,"toRow":0}],
  },
  {
    id: 5, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":4,"row":0},{"type":"G","color":"black","col":3,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"black","col":3,"row":3},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"P","color":"black","col":8,"row":3},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 6, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":3,"row":0},{"type":"G","color":"black","col":5,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":2,"row":3},{"type":"R","color":"red","col":4,"row":3},{"type":"P","color":"black","col":6,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":4,"row":5},{"type":"C","color":"red","col":5,"row":7},{"type":"H","color":"red","col":6,"row":7}],
    solution: [{"fromCol":3,"fromRow":0,"toCol":5,"toRow":0}],
  },
  {
    id: 7, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":0},{"type":"R","color":"red","col":4,"row":1},{"type":"H","color":"red","col":8,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":8,"row":1},{"type":"P","color":"red","col":6,"row":3},{"type":"A","color":"black","col":5,"row":2},{"type":"P","color":"red","col":8,"row":6},{"type":"H","color":"black","col":4,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"E","color":"red","col":6,"row":9},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":8,"fromRow":3,"toCol":7,"toRow":1}],
  },
  {
    id: 8, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"H","color":"red","col":5,"row":4},{"type":"C","color":"red","col":3,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":4,"row":3},{"type":"E","color":"black","col":6,"row":4},{"type":"H","color":"black","col":6,"row":5},{"type":"P","color":"black","col":8,"row":4},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":3,"row":9},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":5,"fromRow":4,"toCol":3,"toRow":3}],
  },
  {
    id: 9, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":2},{"type":"H","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"black","col":2,"row":3},{"type":"P","color":"black","col":0,"row":4},{"type":"R","color":"black","col":2,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"black","col":8,"row":5},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":2,"fromRow":0,"toCol":4,"toRow":0}],
  },
  {
    id: 10, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"P","color":"red","col":4,"row":2},{"type":"R","color":"red","col":3,"row":4},{"type":"G","color":"red","col":3,"row":8},{"type":"A","color":"black","col":3,"row":2},{"type":"C","color":"black","col":4,"row":5},{"type":"C","color":"red","col":3,"row":7},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"black","col":7,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"H","color":"red","col":6,"row":7}],
    solution: [{"fromCol":3,"fromRow":4,"toCol":3,"toRow":2}],
  },
  {
    id: 11, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":4,"row":1},{"type":"H","color":"red","col":6,"row":1},{"type":"G","color":"black","col":5,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":8,"row":4},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"red","col":5,"row":5},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"black","col":2,"row":3},{"type":"C","color":"black","col":3,"row":4},{"type":"P","color":"red","col":4,"row":5},{"type":"P","color":"red","col":2,"row":5}],
    solution: [{"fromCol":6,"fromRow":1,"toCol":7,"toRow":3}],
  },
  {
    id: 12, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":4,"row":0},{"type":"G","color":"black","col":3,"row":1},{"type":"R","color":"red","col":3,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":3,"row":4},{"type":"P","color":"black","col":2,"row":4},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"black","col":2,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"H","color":"red","col":2,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":3,"fromRow":5,"toCol":3,"toRow":4}],
  },
  {
    id: 13, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":4,"row":2},{"type":"R","color":"red","col":5,"row":5},{"type":"G","color":"red","col":5,"row":9},{"type":"P","color":"red","col":6,"row":5},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"red","col":1,"row":0},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"red","col":8,"row":7}],
    solution: [{"fromCol":5,"fromRow":5,"toCol":5,"toRow":0}],
  },
  {
    id: 14, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":3,"row":2},{"type":"R","color":"red","col":4,"row":3},{"type":"G","color":"red","col":3,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"black","col":1,"row":0},{"type":"H","color":"red","col":2,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":3,"fromRow":2,"toCol":3,"toRow":0}],
  },
  {
    id: 15, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"C","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"red","col":3,"row":3},{"type":"G","color":"red","col":3,"row":9},{"type":"P","color":"black","col":0,"row":3},{"type":"C","color":"black","col":2,"row":6},{"type":"P","color":"black","col":8,"row":3},{"type":"R","color":"black","col":7,"row":4},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":3,"toRow":0}],
  },
  {
    id: 16, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":2,"row":2},{"type":"R","color":"red","col":3,"row":2},{"type":"A","color":"red","col":5,"row":7},{"type":"G","color":"red","col":5,"row":8},{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"red","col":0,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"R","color":"black","col":5,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":3,"fromRow":2,"toCol":3,"toRow":0}],
  },
  {
    id: 17, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":4,"row":0},{"type":"G","color":"black","col":5,"row":1},{"type":"H","color":"red","col":2,"row":2},{"type":"A","color":"black","col":5,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":5,"row":4},{"type":"C","color":"red","col":0,"row":1},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":2,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"H","color":"black","col":8,"row":6},{"type":"C","color":"black","col":8,"row":9}],
    solution: [{"fromCol":2,"fromRow":2,"toCol":4,"toRow":3}],
  },
  {
    id: 18, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":5,"row":4},{"type":"G","color":"red","col":5,"row":8},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":8,"row":3},{"type":"C","color":"red","col":2,"row":2},{"type":"A","color":"red","col":5,"row":9},{"type":"H","color":"red","col":2,"row":7},{"type":"E","color":"red","col":6,"row":9}],
    solution: [{"fromCol":5,"fromRow":4,"toCol":5,"toRow":0}],
  },
  {
    id: 19, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":5,"row":1},{"type":"G","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":5},{"type":"R","color":"red","col":5,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"red","col":5,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"red","col":6,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":2,"row":2},{"type":"H","color":"black","col":8,"row":2},{"type":"C","color":"red","col":6,"row":4},{"type":"P","color":"red","col":6,"row":6}],
    solution: [{"fromCol":5,"fromRow":8,"toCol":5,"toRow":2}],
  },
  {
    id: 20, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":6,"row":2},{"type":"R","color":"red","col":5,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"E","color":"black","col":6,"row":4},{"type":"C","color":"red","col":4,"row":7},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":5,"row":9},{"type":"E","color":"red","col":6,"row":9}],
    solution: [{"fromCol":5,"fromRow":5,"toCol":5,"toRow":0}],
  },
  {
    id: 21, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":2,"row":2},{"type":"A","color":"red","col":4,"row":8},{"type":"R","color":"red","col":3,"row":9},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"red","col":5,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"red","col":6,"row":9},{"type":"P","color":"red","col":4,"row":6}],
    solution: [{"fromCol":3,"fromRow":9,"toCol":3,"toRow":0}],
  },
  {
    id: 22, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":1,"row":3},{"type":"G","color":"red","col":5,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"black","col":1,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":2,"row":6},{"type":"H","color":"red","col":6,"row":3},{"type":"C","color":"red","col":4,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":1,"fromRow":3,"toCol":2,"toRow":1}],
  },
  {
    id: 23, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":3,"row":3},{"type":"G","color":"red","col":5,"row":7},{"type":"E","color":"black","col":2,"row":0},{"type":"R","color":"red","col":5,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"R","color":"black","col":6,"row":2},{"type":"H","color":"red","col":7,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"E","color":"black","col":6,"row":0},{"type":"E","color":"red","col":6,"row":5}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":2,"toRow":1}],
  },
  {
    id: 24, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":6,"row":2},{"type":"R","color":"red","col":5,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"red","col":8,"row":6},{"type":"C","color":"red","col":7,"row":7},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":5,"fromRow":5,"toCol":5,"toRow":0}],
  },
  {
    id: 25, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"A","color":"black","col":4,"row":1},{"type":"A","color":"black","col":3,"row":2},{"type":"C","color":"red","col":7,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":3,"row":9},{"type":"H","color":"black","col":5,"row":6},{"type":"P","color":"black","col":6,"row":5},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"black","col":8,"row":4},{"type":"E","color":"black","col":4,"row":2}],
    solution: [{"fromCol":7,"fromRow":7,"toCol":3,"toRow":7}],
  },
  {
    id: 26, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":3,"row":4},{"type":"G","color":"red","col":3,"row":8},{"type":"H","color":"black","col":2,"row":4},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"red","col":4,"row":5},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":6,"row":6},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":3,"fromRow":4,"toCol":3,"toRow":0}],
  },
  {
    id: 27, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"black","col":4,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"R","color":"red","col":5,"row":4},{"type":"G","color":"red","col":5,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"C","color":"red","col":7,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"red","col":4,"row":5},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"red","col":2,"row":5},{"type":"H","color":"red","col":6,"row":7}],
    solution: [{"fromCol":5,"fromRow":4,"toCol":5,"toRow":0}],
  },
  {
    id: 28, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"C","color":"red","col":0,"row":0},{"type":"C","color":"black","col":1,"row":0},{"type":"H","color":"red","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"red","col":4,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"black","col":6,"row":2},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":1,"row":2},{"type":"P","color":"red","col":4,"row":6},{"type":"R","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":6,"row":6}],
    solution: [{"fromCol":3,"fromRow":0,"toCol":4,"toRow":2}],
  },
  {
    id: 29, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"red","col":5,"row":1},{"type":"H","color":"red","col":1,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"red","col":2,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"C","color":"red","col":2,"row":7},{"type":"P","color":"red","col":4,"row":6}],
    solution: [{"fromCol":1,"fromRow":3,"toCol":2,"toRow":1}],
  },
  {
    id: 30, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"red","col":3,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"C","color":"red","col":7,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":2,"row":5},{"type":"R","color":"black","col":7,"row":3},{"type":"P","color":"black","col":6,"row":4},{"type":"R","color":"red","col":4,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"black","col":2,"row":3},{"type":"P","color":"black","col":8,"row":3},{"type":"H","color":"red","col":2,"row":7}],
    solution: [{"fromCol":7,"fromRow":5,"toCol":3,"toRow":5}],
  },
  {
    id: 31, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"H","color":"red","col":2,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":1,"row":4},{"type":"C","color":"black","col":2,"row":6},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"R","color":"red","col":2,"row":7},{"type":"C","color":"red","col":6,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":4,"row":6}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":3,"toRow":2}],
  },
  {
    id: 32, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":6,"row":0},{"type":"C","color":"red","col":8,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":3,"row":9},{"type":"H","color":"red","col":7,"row":3},{"type":"R","color":"red","col":7,"row":6},{"type":"R","color":"black","col":2,"row":9},{"type":"P","color":"black","col":4,"row":5},{"type":"R","color":"black","col":3,"row":5},{"type":"P","color":"black","col":2,"row":4}],
    solution: [{"fromCol":6,"fromRow":0,"toCol":6,"toRow":9}],
  },
  {
    id: 33, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"P","color":"red","col":5,"row":1},{"type":"R","color":"red","col":4,"row":6},{"type":"C","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":4,"row":1},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"red","col":2,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"black","col":2,"row":0},{"type":"R","color":"black","col":6,"row":7},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":4,"fromRow":6,"toCol":4,"toRow":1}],
  },
  {
    id: 34, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"red","col":2,"row":4},{"type":"C","color":"red","col":4,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":0,"row":4},{"type":"P","color":"red","col":2,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":6,"row":3},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":4,"toRow":4}],
  },
  {
    id: 35, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"C","color":"red","col":1,"row":0},{"type":"P","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"P","color":"red","col":3,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":6,"row":2},{"type":"C","color":"red","col":1,"row":7},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":6,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 36, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":3,"row":2},{"type":"C","color":"red","col":2,"row":4},{"type":"C","color":"red","col":4,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"black","col":6,"row":4},{"type":"P","color":"red","col":4,"row":6},{"type":"C","color":"black","col":2,"row":1},{"type":"H","color":"black","col":5,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":6,"row":6},{"type":"H","color":"red","col":6,"row":7},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":4,"toRow":4}],
  },
  {
    id: 37, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"red","col":4,"row":4},{"type":"C","color":"red","col":7,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":8,"row":5},{"type":"R","color":"black","col":5,"row":4},{"type":"E","color":"red","col":4,"row":7},{"type":"H","color":"red","col":5,"row":3},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":2,"row":4},{"type":"H","color":"black","col":6,"row":2},{"type":"H","color":"red","col":2,"row":7}],
    solution: [{"fromCol":7,"fromRow":5,"toCol":4,"toRow":5}],
  },
  {
    id: 38, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"P","color":"red","col":3,"row":1},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"red","col":5,"row":6},{"type":"A","color":"red","col":3,"row":7},{"type":"C","color":"red","col":3,"row":9},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":1,"row":1},{"type":"C","color":"black","col":0,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":8,"row":4},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":5,"row":7},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":3,"fromRow":1,"toCol":3,"toRow":0}],
  },
  {
    id: 39, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":4,"row":2},{"type":"R","color":"red","col":5,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":3,"row":3},{"type":"C","color":"black","col":6,"row":4},{"type":"E","color":"black","col":0,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":6,"row":5},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":4,"fromRow":2,"toCol":6,"toRow":1}],
  },
  {
    id: 40, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"H","color":"red","col":3,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":2,"row":3},{"type":"H","color":"black","col":2,"row":2},{"type":"C","color":"black","col":7,"row":2},{"type":"P","color":"red","col":2,"row":5},{"type":"P","color":"red","col":6,"row":6},{"type":"H","color":"red","col":2,"row":7},{"type":"C","color":"red","col":4,"row":7}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":5,"toRow":2}],
  },
  {
    id: 41, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":2,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"C","color":"red","col":2,"row":3},{"type":"H","color":"black","col":7,"row":0},{"type":"P","color":"red","col":2,"row":4},{"type":"C","color":"red","col":2,"row":7},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 42, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":8,"row":2},{"type":"R","color":"red","col":5,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":6,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":6,"row":3},{"type":"R","color":"black","col":3,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"red","col":8,"row":6},{"type":"R","color":"red","col":2,"row":0},{"type":"E","color":"red","col":6,"row":9}],
    solution: [{"fromCol":8,"fromRow":2,"toCol":6,"toRow":1}],
  },
  {
    id: 43, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":5},{"type":"R","color":"red","col":2,"row":6},{"type":"G","color":"red","col":4,"row":8},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":2,"row":7},{"type":"R","color":"black","col":1,"row":7},{"type":"P","color":"red","col":0,"row":6},{"type":"H","color":"black","col":2,"row":8},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"red","col":6,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":2,"fromRow":6,"toCol":2,"toRow":0}],
  },
  {
    id: 44, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":1,"row":0},{"type":"G","color":"black","col":3,"row":0},{"type":"P","color":"red","col":2,"row":1},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"red","col":0,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"red","col":5,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0}],
  },
  {
    id: 45, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"R","color":"red","col":7,"row":0},{"type":"G","color":"black","col":3,"row":1},{"type":"P","color":"red","col":3,"row":3},{"type":"H","color":"black","col":4,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"H","color":"red","col":3,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":1,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"red","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":3,"fromRow":5,"toCol":2,"toRow":3}],
  },
  {
    id: 46, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"black","col":2,"row":3},{"type":"C","color":"red","col":2,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":2,"row":6},{"type":"H","color":"red","col":2,"row":7},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"H","color":"black","col":0,"row":2},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":4,"row":3}],
    solution: [{"fromCol":2,"fromRow":5,"toCol":2,"toRow":0}],
  },
  {
    id: 47, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"R","color":"red","col":6,"row":3},{"type":"C","color":"red","col":6,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"black","col":5,"row":5},{"type":"P","color":"red","col":6,"row":6},{"type":"H","color":"red","col":6,"row":7},{"type":"A","color":"black","col":3,"row":0},{"type":"C","color":"black","col":7,"row":2},{"type":"P","color":"black","col":8,"row":4},{"type":"P","color":"red","col":8,"row":6},{"type":"H","color":"red","col":2,"row":5}],
    solution: [{"fromCol":6,"fromRow":5,"toCol":6,"toRow":0}],
  },
  {
    id: 48, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"black","col":2,"row":3},{"type":"C","color":"red","col":2,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":1,"row":0},{"type":"R","color":"black","col":3,"row":7},{"type":"C","color":"red","col":4,"row":7},{"type":"E","color":"red","col":2,"row":9},{"type":"H","color":"black","col":5,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"H","color":"red","col":4,"row":6},{"type":"E","color":"black","col":6,"row":0}],
    solution: [{"fromCol":2,"fromRow":7,"toCol":2,"toRow":0}],
  },
  {
    id: 49, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":7,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":3,"row":3},{"type":"E","color":"black","col":2,"row":4},{"type":"R","color":"black","col":6,"row":4},{"type":"R","color":"black","col":5,"row":5},{"type":"H","color":"red","col":6,"row":5},{"type":"H","color":"black","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":4,"fromRow":4,"toCol":3,"toRow":2}],
  },
  {
    id: 50, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"H","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":4,"row":4},{"type":"C","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":3,"row":4},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":2,"row":3},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"black","col":0,"row":3},{"type":"H","color":"black","col":7,"row":6},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":4,"fromRow":4,"toCol":5,"toRow":2}],
  },
  {
    id: 51, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":7,"row":1},{"type":"H","color":"red","col":2,"row":4},{"type":"C","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":3,"row":3},{"type":"P","color":"black","col":2,"row":6},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"H","color":"red","col":0,"row":7}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":3,"toRow":2}],
  },
  {
    id: 52, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":2,"row":4},{"type":"C","color":"red","col":2,"row":7},{"type":"G","color":"red","col":3,"row":9},{"type":"H","color":"black","col":1,"row":0},{"type":"H","color":"black","col":2,"row":8},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"red","col":0,"row":6},{"type":"H","color":"red","col":4,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":6,"row":4}],
    solution: [{"fromCol":2,"fromRow":7,"toCol":2,"toRow":0}],
  },
  {
    id: 53, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"C","color":"red","col":0,"row":0},{"type":"C","color":"black","col":1,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":3,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":2,"row":3},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"red","col":5,"row":4},{"type":"P","color":"red","col":2,"row":5},{"type":"H","color":"red","col":4,"row":6}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":3,"toRow":0}],
  },
  {
    id: 54, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":3,"row":1},{"type":"R","color":"red","col":7,"row":1},{"type":"C","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":2,"row":2},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":2,"row":3},{"type":"C","color":"red","col":1,"row":4},{"type":"P","color":"red","col":6,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":3,"fromRow":1,"toCol":4,"toRow":1}],
  },
  {
    id: 55, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":4,"row":3},{"type":"H","color":"red","col":5,"row":3},{"type":"C","color":"red","col":4,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":4,"row":1},{"type":"P","color":"black","col":6,"row":3},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":4,"fromRow":3,"toCol":4,"toRow":1}],
  },
  {
    id: 56, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"red","col":4,"row":4},{"type":"R","color":"red","col":5,"row":6},{"type":"C","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":3,"row":2},{"type":"H","color":"red","col":6,"row":7},{"type":"R","color":"red","col":2,"row":3},{"type":"P","color":"black","col":3,"row":5},{"type":"P","color":"red","col":2,"row":6},{"type":"H","color":"black","col":6,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":4,"fromRow":7,"toCol":4,"toRow":2}],
  },
  {
    id: 57, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":1,"row":1},{"type":"H","color":"red","col":5,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":6,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"red","col":6,"row":3},{"type":"C","color":"black","col":4,"row":2},{"type":"E","color":"black","col":6,"row":4},{"type":"R","color":"red","col":3,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":5,"fromRow":3,"toCol":6,"toRow":1}],
  },
  {
    id: 58, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"red","col":7,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":7,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"H","color":"black","col":2,"row":2},{"type":"P","color":"red","col":6,"row":4},{"type":"P","color":"red","col":8,"row":6},{"type":"C","color":"red","col":6,"row":7},{"type":"E","color":"red","col":6,"row":9}],
    solution: [{"fromCol":7,"fromRow":1,"toCol":5,"toRow":2}],
  },
  {
    id: 59, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"C","color":"red","col":0,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"R","color":"black","col":5,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":7,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":8,"row":2},{"type":"P","color":"black","col":6,"row":3},{"type":"C","color":"red","col":8,"row":3},{"type":"R","color":"red","col":1,"row":1},{"type":"P","color":"black","col":2,"row":4},{"type":"P","color":"red","col":8,"row":5},{"type":"C","color":"black","col":4,"row":6},{"type":"P","color":"red","col":2,"row":6}],
    solution: [{"fromCol":7,"fromRow":2,"toCol":4,"toRow":2}],
  },
  {
    id: 60, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"black","col":6,"row":2},{"type":"C","color":"red","col":6,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":5,"row":3},{"type":"R","color":"black","col":7,"row":3},{"type":"P","color":"black","col":8,"row":3},{"type":"C","color":"black","col":4,"row":2},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"red","col":5,"row":7},{"type":"E","color":"red","col":6,"row":9},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":6,"fromRow":3,"toCol":6,"toRow":0}],
  },
  {
    id: 61, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"H","color":"red","col":2,"row":4},{"type":"R","color":"black","col":5,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"C","color":"red","col":5,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":3,"row":3},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":4},{"type":"P","color":"black","col":6,"row":3},{"type":"H","color":"black","col":0,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"E","color":"red","col":2,"row":9},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":3,"toRow":2}],
  },
  {
    id: 62, title: "Chiếu hết trong 1 nước", movesToMate: 1, turn: "red",
    pieces: [{"type":"H","color":"black","col":2,"row":2},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"C","color":"red","col":2,"row":3},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"black","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"black","col":6,"row":0},{"type":"C","color":"black","col":3,"row":6},{"type":"H","color":"red","col":2,"row":7},{"type":"R","color":"red","col":5,"row":5},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":2,"fromRow":3,"toCol":2,"toRow":0}],
  },
  {
    id: 63, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"P","color":"red","col":3,"row":3},{"type":"C","color":"black","col":3,"row":4},{"type":"C","color":"red","col":3,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":4,"row":0},{"type":"E","color":"black","col":6,"row":4},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":1}],
  },
  {
    id: 64, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":4,"row":1},{"type":"G","color":"black","col":5,"row":1},{"type":"P","color":"red","col":3,"row":2},{"type":"P","color":"red","col":6,"row":2},{"type":"C","color":"red","col":5,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":3,"row":9},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":3,"fromRow":2,"toCol":4,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":5,"toRow":2}],
  },
  {
    id: 65, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":0},{"type":"P","color":"red","col":3,"row":1},{"type":"R","color":"red","col":4,"row":1},{"type":"R","color":"black","col":5,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"C","color":"red","col":4,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":3,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":5,"fromRow":4,"toCol":2,"toRow":4},{"fromCol":3,"fromRow":0,"toCol":4,"toRow":0}],
  },
  {
    id: 66, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"P","color":"red","col":2,"row":1},{"type":"P","color":"red","col":5,"row":1},{"type":"P","color":"black","col":3,"row":8},{"type":"G","color":"red","col":5,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"red","col":3,"row":7},{"type":"P","color":"red","col":4,"row":3},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"black","col":6,"row":4}],
    solution: [{"fromCol":5,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":3,"fromRow":8,"toCol":3,"toRow":9},{"fromCol":2,"fromRow":1,"toCol":3,"toRow":1}],
  },
  {
    id: 67, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":4,"row":0},{"type":"G","color":"black","col":3,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":5,"row":1},{"type":"C","color":"red","col":6,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"R","color":"black","col":7,"row":0},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":0,"fromRow":1,"toCol":3,"toRow":1},{"fromCol":5,"fromRow":1,"toCol":3,"toRow":1}],
  },
  {
    id: 68, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":7,"row":1},{"type":"C","color":"red","col":4,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"black","col":7,"row":2},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":7,"fromRow":1,"toCol":5,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":4,"fromRow":3,"toCol":5,"toRow":3}],
  },
  {
    id: 69, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"H","color":"red","col":5,"row":2},{"type":"R","color":"red","col":3,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":3,"row":6},{"type":"R","color":"black","col":2,"row":6},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"red","col":4,"row":8},{"type":"C","color":"red","col":3,"row":9},{"type":"P","color":"red","col":0,"row":6},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":3,"fromRow":7,"toCol":3,"toRow":6},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":6,"toCol":3,"toRow":2}],
  },
  {
    id: 70, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":3,"row":1},{"type":"R","color":"red","col":2,"row":9},{"type":"G","color":"red","col":3,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":3,"row":3},{"type":"C","color":"red","col":3,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":2,"fromRow":9,"toCol":2,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 71, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":2,"row":2},{"type":"R","color":"red","col":5,"row":2},{"type":"G","color":"red","col":5,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"black","col":4,"row":4},{"type":"E","color":"black","col":8,"row":2},{"type":"H","color":"red","col":4,"row":6},{"type":"P","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":5,"fromRow":2,"toCol":4,"toRow":2},{"fromCol":3,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":2,"toCol":4,"toRow":1}],
  },
  {
    id: 72, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":3,"row":1},{"type":"R","color":"red","col":5,"row":1},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"black","col":2,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":3,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0}],
  },
  {
    id: 73, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":0,"row":0},{"type":"H","color":"red","col":1,"row":1},{"type":"G","color":"black","col":3,"row":1},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":2,"row":4},{"type":"R","color":"black","col":5,"row":2},{"type":"C","color":"red","col":3,"row":5},{"type":"P","color":"red","col":2,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":1,"fromRow":1,"toCol":2,"toRow":3},{"fromCol":3,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":0,"fromRow":0,"toCol":0,"toRow":2}],
  },
  {
    id: 74, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"H","color":"red","col":1,"row":1},{"type":"H","color":"red","col":2,"row":1},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"black","col":4,"row":1},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":0,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":2,"fromRow":1,"toCol":4,"toRow":2},{"fromCol":3,"fromRow":0,"toCol":3,"toRow":1},{"fromCol":4,"fromRow":2,"toCol":2,"toRow":3}],
  },
  {
    id: 75, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":0},{"type":"H","color":"red","col":6,"row":1},{"type":"R","color":"red","col":5,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"black","col":5,"row":3},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"red","col":6,"row":2},{"type":"A","color":"red","col":5,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"red","col":4,"row":7},{"type":"R","color":"red","col":6,"row":9}],
    solution: [{"fromCol":5,"fromRow":8,"toCol":5,"toRow":3},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":2}],
  },
  {
    id: 76, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":5,"row":3},{"type":"C","color":"red","col":6,"row":3},{"type":"G","color":"red","col":5,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"black","col":5,"row":2},{"type":"C","color":"red","col":4,"row":4},{"type":"P","color":"red","col":2,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":5,"fromRow":3,"toCol":3,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":6,"fromRow":3,"toCol":3,"toRow":3}],
  },
  {
    id: 77, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"C","color":"red","col":0,"row":1},{"type":"H","color":"red","col":1,"row":1},{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":7,"row":6},{"type":"G","color":"red","col":3,"row":9},{"type":"E","color":"black","col":4,"row":2},{"type":"A","color":"black","col":5,"row":2},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"black","col":6,"row":5},{"type":"C","color":"black","col":4,"row":5},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":5,"row":9},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":7,"fromRow":6,"toCol":7,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":6,"toRow":0},{"fromCol":7,"fromRow":0,"toCol":6,"toRow":0}],
  },
  {
    id: 78, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":1,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":8},{"type":"C","color":"red","col":0,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"R","color":"black","col":6,"row":0},{"type":"E","color":"black","col":2,"row":4},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"R","color":"red","col":7,"row":2}],
    solution: [{"fromCol":4,"fromRow":4,"toCol":3,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":1,"fromRow":0,"toCol":1,"toRow":1}],
  },
  {
    id: 79, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":1},{"type":"H","color":"red","col":3,"row":3},{"type":"P","color":"red","col":6,"row":3},{"type":"C","color":"red","col":5,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"black","col":0,"row":2},{"type":"E","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":6,"fromRow":3,"toCol":5,"toRow":3},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":2}],
  },
  {
    id: 80, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":7,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":5,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"H","color":"red","col":6,"row":7},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"black","col":6,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"red","col":8,"row":7},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":7,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":5,"fromRow":7,"toCol":5,"toRow":1}],
  },
  {
    id: 81, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":1,"row":5},{"type":"G","color":"red","col":5,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":1,"row":4},{"type":"P","color":"red","col":4,"row":5},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"black","col":2,"row":4},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":2,"row":6},{"type":"R","color":"red","col":5,"row":4}],
    solution: [{"fromCol":1,"fromRow":5,"toCol":3,"toRow":5},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":5,"toCol":3,"toRow":2}],
  },
  {
    id: 82, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"H","color":"red","col":6,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":1,"row":4},{"type":"A","color":"red","col":3,"row":9},{"type":"G","color":"red","col":5,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"red","col":6,"row":5},{"type":"H","color":"black","col":2,"row":7},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":1,"fromRow":4,"toCol":1,"toRow":1},{"fromCol":3,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":6,"fromRow":1,"toCol":5,"toRow":3}],
  },
  {
    id: 83, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":1},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"red","col":2,"row":2},{"type":"R","color":"red","col":3,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":2,"row":3},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":6,"row":2},{"type":"C","color":"red","col":0,"row":0},{"type":"P","color":"red","col":6,"row":5},{"type":"C","color":"red","col":4,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":3,"fromRow":2,"toCol":4,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":1},{"fromCol":2,"fromRow":2,"toCol":3,"toRow":0}],
  },
  {
    id: 84, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":1},{"type":"H","color":"red","col":4,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"C","color":"red","col":5,"row":7},{"type":"G","color":"red","col":3,"row":8},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":2,"row":3},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":4,"fromRow":3,"toCol":2,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":1},{"fromCol":4,"fromRow":4,"toCol":5,"toRow":4}],
  },
  {
    id: 85, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"H","color":"red","col":6,"row":1},{"type":"P","color":"red","col":3,"row":3},{"type":"C","color":"red","col":3,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"black","col":2,"row":1},{"type":"A","color":"black","col":3,"row":2},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":2,"row":4},{"type":"P","color":"red","col":5,"row":4},{"type":"H","color":"red","col":2,"row":6},{"type":"P","color":"red","col":0,"row":5},{"type":"P","color":"red","col":6,"row":5}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":3,"toRow":2},{"fromCol":2,"fromRow":1,"toCol":3,"toRow":3},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":1}],
  },
  {
    id: 86, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"red","col":6,"row":0},{"type":"R","color":"red","col":3,"row":1},{"type":"H","color":"red","col":6,"row":2},{"type":"G","color":"red","col":3,"row":8},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":3,"row":2},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"black","col":2,"row":4},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":8,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":3,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":6,"fromRow":2,"toCol":5,"toRow":0}],
  },
  {
    id: 87, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":8,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":5,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"R","color":"black","col":3,"row":2},{"type":"H","color":"red","col":2,"row":2},{"type":"P","color":"red","col":4,"row":5},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":8,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":1}],
  },
  {
    id: 88, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":2,"row":4},{"type":"C","color":"red","col":2,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":5,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":3,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":2,"fromRow":6,"toCol":3,"toRow":6}],
  },
  {
    id: 89, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":7,"row":4},{"type":"G","color":"red","col":3,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":8,"row":4},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"black","col":8,"row":3},{"type":"R","color":"red","col":3,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":5,"row":9}],
    solution: [{"fromCol":7,"fromRow":4,"toCol":5,"toRow":4},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":4,"toCol":5,"toRow":2}],
  },
  {
    id: 90, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"C","color":"red","col":3,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"C","color":"black","col":6,"row":2},{"type":"R","color":"red","col":7,"row":0},{"type":"P","color":"red","col":2,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":6,"row":6}],
    solution: [{"fromCol":4,"fromRow":2,"toCol":6,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":4,"fromRow":3,"toCol":3,"toRow":3}],
  },
  {
    id: 91, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"P","color":"red","col":4,"row":2},{"type":"H","color":"red","col":3,"row":3},{"type":"C","color":"red","col":3,"row":7},{"type":"G","color":"red","col":3,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":3,"row":1},{"type":"P","color":"red","col":2,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":4,"fromRow":2,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 92, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":5},{"type":"R","color":"red","col":1,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":2,"row":3},{"type":"R","color":"black","col":0,"row":1},{"type":"P","color":"black","col":0,"row":3},{"type":"H","color":"black","col":2,"row":4},{"type":"H","color":"red","col":0,"row":7},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":1,"fromRow":7,"toCol":1,"toRow":0},{"fromCol":0,"fromRow":2,"toCol":2,"toRow":0},{"fromCol":2,"fromRow":3,"toCol":2,"toRow":0}],
  },
  {
    id: 93, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"black","col":2,"row":4},{"type":"C","color":"red","col":1,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"red","col":2,"row":9},{"type":"R","color":"red","col":3,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"H","color":"black","col":6,"row":2},{"type":"P","color":"red","col":0,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":0,"row":3}],
    solution: [{"fromCol":1,"fromRow":7,"toCol":1,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":2,"toRow":0},{"fromCol":2,"fromRow":9,"toCol":2,"toRow":0}],
  },
  {
    id: 94, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":3,"row":1},{"type":"G","color":"black","col":5,"row":2},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":5,"row":3},{"type":"H","color":"black","col":5,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"red","col":5,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":8,"row":3},{"type":"E","color":"red","col":8,"row":7},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":5,"fromRow":3,"toCol":7,"toRow":2},{"fromCol":5,"fromRow":5,"toCol":7,"toRow":6},{"fromCol":3,"fromRow":1,"toCol":5,"toRow":1}],
  },
  {
    id: 95, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"C","color":"red","col":0,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":5,"row":0},{"type":"R","color":"red","col":1,"row":1},{"type":"P","color":"red","col":4,"row":1},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"black","col":2,"row":0},{"type":"R","color":"black","col":7,"row":0},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":6,"row":6},{"type":"C","color":"red","col":4,"row":7}],
    solution: [{"fromCol":4,"fromRow":1,"toCol":5,"toRow":1},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":0},{"fromCol":1,"fromRow":1,"toCol":4,"toRow":1}],
  },
  {
    id: 96, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":4,"row":1},{"type":"G","color":"black","col":5,"row":0},{"type":"H","color":"red","col":6,"row":1},{"type":"R","color":"red","col":5,"row":2},{"type":"R","color":"red","col":5,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":5,"row":1},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"red","col":4,"row":2},{"type":"P","color":"red","col":6,"row":2},{"type":"H","color":"black","col":3,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":5,"fromRow":2,"toCol":5,"toRow":1},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":0},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0}],
  },
  {
    id: 97, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"black","col":5,"row":1},{"type":"R","color":"red","col":3,"row":4},{"type":"C","color":"red","col":5,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"R","color":"red","col":3,"row":9},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":2,"row":4},{"type":"C","color":"black","col":5,"row":2},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":5,"row":9},{"type":"C","color":"red","col":2,"row":7}],
    solution: [{"fromCol":3,"fromRow":4,"toCol":3,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":3,"fromRow":9,"toCol":3,"toRow":0}],
  },
  {
    id: 98, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":4,"row":2},{"type":"G","color":"red","col":4,"row":8},{"type":"R","color":"red","col":3,"row":9},{"type":"C","color":"black","col":3,"row":2},{"type":"R","color":"black","col":1,"row":0},{"type":"P","color":"black","col":6,"row":3},{"type":"A","color":"red","col":5,"row":9},{"type":"C","color":"black","col":1,"row":3},{"type":"R","color":"red","col":2,"row":7},{"type":"E","color":"red","col":6,"row":9},{"type":"P","color":"red","col":6,"row":5}],
    solution: [{"fromCol":3,"fromRow":9,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":0,"toCol":4,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":6,"toRow":1}],
  },
  {
    id: 99, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":1,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":2,"row":1},{"type":"H","color":"black","col":4,"row":1},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":2,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"R","color":"red","col":7,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"C","color":"red","col":4,"row":5}],
    solution: [{"fromCol":1,"fromRow":2,"toCol":1,"toRow":0},{"fromCol":2,"fromRow":1,"toCol":2,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0}],
  },
  {
    id: 100, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":5,"row":3},{"type":"P","color":"black","col":2,"row":4},{"type":"C","color":"red","col":4,"row":4},{"type":"G","color":"red","col":5,"row":9},{"type":"R","color":"black","col":5,"row":6},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":0,"row":4},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":5,"fromRow":3,"toCol":5,"toRow":6},{"fromCol":2,"fromRow":4,"toCol":2,"toRow":5},{"fromCol":5,"fromRow":6,"toCol":5,"toRow":0}],
  },
  {
    id: 101, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"black","col":4,"row":2},{"type":"R","color":"red","col":1,"row":4},{"type":"C","color":"red","col":4,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":0,"row":2},{"type":"H","color":"black","col":0,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":2,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"H","color":"red","col":2,"row":7},{"type":"P","color":"red","col":6,"row":6},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":1,"fromRow":4,"toCol":1,"toRow":0},{"fromCol":0,"fromRow":2,"toCol":2,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0}],
  },
  {
    id: 102, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":2,"row":0},{"type":"G","color":"black","col":5,"row":0},{"type":"C","color":"black","col":5,"row":2},{"type":"R","color":"red","col":6,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"C","color":"red","col":1,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":8,"row":2},{"type":"P","color":"black","col":6,"row":4},{"type":"P","color":"red","col":6,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"H","color":"red","col":2,"row":7}],
    solution: [{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":5,"fromRow":0,"toCol":5,"toRow":1},{"fromCol":6,"fromRow":2,"toCol":6,"toRow":1}],
  },
  {
    id: 103, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":2,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"H","color":"red","col":6,"row":4},{"type":"H","color":"black","col":6,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":6,"row":6},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":2,"fromRow":3,"toCol":2,"toRow":0},{"fromCol":3,"fromRow":4,"toCol":3,"toRow":0},{"fromCol":6,"fromRow":4,"toCol":5,"toRow":2}],
  },
  {
    id: 104, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"black","col":4,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"H","color":"red","col":2,"row":4},{"type":"R","color":"red","col":7,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"R","color":"black","col":8,"row":0},{"type":"P","color":"red","col":6,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"H","color":"red","col":6,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":3,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":7,"fromRow":5,"toCol":7,"toRow":1}],
  },
  {
    id: 105, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":3,"row":1},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"red","col":5,"row":1},{"type":"C","color":"red","col":1,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"red","col":1,"row":1},{"type":"C","color":"black","col":6,"row":1},{"type":"H","color":"black","col":0,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":1,"fromRow":2,"toCol":4,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":5,"fromRow":1,"toCol":4,"toRow":1}],
  },
  {
    id: 106, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"red","col":5,"row":2},{"type":"H","color":"red","col":6,"row":2},{"type":"C","color":"red","col":4,"row":4},{"type":"C","color":"black","col":0,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":0,"row":6},{"type":"A","color":"red","col":3,"row":7},{"type":"P","color":"black","col":4,"row":5},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"black","col":8,"row":4},{"type":"H","color":"black","col":6,"row":7}],
    solution: [{"fromCol":5,"fromRow":2,"toCol":5,"toRow":1},{"fromCol":0,"fromRow":7,"toCol":0,"toRow":8},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0}],
  },
  {
    id: 107, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"R","color":"red","col":1,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":4,"row":4},{"type":"C","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":3,"row":0},{"type":"C","color":"black","col":3,"row":2},{"type":"E","color":"black","col":6,"row":0},{"type":"C","color":"black","col":6,"row":2},{"type":"P","color":"red","col":6,"row":6},{"type":"C","color":"red","col":3,"row":7},{"type":"H","color":"red","col":6,"row":7},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":1,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":4,"fromRow":4,"toCol":3,"toRow":2}],
  },
  {
    id: 108, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":5,"row":0},{"type":"R","color":"red","col":4,"row":2},{"type":"C","color":"red","col":1,"row":7},{"type":"R","color":"red","col":7,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"red","col":5,"row":9},{"type":"E","color":"red","col":6,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"red","col":0,"row":7},{"type":"H","color":"black","col":6,"row":2},{"type":"R","color":"black","col":8,"row":2},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"black","col":4,"row":3},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":1,"fromRow":7,"toCol":1,"toRow":0},{"fromCol":5,"fromRow":0,"toCol":5,"toRow":1},{"fromCol":7,"fromRow":7,"toCol":7,"toRow":1}],
  },
  {
    id: 109, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":5,"row":0},{"type":"C","color":"red","col":1,"row":1},{"type":"R","color":"black","col":5,"row":2},{"type":"R","color":"red","col":7,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"red","col":5,"row":9},{"type":"E","color":"red","col":6,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":8,"row":6},{"type":"P","color":"red","col":2,"row":5},{"type":"P","color":"red","col":0,"row":6},{"type":"C","color":"black","col":8,"row":9},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":1,"fromRow":1,"toCol":1,"toRow":0},{"fromCol":5,"fromRow":0,"toCol":5,"toRow":1},{"fromCol":7,"fromRow":4,"toCol":7,"toRow":1}],
  },
  {
    id: 110, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"C","color":"red","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"red","col":0,"row":1},{"type":"R","color":"red","col":7,"row":1},{"type":"G","color":"black","col":5,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":8,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"C","color":"black","col":4,"row":4},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":5,"row":9},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":7,"fromRow":1,"toCol":7,"toRow":2},{"fromCol":5,"fromRow":2,"toCol":5,"toRow":1},{"fromCol":3,"fromRow":0,"toCol":3,"toRow":1}],
  },
  {
    id: 111, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":1,"row":3},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":6,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":5,"row":6},{"type":"R","color":"red","col":1,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":6,"row":6},{"type":"H","color":"black","col":0,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":6,"fromRow":3,"toCol":6,"toRow":0},{"fromCol":5,"fromRow":6,"toCol":5,"toRow":0},{"fromCol":1,"fromRow":3,"toCol":3,"toRow":2}],
  },
  {
    id: 112, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"H","color":"red","col":2,"row":3},{"type":"R","color":"red","col":3,"row":3},{"type":"P","color":"black","col":2,"row":4},{"type":"R","color":"black","col":4,"row":4},{"type":"C","color":"red","col":4,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"red","col":2,"row":6},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":0,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":2,"fromRow":3,"toCol":1,"toRow":1},{"fromCol":2,"fromRow":4,"toCol":2,"toRow":5},{"fromCol":3,"fromRow":3,"toCol":3,"toRow":0}],
  },
  {
    id: 113, title: "Chiếu hết trong 2 nước", movesToMate: 2, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"P","color":"black","col":6,"row":3},{"type":"C","color":"red","col":4,"row":5},{"type":"R","color":"black","col":6,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"R","color":"red","col":7,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":4,"row":6},{"type":"C","color":"black","col":8,"row":6},{"type":"H","color":"black","col":6,"row":7},{"type":"H","color":"red","col":3,"row":5},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"R","color":"red","col":5,"row":3}],
    solution: [{"fromCol":7,"fromRow":7,"toCol":7,"toRow":0},{"fromCol":8,"fromRow":6,"toCol":4,"toRow":6},{"fromCol":7,"fromRow":0,"toCol":6,"toRow":0}],
  },
  {
    id: 114, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"R","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":7,"row":0},{"type":"G","color":"red","col":5,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"black","col":4,"row":4},{"type":"H","color":"black","col":6,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":5,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":0,"row":6}],
    solution: [{"fromCol":7,"fromRow":0,"toCol":6,"toRow":0},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":2,"fromRow":0,"toCol":2,"toRow":1},{"fromCol":4,"fromRow":1,"toCol":4,"toRow":2},{"fromCol":6,"fromRow":0,"toCol":6,"toRow":2}],
  },
  {
    id: 115, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"C","color":"red","col":0,"row":0},{"type":"R","color":"red","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":5,"row":4},{"type":"G","color":"red","col":5,"row":8},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"black","col":4,"row":4},{"type":"C","color":"black","col":1,"row":6},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":5,"fromRow":4,"toCol":4,"toRow":4},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":2,"fromRow":0,"toCol":2,"toRow":1},{"fromCol":1,"fromRow":6,"toCol":1,"toRow":0},{"fromCol":4,"fromRow":4,"toCol":4,"toRow":1}],
  },
  {
    id: 116, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":1,"row":2},{"type":"H","color":"red","col":4,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"black","col":7,"row":1},{"type":"P","color":"red","col":2,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":6,"row":6}],
    solution: [{"fromCol":4,"fromRow":2,"toCol":6,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":1,"fromRow":2,"toCol":1,"toRow":1},{"fromCol":2,"fromRow":0,"toCol":2,"toRow":1},{"fromCol":1,"fromRow":1,"toCol":2,"toRow":1}],
  },
  {
    id: 117, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":4,"row":3},{"type":"R","color":"red","col":1,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":3,"row":2},{"type":"C","color":"black","col":2,"row":1},{"type":"H","color":"red","col":3,"row":3},{"type":"P","color":"black","col":0,"row":4},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":1,"fromRow":4,"toCol":1,"toRow":0},{"fromCol":2,"fromRow":1,"toCol":2,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":0},{"fromCol":3,"fromRow":3,"toCol":2,"toRow":1}],
  },
  {
    id: 118, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"P","color":"red","col":4,"row":2},{"type":"R","color":"red","col":2,"row":4},{"type":"C","color":"red","col":3,"row":7},{"type":"G","color":"red","col":3,"row":8},{"type":"R","color":"black","col":7,"row":3},{"type":"C","color":"black","col":7,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"red","col":8,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"H","color":"red","col":6,"row":7},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":2,"fromRow":4,"toCol":3,"toRow":4},{"fromCol":7,"fromRow":3,"toCol":3,"toRow":3},{"fromCol":3,"fromRow":4,"toCol":3,"toRow":3},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":3,"toCol":3,"toRow":2}],
  },
  {
    id: 119, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":1,"row":1},{"type":"R","color":"red","col":5,"row":1},{"type":"H","color":"black","col":3,"row":4},{"type":"G","color":"red","col":5,"row":9},{"type":"C","color":"black","col":3,"row":1},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"black","col":2,"row":5},{"type":"P","color":"red","col":6,"row":6},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":1,"fromRow":1,"toCol":3,"toRow":1},{"fromCol":3,"fromRow":4,"toCol":5,"toRow":5},{"fromCol":5,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":3,"fromRow":1,"toCol":3,"toRow":0}],
  },
  {
    id: 120, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"black","col":4,"row":1},{"type":"R","color":"red","col":3,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"G","color":"red","col":3,"row":8},{"type":"R","color":"black","col":2,"row":8},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"black","col":4,"row":2},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"C","color":"red","col":4,"row":7},{"type":"E","color":"black","col":6,"row":4}],
    solution: [{"fromCol":3,"fromRow":8,"toCol":3,"toRow":9},{"fromCol":2,"fromRow":8,"toCol":3,"toRow":8},{"fromCol":3,"fromRow":9,"toCol":3,"toRow":8},{"fromCol":0,"fromRow":3,"toCol":0,"toRow":4},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":0}],
  },
  {
    id: 121, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":1,"row":3},{"type":"P","color":"black","col":4,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":7,"row":9},{"type":"H","color":"black","col":8,"row":2},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"red","col":5,"row":9},{"type":"P","color":"red","col":2,"row":5},{"type":"C","color":"red","col":6,"row":7},{"type":"E","color":"red","col":8,"row":7}],
    solution: [{"fromCol":1,"fromRow":3,"toCol":2,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":7,"fromRow":9,"toCol":7,"toRow":1},{"fromCol":8,"fromRow":2,"toCol":6,"toRow":1},{"fromCol":7,"fromRow":1,"toCol":6,"toRow":1}],
  },
  {
    id: 122, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":1},{"type":"P","color":"red","col":3,"row":3},{"type":"C","color":"red","col":3,"row":6},{"type":"H","color":"red","col":2,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":3,"row":2},{"type":"R","color":"black","col":2,"row":5},{"type":"R","color":"black","col":1,"row":7},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"red","col":6,"row":1},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"red","col":0,"row":6},{"type":"R","color":"red","col":5,"row":7}],
    solution: [{"fromCol":3,"fromRow":3,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":3,"fromRow":2,"toCol":4,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":1},{"fromCol":2,"fromRow":7,"toCol":3,"toRow":5}],
  },
  {
    id: 123, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"H","color":"red","col":2,"row":2},{"type":"R","color":"red","col":0,"row":3},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":4,"row":2},{"type":"P","color":"black","col":4,"row":3},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"red","col":2,"row":3},{"type":"C","color":"black","col":4,"row":4},{"type":"P","color":"red","col":2,"row":4},{"type":"C","color":"red","col":2,"row":7},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":0,"fromRow":3,"toCol":0,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":2,"toRow":0},{"fromCol":0,"fromRow":0,"toCol":2,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 124, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"R","color":"red","col":1,"row":1},{"type":"P","color":"red","col":3,"row":1},{"type":"R","color":"red","col":5,"row":1},{"type":"G","color":"red","col":5,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"R","color":"black","col":3,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":3,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":1,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":3,"toRow":0},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0}],
  },
  {
    id: 125, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":0,"row":2},{"type":"A","color":"black","col":3,"row":2},{"type":"R","color":"red","col":1,"row":4},{"type":"H","color":"red","col":5,"row":5},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"red","col":0,"row":3},{"type":"P","color":"red","col":5,"row":3},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"black","col":8,"row":6},{"type":"P","color":"black","col":2,"row":8},{"type":"R","color":"black","col":7,"row":8},{"type":"C","color":"black","col":0,"row":9}],
    solution: [{"fromCol":1,"fromRow":4,"toCol":1,"toRow":0},{"fromCol":0,"fromRow":2,"toCol":2,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0},{"fromCol":3,"fromRow":0,"toCol":3,"toRow":1},{"fromCol":5,"fromRow":5,"toCol":4,"toRow":3}],
  },
  {
    id: 126, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"E","color":"black","col":4,"row":2},{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"red","col":4,"row":4},{"type":"C","color":"red","col":4,"row":7},{"type":"R","color":"red","col":0,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"A","color":"black","col":3,"row":0},{"type":"H","color":"black","col":6,"row":2},{"type":"A","color":"red","col":5,"row":9},{"type":"R","color":"black","col":7,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"H","color":"red","col":6,"row":7},{"type":"E","color":"red","col":6,"row":9}],
    solution: [{"fromCol":4,"fromRow":7,"toCol":4,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":0,"fromRow":8,"toCol":5,"toRow":8},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":8,"toCol":5,"toRow":2}],
  },
  {
    id: 127, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"C","color":"red","col":1,"row":1},{"type":"P","color":"red","col":2,"row":1},{"type":"P","color":"red","col":3,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":6,"row":2},{"type":"P","color":"black","col":6,"row":4},{"type":"C","color":"red","col":1,"row":7},{"type":"E","color":"red","col":4,"row":7},{"type":"P","color":"red","col":6,"row":6},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":1,"fromRow":1,"toCol":1,"toRow":0},{"fromCol":3,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":2,"fromRow":1,"toCol":2,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":2,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 128, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":4,"row":2},{"type":"R","color":"black","col":3,"row":3},{"type":"R","color":"red","col":1,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":6,"row":4},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":6,"row":5},{"type":"P","color":"black","col":5,"row":6},{"type":"E","color":"black","col":0,"row":2},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":1,"fromRow":4,"toCol":5,"toRow":4},{"fromCol":3,"fromRow":3,"toCol":5,"toRow":3},{"fromCol":5,"fromRow":4,"toCol":5,"toRow":3},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":6,"toRow":1}],
  },
  {
    id: 129, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":4},{"type":"P","color":"red","col":4,"row":6},{"type":"R","color":"red","col":1,"row":9},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"black","col":8,"row":3},{"type":"R","color":"black","col":6,"row":7},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"red","col":6,"row":6},{"type":"C","color":"black","col":7,"row":7},{"type":"A","color":"red","col":3,"row":9},{"type":"P","color":"red","col":8,"row":6},{"type":"A","color":"black","col":5,"row":0}],
    solution: [{"fromCol":1,"fromRow":9,"toCol":1,"toRow":0},{"fromCol":6,"fromRow":7,"toCol":4,"toRow":7},{"fromCol":2,"fromRow":9,"toCol":4,"toRow":7},{"fromCol":8,"fromRow":3,"toCol":8,"toRow":4},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0}],
  },
  {
    id: 130, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":3,"row":0},{"type":"R","color":"red","col":5,"row":1},{"type":"R","color":"red","col":1,"row":3},{"type":"P","color":"red","col":2,"row":3},{"type":"P","color":"black","col":4,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":0,"row":3},{"type":"R","color":"black","col":0,"row":0},{"type":"P","color":"black","col":6,"row":4},{"type":"H","color":"red","col":0,"row":7},{"type":"P","color":"red","col":6,"row":6},{"type":"E","color":"red","col":2,"row":9},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0},{"fromCol":3,"fromRow":0,"toCol":3,"toRow":1},{"fromCol":1,"fromRow":3,"toCol":1,"toRow":1},{"fromCol":3,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":2,"fromRow":3,"toCol":2,"toRow":2}],
  },
  {
    id: 131, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"black","col":8,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"C","color":"black","col":6,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":7,"row":3},{"type":"R","color":"red","col":5,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":8,"row":2},{"type":"P","color":"black","col":8,"row":3},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":6,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"C","color":"red","col":1,"row":1},{"type":"A","color":"red","col":4,"row":8}],
    solution: [{"fromCol":7,"fromRow":3,"toCol":5,"toRow":3},{"fromCol":6,"fromRow":2,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":2},{"fromCol":8,"fromRow":0,"toCol":8,"toRow":1},{"fromCol":5,"fromRow":2,"toCol":5,"toRow":0}],
  },
  {
    id: 132, title: "Chiếu hết trong 3 nước", movesToMate: 3, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"black","col":8,"row":2},{"type":"R","color":"red","col":5,"row":3},{"type":"R","color":"red","col":5,"row":4},{"type":"C","color":"red","col":4,"row":5},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":6,"row":9},{"type":"C","color":"black","col":5,"row":7},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":8,"row":3},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"red","col":3,"row":9},{"type":"P","color":"red","col":6,"row":5},{"type":"C","color":"red","col":2,"row":7},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":4,"fromRow":8,"toCol":5,"toRow":7},{"fromCol":8,"fromRow":2,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":2},{"fromCol":6,"fromRow":9,"toCol":5,"toRow":9},{"fromCol":5,"fromRow":2,"toCol":5,"toRow":0}],
  },
  {
    id: 133, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"R","color":"red","col":7,"row":1},{"type":"R","color":"red","col":3,"row":2},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"red","col":3,"row":0},{"type":"C","color":"black","col":6,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"E","color":"black","col":2,"row":0},{"type":"C","color":"red","col":4,"row":4},{"type":"H","color":"red","col":4,"row":6},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":7,"fromRow":1,"toCol":4,"toRow":1},{"fromCol":4,"fromRow":0,"toCol":5,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":4,"toRow":0},{"fromCol":5,"fromRow":0,"toCol":5,"toRow":1},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":1},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":5,"toRow":0}],
  },
  {
    id: 134, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"R","color":"red","col":1,"row":0},{"type":"G","color":"black","col":5,"row":2},{"type":"H","color":"red","col":6,"row":3},{"type":"G","color":"red","col":3,"row":9},{"type":"C","color":"black","col":2,"row":5},{"type":"H","color":"red","col":1,"row":5},{"type":"P","color":"red","col":0,"row":4},{"type":"P","color":"red","col":4,"row":6},{"type":"R","color":"black","col":4,"row":7},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"black","col":8,"row":3},{"type":"C","color":"black","col":8,"row":8}],
    solution: [{"fromCol":1,"fromRow":0,"toCol":1,"toRow":2},{"fromCol":2,"fromRow":5,"toCol":2,"toRow":2},{"fromCol":1,"fromRow":2,"toCol":2,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":2},{"fromCol":2,"fromRow":2,"toCol":3,"toRow":2},{"fromCol":6,"fromRow":0,"toCol":4,"toRow":2},{"fromCol":3,"fromRow":2,"toCol":4,"toRow":2}],
  },
  {
    id: 135, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":5,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":0,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"G","color":"red","col":4,"row":9},{"type":"P","color":"black","col":2,"row":4},{"type":"R","color":"black","col":0,"row":6},{"type":"A","color":"black","col":3,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"P","color":"red","col":0,"row":4},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":3,"row":9},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":0,"fromRow":3,"toCol":5,"toRow":3},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":0},{"fromCol":4,"fromRow":9,"toCol":5,"toRow":9},{"fromCol":0,"fromRow":6,"toCol":5,"toRow":6},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":6},{"fromCol":2,"fromRow":4,"toCol":2,"toRow":5},{"fromCol":5,"fromRow":6,"toCol":5,"toRow":0}],
  },
  {
    id: 136, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":5,"row":0},{"type":"R","color":"black","col":1,"row":4},{"type":"H","color":"red","col":6,"row":1},{"type":"H","color":"red","col":3,"row":4},{"type":"R","color":"red","col":5,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":5,"row":2},{"type":"E","color":"black","col":6,"row":0},{"type":"H","color":"black","col":3,"row":2},{"type":"P","color":"red","col":6,"row":2},{"type":"P","color":"black","col":3,"row":5},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"black","col":0,"row":2},{"type":"P","color":"red","col":8,"row":6}],
    solution: [{"fromCol":3,"fromRow":4,"toCol":4,"toRow":2},{"fromCol":5,"fromRow":0,"toCol":4,"toRow":0},{"fromCol":5,"fromRow":2,"toCol":5,"toRow":1},{"fromCol":1,"fromRow":4,"toCol":5,"toRow":4},{"fromCol":5,"fromRow":6,"toCol":5,"toRow":4},{"fromCol":3,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0}],
  },
  {
    id: 137, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"black","col":5,"row":3},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"H","color":"red","col":7,"row":3},{"type":"R","color":"red","col":3,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"C","color":"black","col":3,"row":4},{"type":"A","color":"black","col":5,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"A","color":"red","col":4,"row":8},{"type":"E","color":"red","col":2,"row":9},{"type":"A","color":"red","col":5,"row":9},{"type":"E","color":"red","col":4,"row":7}],
    solution: [{"fromCol":7,"fromRow":3,"toCol":6,"toRow":1},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":1},{"fromCol":3,"fromRow":6,"toCol":3,"toRow":4},{"fromCol":5,"fromRow":1,"toCol":6,"toRow":1},{"fromCol":4,"fromRow":9,"toCol":3,"toRow":9},{"fromCol":6,"fromRow":1,"toCol":6,"toRow":5},{"fromCol":3,"fromRow":4,"toCol":3,"toRow":0}],
  },
  {
    id: 138, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"R","color":"red","col":7,"row":2},{"type":"H","color":"red","col":4,"row":4},{"type":"R","color":"red","col":1,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"G","color":"red","col":4,"row":8},{"type":"C","color":"red","col":0,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"black","col":2,"row":6},{"type":"R","color":"black","col":6,"row":0},{"type":"E","color":"black","col":2,"row":4},{"type":"P","color":"red","col":6,"row":5},{"type":"H","color":"red","col":6,"row":7},{"type":"A","color":"red","col":3,"row":9}],
    solution: [{"fromCol":1,"fromRow":6,"toCol":1,"toRow":0},{"fromCol":4,"fromRow":2,"toCol":2,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0},{"fromCol":4,"fromRow":1,"toCol":3,"toRow":0},{"fromCol":4,"fromRow":4,"toCol":3,"toRow":2},{"fromCol":4,"fromRow":0,"toCol":4,"toRow":1},{"fromCol":2,"fromRow":0,"toCol":2,"toRow":1}],
  },
  {
    id: 139, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"E","color":"black","col":2,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":3,"row":5},{"type":"G","color":"red","col":4,"row":7},{"type":"R","color":"black","col":7,"row":8},{"type":"C","color":"red","col":1,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":2,"row":5},{"type":"P","color":"red","col":4,"row":5},{"type":"H","color":"red","col":8,"row":7},{"type":"A","color":"black","col":5,"row":0},{"type":"C","color":"black","col":1,"row":8},{"type":"E","color":"black","col":6,"row":0}],
    solution: [{"fromCol":4,"fromRow":7,"toCol":3,"toRow":7},{"fromCol":7,"fromRow":8,"toCol":7,"toRow":7},{"fromCol":3,"fromRow":7,"toCol":3,"toRow":8},{"fromCol":7,"fromRow":7,"toCol":3,"toRow":7},{"fromCol":3,"fromRow":5,"toCol":3,"toRow":7},{"fromCol":2,"fromRow":0,"toCol":0,"toRow":2},{"fromCol":3,"fromRow":7,"toCol":3,"toRow":0}],
  },
  {
    id: 140, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":5,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":3,"row":2},{"type":"R","color":"red","col":2,"row":3},{"type":"H","color":"red","col":6,"row":3},{"type":"R","color":"black","col":3,"row":5},{"type":"P","color":"black","col":4,"row":6},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":4,"row":2},{"type":"E","color":"red","col":4,"row":7},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"black","col":8,"row":3},{"type":"C","color":"red","col":4,"row":4},{"type":"H","color":"red","col":2,"row":8},{"type":"H","color":"black","col":0,"row":5}],
    solution: [{"fromCol":2,"fromRow":3,"toCol":2,"toRow":0},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":0},{"fromCol":6,"fromRow":3,"toCol":4,"toRow":2},{"fromCol":3,"fromRow":5,"toCol":3,"toRow":9},{"fromCol":4,"fromRow":8,"toCol":3,"toRow":9},{"fromCol":4,"fromRow":6,"toCol":3,"toRow":6},{"fromCol":4,"fromRow":2,"toCol":2,"toRow":1}],
  },
  {
    id: 141, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"R","color":"black","col":1,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"C","color":"black","col":6,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"R","color":"red","col":5,"row":4},{"type":"P","color":"red","col":4,"row":6},{"type":"R","color":"red","col":1,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":6,"row":5},{"type":"E","color":"black","col":2,"row":0},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":6,"row":3},{"type":"C","color":"red","col":1,"row":7},{"type":"A","color":"red","col":5,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"P","color":"red","col":2,"row":6}],
    solution: [{"fromCol":1,"fromRow":8,"toCol":5,"toRow":8},{"fromCol":6,"fromRow":2,"toCol":5,"toRow":2},{"fromCol":5,"fromRow":4,"toCol":5,"toRow":2},{"fromCol":6,"fromRow":5,"toCol":5,"toRow":5},{"fromCol":5,"fromRow":8,"toCol":5,"toRow":5},{"fromCol":1,"fromRow":0,"toCol":1,"toRow":5},{"fromCol":5,"fromRow":2,"toCol":5,"toRow":0}],
  },
  {
    id: 142, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"R","color":"red","col":1,"row":0},{"type":"C","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"C","color":"red","col":4,"row":3},{"type":"H","color":"black","col":2,"row":8},{"type":"R","color":"black","col":3,"row":7},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"red","col":6,"row":9},{"type":"E","color":"red","col":2,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"black","col":2,"row":6},{"type":"P","color":"red","col":4,"row":4},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"red","col":0,"row":6},{"type":"R","color":"red","col":5,"row":3},{"type":"P","color":"black","col":8,"row":3}],
    solution: [{"fromCol":4,"fromRow":9,"toCol":5,"toRow":9},{"fromCol":3,"fromRow":7,"toCol":3,"toRow":9},{"fromCol":4,"fromRow":8,"toCol":3,"toRow":9},{"fromCol":2,"fromRow":8,"toCol":4,"toRow":7},{"fromCol":6,"fromRow":9,"toCol":4,"toRow":7},{"fromCol":3,"fromRow":0,"toCol":2,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":2,"toRow":0}],
  },
  {
    id: 143, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"R","color":"black","col":6,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"R","color":"red","col":1,"row":3},{"type":"H","color":"black","col":8,"row":6},{"type":"C","color":"red","col":4,"row":5},{"type":"P","color":"red","col":4,"row":6},{"type":"R","color":"black","col":7,"row":6},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"red","col":5,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"black","col":6,"row":3},{"type":"A","color":"black","col":3,"row":0},{"type":"E","color":"black","col":0,"row":2},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"red","col":3,"row":9},{"type":"E","color":"red","col":2,"row":5},{"type":"E","color":"red","col":2,"row":9}],
    solution: [{"fromCol":1,"fromRow":3,"toCol":5,"toRow":3},{"fromCol":6,"fromRow":1,"toCol":5,"toRow":1},{"fromCol":5,"fromRow":3,"toCol":5,"toRow":1},{"fromCol":7,"fromRow":6,"toCol":5,"toRow":6},{"fromCol":5,"fromRow":9,"toCol":5,"toRow":6},{"fromCol":8,"fromRow":6,"toCol":7,"toRow":8},{"fromCol":5,"fromRow":1,"toCol":5,"toRow":0}],
  },
  {
    id: 144, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":4,"row":2},{"type":"P","color":"black","col":0,"row":3},{"type":"C","color":"red","col":4,"row":5},{"type":"R","color":"black","col":7,"row":6},{"type":"H","color":"red","col":6,"row":7},{"type":"R","color":"black","col":3,"row":8},{"type":"A","color":"red","col":4,"row":8},{"type":"R","color":"red","col":5,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"red","col":3,"row":9},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":8,"row":6},{"type":"E","color":"red","col":2,"row":9},{"type":"A","color":"black","col":3,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":8,"row":3}],
    solution: [{"fromCol":4,"fromRow":9,"toCol":5,"toRow":9},{"fromCol":7,"fromRow":6,"toCol":7,"toRow":9},{"fromCol":6,"fromRow":7,"toCol":7,"toRow":9},{"fromCol":3,"fromRow":8,"toCol":3,"toRow":9},{"fromCol":4,"fromRow":8,"toCol":3,"toRow":9},{"fromCol":0,"fromRow":3,"toCol":0,"toRow":4},{"fromCol":5,"fromRow":8,"toCol":5,"toRow":0}],
  },
  {
    id: 145, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"R","color":"red","col":1,"row":0},{"type":"A","color":"black","col":3,"row":0},{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"E","color":"black","col":4,"row":2},{"type":"H","color":"red","col":4,"row":3},{"type":"P","color":"red","col":4,"row":6},{"type":"C","color":"red","col":4,"row":7},{"type":"C","color":"black","col":6,"row":8},{"type":"C","color":"black","col":7,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"R","color":"black","col":2,"row":2},{"type":"E","color":"black","col":6,"row":0},{"type":"P","color":"red","col":5,"row":1},{"type":"A","color":"red","col":5,"row":7},{"type":"A","color":"red","col":5,"row":9},{"type":"E","color":"red","col":8,"row":7},{"type":"P","color":"black","col":8,"row":3},{"type":"P","color":"black","col":0,"row":4}],
    solution: [{"fromCol":4,"fromRow":3,"toCol":2,"toRow":2},{"fromCol":6,"fromRow":8,"toCol":6,"toRow":9},{"fromCol":4,"fromRow":9,"toCol":4,"toRow":8},{"fromCol":7,"fromRow":8,"toCol":5,"toRow":8},{"fromCol":4,"fromRow":7,"toCol":4,"toRow":2},{"fromCol":4,"fromRow":1,"toCol":5,"toRow":0},{"fromCol":1,"fromRow":0,"toCol":3,"toRow":0}],
  },
  {
    id: 146, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"C","color":"black","col":2,"row":2},{"type":"C","color":"black","col":4,"row":2},{"type":"R","color":"red","col":3,"row":3},{"type":"C","color":"red","col":4,"row":3},{"type":"P","color":"black","col":8,"row":3},{"type":"A","color":"red","col":4,"row":8},{"type":"G","color":"red","col":4,"row":9},{"type":"A","color":"red","col":5,"row":9},{"type":"R","color":"black","col":6,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"P","color":"black","col":2,"row":3},{"type":"E","color":"red","col":2,"row":9},{"type":"A","color":"black","col":5,"row":0},{"type":"H","color":"black","col":0,"row":2},{"type":"P","color":"red","col":4,"row":6},{"type":"P","color":"red","col":8,"row":6},{"type":"R","color":"red","col":0,"row":9}],
    solution: [{"fromCol":4,"fromRow":9,"toCol":3,"toRow":9},{"fromCol":6,"fromRow":9,"toCol":5,"toRow":9},{"fromCol":4,"fromRow":8,"toCol":5,"toRow":9},{"fromCol":2,"fromRow":2,"toCol":3,"toRow":2},{"fromCol":3,"fromRow":3,"toCol":3,"toRow":2},{"fromCol":8,"fromRow":3,"toCol":8,"toRow":4},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":0}],
  },
  {
    id: 147, title: "Chiếu hết trong 4 nước", movesToMate: 4, turn: "red",
    pieces: [{"type":"G","color":"black","col":4,"row":0},{"type":"A","color":"black","col":4,"row":1},{"type":"H","color":"red","col":2,"row":2},{"type":"R","color":"red","col":3,"row":2},{"type":"C","color":"black","col":4,"row":2},{"type":"H","color":"black","col":4,"row":3},{"type":"P","color":"black","col":0,"row":3},{"type":"P","color":"black","col":2,"row":5},{"type":"R","color":"black","col":2,"row":6},{"type":"P","color":"red","col":4,"row":6},{"type":"C","color":"red","col":4,"row":7},{"type":"G","color":"red","col":4,"row":9},{"type":"E","color":"black","col":2,"row":0},{"type":"A","color":"red","col":4,"row":8},{"type":"A","color":"black","col":5,"row":0},{"type":"P","color":"red","col":0,"row":6},{"type":"H","color":"red","col":6,"row":7},{"type":"E","color":"black","col":6,"row":0},{"type":"E","color":"red","col":2,"row":9},{"type":"P","color":"black","col":8,"row":3}],
    solution: [{"fromCol":4,"fromRow":7,"toCol":4,"toRow":3},{"fromCol":2,"fromRow":6,"toCol":3,"toRow":6},{"fromCol":3,"fromRow":2,"toCol":3,"toRow":6},{"fromCol":2,"fromRow":5,"toCol":3,"toRow":5},{"fromCol":3,"fromRow":6,"toCol":3,"toRow":5},{"fromCol":0,"fromRow":3,"toCol":0,"toRow":4},{"fromCol":3,"fromRow":5,"toCol":3,"toRow":0}],
  },
];
