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

    this.ui.initializeBoard(this.humanPlayer.board, "friend");
    this.ui.initializeBoard(this.aiPlayer.board, "foe", this.playerFinishedTurn);
    
    this.updateUI();
    // debug
    // this.ui.showShips(this.aiPlayer.board, 'foe');
  }

  playerFinishedTurn = () => {
    // TODO Process enemy turn...
    this.aiPlayer.fire(this.humanPlayer.board);

    this.updateUI();
  }

  updateUI() {
    this.ui.updateBoard(this.humanPlayer.board, 'friend', true);
    this.ui.updateBoard(this.aiPlayer.board, 'foe', false);
  }
}

module.exports = GameLoop;
