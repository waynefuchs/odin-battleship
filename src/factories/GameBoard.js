const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 10;

class GameBoard {
  width;
  height;
  ships;
  shipCount;

  constructor() {
    this.width = GAME_BOARD_WIDTH;
    this.height = GAME_BOARD_HEIGHT;
    this.ships = [];
    this.shipCount = 0;
  }

  place = (ship, x, y, vertical = false) => {
    if (vertical ? ship.length + y > this.height : ship.width + x > this.width)
      throw new Error("Ship can not be placed out of bounds.");
    this.ships.push({ ship, x, y });
    this.shipCount += 1;
  };
}

module.exports = GameBoard;
