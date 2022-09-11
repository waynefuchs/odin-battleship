const { getRandomInt } = require("./Random");

const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 10;

class GameBoard {
  width;
  height;
  hits;
  misses;
  ships;
  available;

  constructor() {
    this.width = GAME_BOARD_WIDTH;
    this.height = GAME_BOARD_HEIGHT;
    this.misses = [];
    this.hits = [];
    this.ships = [];
    this.available = [...Array(this.width * this.height).keys()];
  }

  place = (ship, x, y, vertical = false) => {
    const newShipObj = getShipObject(ship, x, y, vertical, this);
    checkForOutOfBoundsPlacement(this, vertical, ship, y, x);
    checkShipsForOverlap(this, newShipObj);
    addShipToBoard(this, newShipObj);
  };

  receiveAttack(x, y) {
    if (doesAttackHit(this, x, y)) return attackShip(this, x, y);
    addMissToBoard(this, x, y);
    return false;
  }

  haveAllShipsBeenDestroyed = () =>
    this.ships.every((shipObj) => shipObj.ship.isSunk()) &&
    this.ships.length > 0;

  getRandomAvailable() {
    if (this.available.length <= 0)
      throw new Error(
        "There are no available spots in the ocean left to attack"
      );
    const randomIndex = getRandomInt(this.available.length);
    const id = this.available.at(randomIndex);
    return this.cellXY(id);
  }

  isHit = (x, y) => doesAttackHit(this, x, y);

  cellId = (x, y) => this.width * y + x;

  cellXY = (id) => [
    id % this.width,
    Math.floor(id / this.width),
  ];
  
  shipCellIds = (shipObj) => {
    if (shipObj.vertical === undefined)
      throw new Error("Ship vertical specification must be defined");
    const startId = this.cellId(shipObj.x, shipObj.y);
    return shipObj.vertical
      ? [...Array(shipObj.length)].fill(startId).map((n, i) => n + i * 10)
      : [...Array(shipObj.length).keys()].map((n) => n + startId);
  };
}

// Private Functions
const removeFromAvailable = (board, x, y) => {
  const coordId = board.cellId(x, y);
  const newArray = board.available.filter((id) => id !== coordId);
  if (newArray.length === board.available.length)
    throw new Error("Failed to remove from available list of ids");
  board.available = newArray;
};

const isHit = (board, shipObj, x, y) =>
  shipObj.positions.includes(board.cellId(x, y));

const doesAttackHit = (board, x, y) => {
  const isAvailable = board.available.includes(board.cellId(x, y));
  const isShipThere = board.ships.some((shipObj) =>
    isHit(board, shipObj, x, y)
  );
  return isAvailable && isShipThere;
};

const getShipObject = (ship, x, y, vertical, board) => {
  const positions = board.shipCellIds({ length: ship.length, x, y, vertical });
  const shipObj = { ship, x, y, positions, vertical };
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
  const missId = board.cellId(x, y);
  if (board.misses.includes(missId))
    throw new Error("Miss already registered at this location");
  board.misses.push(missId);
  removeFromAvailable(board, x, y);
};

const addShipToBoard = (board, newShipObj) => {
  board.ships.push(newShipObj);
};

const attackShip = (board, x, y) => {
  const ship = board.ships.find((ship) => isHit(board, ship, x, y));
  const position = ship.vertical ? y - ship.y : x - ship.x;
  ship.ship.hit(position);
  board.hits.push(board.cellId(x, y));
  removeFromAvailable(board, x, y);
  return ship;
};

module.exports = GameBoard;
