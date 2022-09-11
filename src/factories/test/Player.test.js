const AI = require("../AI");
const Human = require("../Human");
const Player = require("../Player");

/**
 * BASE PLAYER CLASS TESTS
 */
describe("Base class testing", () => {
  let player;
  beforeEach(() => {
    player = new Player();
  });

  test("Player class exists", () => {
    expect(player).not.toBeNull();
  });

  test("Player's board is initialized in constructor", () => {
    expect(player.board).not.toBeNull();
    expect(player.board.ships.length).toBe(0);
    expect(player.board.misses.length).toBe(0);
  });
});

/**
 * AI TESTS
 */
describe("AI tests", () => {
  let ai;

  beforeEach(() => {
    ai = new AI();
  });

  test("AI initializes", () => {
    expect(ai).not.toBeNull();
    expect(ai.board.ships.length).toBe(5);
  });

  test("AI can fire a shot", () => {
    // This test has the AI firing on itself
    expect(ai.board.available.length).toBe(100);
    // will be true or false, and random :|
    // ...how to test? check to see if available ocean shrinks
    let result = ai.fire(ai.board);
    expect(ai.board.available.length).toBe(99);
    for (let i = 98; i >= 0; i -= 1) {
      let result = ai.fire(ai.board);
      expect(ai.board.available.length).toBe(i);
    }
    expect(() => ai.fire()).toThrow(Error);
  });
});

/**
 * HUMAN TESTS
 */
describe("Human tests", () => {
  beforeEach(() => {
    player = new Human();
  });

  test("Human initializes", () => {
    expect(player).not.toBeNull();
  });
});
