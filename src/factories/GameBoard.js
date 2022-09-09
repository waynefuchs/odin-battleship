const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 10;

// const collides = (length, x, y, vertical=false) => {
//   return vertical
//     ?
//     : ;
// }

const cellId = (x, y, board) => board.width * y + x;

const shipCellIds = (board, ship) =>
  [...Array(ship.length).keys()].map((n) => n + cellId(ship.x, ship.y, board));

const overlap = (shipA, shipB) =>
  shipA.positions.some((position) => shipB.positions.includes(position));

const isHit = (x, y, board, ship) => {
  return ship.positions.includes(cellId(x, y, board));
};

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
    const isOutOfBounds = vertical
      ? ship.length + y > this.height
      : ship.length + x > this.width;
    if (isOutOfBounds) throw new Error("Ship can not extend out of bounds.");

    const positions = shipCellIds(this, { length: ship.length, x, y });
    const shipObj = { ship, x, y, positions };

    const isOverlappingPlacedShips = this.ships.some((placedShip) =>
      overlap(placedShip, shipObj)
    );
    if (isOverlappingPlacedShips)
      throw new Error("Ship overlaps and could not be placed");

    this.ships.push(shipObj);
    this.shipCount = this.ships.length;
  };

  receiveAttack(x, y) {
    if (!this.ships.some((ship) => isHit(x, y, this, ship))) {
      // miss
      return false;
    } else {
      const ship = this.ships.find((ship) => isHit(x, y, this, ship));
      const position = ship.vertical
        ? ship.y - y
        : ship.x - x;
      ship.ship.hit(position);
      return ship;
    }
  }
}

module.exports = GameBoard;
