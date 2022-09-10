const GameBoard = require("./GameBoard");
const Ship = require("./Ship");

class Player {
  board;
  unplacedShips;
  isAi;

  constructor(board = null, ai = false) {
    this.board = board ?? new GameBoard();
    this.isAi = ai;
    this.unplacedShips = [];
  }
}

module.exports = Player;
