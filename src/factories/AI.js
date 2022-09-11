const Player = require("./Player");
const Ship = require("./Ship");
const { getRandomInt, getRandomBool } = require("./Random");

const names = [
  "Bjorn Toulouse",
  "Al Beback",
  "Yuri Diculous",
  "Perry Noid",
  "Stu Pitt",
  "Mick Stup",
  "Luke Warm",
  "Tai Mi Shu",
  "Robin Banks",
  "Hugh Mungus",
  "Sam Urai",
  "Lee Mealone",
  "Doug Graves",
  "Van Quish",
  "Ken Yoo Seami",
  "Jay Pegg",
  "Vagry v7",
  "Rand Omize",
];

class AI extends Player {
  constructor() {
    super(null, true);
    this.unplacedShips.push(new Ship(5, "Carrier"));
    this.unplacedShips.push(new Ship(4, "Battleship"));
    this.unplacedShips.push(new Ship(3, "Destroyer"));
    this.unplacedShips.push(new Ship(3, "Submarine"));
    this.unplacedShips.push(new Ship(2, "Patrol Boat"));
    this.placeAllShips();
    this.name = names.at(getRandomInt(names.length));
    this.isReady = true;
  }

  fire(enemyBoard) {
    const [x, y] = enemyBoard.getRandomAvailable();
    return enemyBoard.receiveAttack(x, y);
  }

  placeAllShips = () => {
    this.unplacedShips.forEach((ship) => this.placeShip(ship));
    if (this.board.ships.length === this.unplacedShips.length)
      this.unplacedShips = [];
    else throw new Error("AI failed to place ships correctly");
  };

  placeShip(ship) {
    const cellCount = this.board.width * this.board.height;
    const allBoardIds = [...Array(cellCount).keys()];
    const possibleHorizontalIds = allBoardIds
      .filter((id) => id % this.board.width <= this.board.width - ship.length)
      .map((id) => [id, false]);
    const possibleVerticalIds = allBoardIds
      .filter((id) => id <= cellCount - ship.length * this.board.width)
      .map((id) => [id, true]);
    let possibleIds = possibleHorizontalIds.concat(possibleVerticalIds);

    let isPlaced = false;
    while (!isPlaced && possibleIds.length > 0) {
      const randomIndex = getRandomInt(possibleIds.length);
      const [id, vertical] = possibleIds.at(randomIndex);
      possibleIds = possibleIds.filter((i) => i[0] !== id || i[1] !== vertical);

      const [x, y] = this.board.cellXY(id);
      const shipObj = { ship, x, y, vertical, length: ship.length };
      this.board.shipCellIds(shipObj);
      try {
        this.board.place(ship, x, y, vertical);
        isPlaced = true;
      } catch (error) {}
    }

    if (possibleIds.length <= 0)
      throw new Error("AI failed to randomly place a piece");
  }
}

module.exports = AI;

// Rand Omize
