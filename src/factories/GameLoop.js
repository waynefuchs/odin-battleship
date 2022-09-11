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

    this.ui.setPlayerName(this.humanPlayer.name, 'friend');
    this.ui.initializeBoard(this.humanPlayer.board, "friend");
    this.ui.setPlayerName(this.aiPlayer.name, 'foe');
    this.ui.initializeBoard(this.aiPlayer.board, "foe", this.playerFinishedTurn);
    
    this.updateUI();
    // debug
    // this.ui.showShips(this.aiPlayer.board, 'foe');
  }

  playerFinishedTurn = () => {
    // TODO Process enemy turn...
    this.aiPlayer.fire(this.humanPlayer.board);
    if(this.humanPlayer.board.haveAllShipsBeenDestroyed())
      this.ui.showGameOver(this.aiPlayer.name);

    this.updateUI();
    if(this.aiPlayer.board.haveAllShipsBeenDestroyed())
      this.ui.showGameOver(this.humanPlayer.name);
  }

  updateUI() {
    this.ui.updateBoard(this.humanPlayer.board, 'friend', true);
    this.ui.updateBoard(this.aiPlayer.board, 'foe', false);
  }
}

module.exports = GameLoop;
