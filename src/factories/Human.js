const Player = require("./Player");
const Ship = require("./Ship");

class Human extends Player {
  constructor() {
    super();
    this.unplacedShips.push(new Ship(5, "Carrier"));
    this.unplacedShips.push(new Ship(4, "Battleship"));
    this.unplacedShips.push(new Ship(3, "Cruiser"));
    this.unplacedShips.push(new Ship(3, "Submarine"));
    this.unplacedShips.push(new Ship(2, "Destroyer"));

    this.name = "Human Player";
  }

  getNextShipIds(x, y, vertical) {
    const ship = this.unplacedShips.at(0);
    return this.board.shipCellIds({ship, length: ship.length, x, y, vertical})
  }

  placeNextUnplacedShip(x, y, vertical) {
    if (this.unplacedShips.length <= 0)
      throw new Error("There are no unplaced ships to place");

    try {
      this.board.place(this.unplacedShips.at(0), x, y, vertical);
      this.unplacedShips.shift();
      if(this.unplacedShips.length <= 0) this.isReady = true;
    } catch (error) {
      return false;
    }

    return true;
  }

  isDonePlacingShips = () => this.unplacedShips.length <= 0;
}

module.exports = Human;
