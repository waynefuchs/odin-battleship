const GameBoard = require("./GameBoard");

class Player {
  board;
  isAi;

  constructor(board = null, ai = false) {
    this.board = board ?? new GameBoard();
    this.isAi = ai;
  }
}

module.exports = Player;
