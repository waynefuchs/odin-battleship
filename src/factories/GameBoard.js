const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 10;

class GameBoard {
  width;
  height;
  misses;
  ships;

  constructor() {
    this.width = GAME_BOARD_WIDTH;
    this.height = GAME_BOARD_HEIGHT;
    this.misses = [];
    this.hits = [];
    this.ships = [];
  }

  place = (ship, x, y, vertical = false) => {
    const newShipObj = getShipObject(ship, x, y, this.width);
    checkForOutOfBoundsPlacement(this, vertical, ship, y, x);
    checkShipsForOverlap(this, newShipObj);
    addShipToBoard(this, newShipObj);
  };

  receiveAttack(x, y) {
    if (doesAttackHit(this, x, y)) return attackShip(this, x, y);
    addMissToBoard(this, x, y);
    return false;
  }
}

const cellId = (x, y, boardWidth) => boardWidth * y + x;

const shipCellIds = (boardWidth, ship) => {
  const range = [...Array(ship.length).keys()];
  return range.map((n) => n + cellId(ship.x, ship.y, boardWidth));
};

const isHit = (board, ship, x, y) =>
  ship.positions.includes(cellId(x, y, board.width));

const doesAttackHit = (board, x, y) =>
  board.ships.some((ship) => isHit(board, ship, x, y));

const getShipObject = (ship, x, y, boardWidth) => {
  const positions = shipCellIds(boardWidth, { length: ship.length, x, y });
  const shipObj = { ship, x, y, positions };
  return shipObj;
};

const checkForOutOfBoundsPlacement = (board, vertical, ship, y, x) => {
  const isOutOfBounds = vertical
    ? ship.length + y > board.height
    : ship.length + x > board.width;
  if (isOutOfBounds) throw new Error("Ship can not extend out of play area");
};

const checkShipsForOverlap = (board, newShipObj) => {
  if (board.ships.some((inPlayObj) => doShipsOverlap(inPlayObj, newShipObj)))
    throw new Error("Ship overlaps another vessel and could not be placed");
};

const doShipsOverlap = (shipA, shipB) => {
  return shipA.positions.some((position) => shipB.positions.includes(position));
};

const addMissToBoard = (board, x, y) => {
  const missId = cellId(x, y, board.width);
  if(board.misses.includes(missId)) throw new Error("Miss already registered at this location");
  board.misses.push(missId);
}

const addShipToBoard = (board, newShipObj) => {
  board.ships.push(newShipObj);
};

const attackShip = (board, x, y) => {
  const ship = board.ships.find((ship) => isHit(board, ship, x, y));
  const position = ship.vertical ? y - ship.y : x - ship.x;
  ship.ship.hit(position);
  board.hits.push(cellId(x, y, board.width));
  return ship;
};

module.exports = GameBoard;
