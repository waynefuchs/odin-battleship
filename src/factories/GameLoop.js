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


    return;
    UI.setPlayerName(this.humanPlayer.name, "friend");
    UI.initializeBoard(this.humanPlayer.board, "friend");
    UI.setPlayerName(this.aiPlayer.name, "foe");
    UI.initializeBoard(
      this.aiPlayer.board,
      "foe",
      this.playerFinishedTurn
    );

    this.updateUI();
    // debug
    // UI.showShips(this.aiPlayer.board, 'foe');
  }

  playerFinishedTurn = () => {
    // TODO Process enemy turn...
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

  nextUnplacedShip = () => this.humanPlayer.unplacedShips.at(0);

  placePiece = (x,y) => {

  }

  updatePlacingUI() {
    UI.updateBoard(this.humanPlayer.board, "placeboats", true);
  }

}

module.exports = GameLoop;
