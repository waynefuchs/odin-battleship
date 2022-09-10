const Player = require("./Player");

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
  }
}

module.exports = AI;
