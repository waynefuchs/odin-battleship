const AI = require("../AI");
const Human = require("../Human");
const Player = require("../Player");

let player;


/**
 * BASE PLAYER CLASS TESTS
 */
describe('Base class testing', () => {
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
  })    
})


/**
 * AI TESTS
 */
describe('AI tests', () => {
  beforeEach(() => {
    player = new AI();
  });
  

  test("AI initializes", () => {
    expect(player).not.toBeNull();
  })
})


/**
 * HUMAN TESTS
 */
describe('AI tests', () => {
  beforeEach(() => {
    player = new Human();
  });
  

  test("AI initializes", () => {
    expect(player).not.toBeNull();
  })
})
