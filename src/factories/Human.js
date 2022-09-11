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

    const ship = new Ship(10, 'Megaship');
    this.board.place(ship, 0, 0);
    this.isReady = true;
  }
}

module.exports = Human;
