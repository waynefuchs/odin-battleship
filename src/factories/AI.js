const Player = require("./Player");
const Ship = require("./Ship");

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
    this.unplacedShips.push(new Ship(5, 'Carrier'));
    this.unplacedShips.push(new Ship(4, 'Battleship'));
    this.unplacedShips.push(new Ship(3, 'Destroyer'));
    this.unplacedShips.push(new Ship(3, 'Submarine'));
    this.unplacedShips.push(new Ship(2, 'Patrol Boat'));
  }
}

module.exports = AI;
