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

  test("Unplaced ships can be placed", () => {
    // Placement off the edge fails
    expect(player.placeNextUnplacedShip(6, 0, false)).toBe(false);

    // It fails again (because the ship wasn't removed from the queue)
    expect(player.placeNextUnplacedShip(6, 0, false)).toBe(false);

    // 1. OOOOOSSSSS
    expect(player.placeNextUnplacedShip(5, 0, false)).toBe(true);

    // 2. OSSSSPPPPP
    expect(player.placeNextUnplacedShip(1, 0, false)).toBe(true);

    // 3. Vertical over top another ship fails
    expect(player.placeNextUnplacedShip(1, 0, true)).toBe(false);

    // 3. Vertical placement
    expect(player.placeNextUnplacedShip(0, 0, true)).toBe(true);

    // 4. Vertical placement
    expect(player.placeNextUnplacedShip(1, 1, true)).toBe(true);

    // Vertical off bottom fails
    expect(player.placeNextUnplacedShip(0, 9, true)).toBe(false);
    expect(player.isReady).toBe(false);

    // 5. Vertical
    expect(player.placeNextUnplacedShip(0, 8, true)).toBe(true);
    expect(player.isReady).toBe(true);

    // throw..
    expect(() => player.placeNextUnplacedShip(5, 5, false)).toThrow(Error);
  });

  test("Test that unplaced ship IDs are correct", () => {
    expect(player.getNextShipIds(0, 0, false)).toContain(0);
    expect(player.getNextShipIds(0, 0, false)).toContain(1);
    expect(player.getNextShipIds(0, 0, false)).toContain(2);
    expect(player.getNextShipIds(0, 0, false)).toContain(3);
    expect(player.getNextShipIds(0, 0, false)).toContain(4);
    expect(player.getNextShipIds(0, 0, false)).toStrictEqual([0, 1, 2, 3, 4]);

    expect(player.getNextShipIds(0, 5, true)).toContain(50);
    expect(player.getNextShipIds(0, 5, true)).toContain(60);
    expect(player.getNextShipIds(0, 5, true)).toContain(70);
    expect(player.getNextShipIds(0, 5, true)).toContain(80);
    expect(player.getNextShipIds(0, 5, true)).toContain(90);
    expect(player.getNextShipIds(0, 5, true)).toStrictEqual([
      50, 60, 70, 80, 90,
    ]);
  });
});
