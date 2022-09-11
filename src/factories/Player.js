const GameBoard = require("./GameBoard");
const Ship = require("./Ship");

class Player {
  board;
  unplacedShips;
  name;
  isAi;
  isReady;

  constructor(board = null, ai = false) {
    this.board = board ?? new GameBoard();
    this.isAi = ai;
    this.unplacedShips = [];
    this.isReady = false;
  }
}

module.exports = Player;
