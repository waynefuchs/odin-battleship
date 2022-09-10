const Player = require("./Player");
const Ship = require("./Ship");

class Human extends Player {
  constructor() {
    super();
    this.unplacedShips.push(new Ship(5, 'Carrier'));
    this.unplacedShips.push(new Ship(4, 'Battleship'));
    this.unplacedShips.push(new Ship(3, 'Cruiser'));
    this.unplacedShips.push(new Ship(3, 'Submarine'));
    this.unplacedShips.push(new Ship(2, 'Destroyer'));
  }
}

module.exports = Human;
