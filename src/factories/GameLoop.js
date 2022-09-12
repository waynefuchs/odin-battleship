const AI = require("./AI");
const Human = require("./Human");
const UI = require("./ui/UI");

class GameLoop {
  humanPlayer;
  aiPlayer;

  constructor() {
    this.humanPlayer = new Human();
    this.aiPlayer = new AI();

    UI.initializeBoard(this.humanPlayer.board, "placeboats");
    UI.showShipNames(this.humanPlayer.unplacedShips, "placeboats");
    UI.placeShipInitialize(
      this.humanPlayer,
      "placeboats",
      this.placingComplete
    );
  }

  placingComplete = () => {
    UI.removeElementAndChildren("#placeboats");
    UI.setHide("#gameview", false);

    UI.setPlayerName(this.humanPlayer.name, "friend");
    UI.initializeBoard(this.humanPlayer.board, "friend");
    UI.setPlayerName(this.aiPlayer.name, "foe");
    UI.initializeBoard(this.aiPlayer.board, "foe", this.playerFinishedTurn);
    this.updateUI();
  };

  playerFinishedTurn = () => {
    this.aiPlayer.fire(this.humanPlayer.board);
    if (this.humanPlayer.board.haveAllShipsBeenDestroyed())
      UI.showGameOver(this.aiPlayer.name);

    this.updateUI();
    if (this.aiPlayer.board.haveAllShipsBeenDestroyed())
      UI.showGameOver(this.humanPlayer.name);
  };

  updateUI() {
    UI.updateBoard(this.humanPlayer.board, "friend", true);
    UI.updateBoard(this.aiPlayer.board, "foe", false);
  }
}

module.exports = GameLoop;
