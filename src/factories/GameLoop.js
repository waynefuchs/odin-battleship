const AI = require("./AI");
const Human = require("./Human");
const UI = require("./ui/UI");

class GameLoop {
  ui;
  humanPlayer;
  aiPlayer;

  constructor() {
    this.ui = new UI();
    this.humanPlayer = new Human();
    this.aiPlayer = new AI();

    this.ui.drawBoard(this.humanPlayer.board, "#gameboard-friend");
    this.ui.drawBoard(this.aiPlayer.board, "#gameboard-foe");
  }
}

module.exports = GameLoop;
