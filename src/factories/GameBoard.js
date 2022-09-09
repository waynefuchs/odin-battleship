const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 10;

// const collides = (length, x, y, vertical=false) => {
//   return vertical
//     ?
//     : ;
// }

const shipCellIds = (board, ship) => 
  [...Array(ship.length).keys()].map((n) => n + board.width * ship.y + ship.x);

const overlap = (shipA, shipB) => {
  return shipA.positions.filter(position => shipB.positions.includes(position));
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
    if (
      (!vertical && ship.length + x >= this.width) ||
      (vertical && ship.length + y >= this.height)
    )
      throw new Error("Ship can not extend out of bounds.");

    const shipObj = { ship, x, y, positions:shipCellIds(this, {length: ship.length, x, y}) };
    this.ships.push(shipObj);
    this.shipCount += 1;
  };
}

module.exports = GameBoard;
