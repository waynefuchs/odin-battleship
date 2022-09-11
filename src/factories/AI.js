const Player = require("./Player");
const Ship = require("./Ship");
const { getRandomInt, getRandomBool } = require("./Random");

const names = [
  "Bjorn Toulouse",
  "Al Beback",
  "Yuri Diculous",
  "Perry Noid",
  "Stu Pitt",
  "Otto Mobile",
  "Mick Stup",
  "Luke Warm",
  "Tai Mi Shu",
  "Robin Banks",
  "Hugh Mungus",
  "Sam Urai",
  "Lee Mealone",
  "Victor E. Lane",
  "Doug Graves",
  "Van Quish",
  "Ken Yoo Seami",
  "Jay Pegg",
  "Vagry v7",
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
    let isPlaced = false;
    const failCount = 1000;
    let i;
    for (i = 0; i < failCount && ship && !isPlaced; i++) {
      const vertical = getRandomBool();
      const x = getRandomInt(this.board.width - (vertical ? 0 : ship.length));
      const y = getRandomInt(this.board.height - (vertical ? ship.length : 0));
      try {
        this.board.place(ship, x, y, vertical);
        isPlaced = true;
      } catch (error) {}
    }

    // Should never get here.. unless you do..
    // RNG could pick the same square `failCount` times in a row..
    // I could come up with another way to handle this if it becomes an issue
    if (i === failCount)
      throw new Error("Reached failCount, operation likely failed");
  }
}

module.exports = AI;
