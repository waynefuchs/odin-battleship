const Player = require("../Player");

let player;

beforeEach(() => {
  player = new Player();
});

test("Player class exists", () => {
  expect(player).not.toBeNull();
});