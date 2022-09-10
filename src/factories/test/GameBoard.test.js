const GameBoard = require("../GameBoard");
const Ship = require("../Ship");

let board;
let ship;

beforeEach(() => {
  board = new GameBoard();
  ship = new Ship(3);
});

test("Board class exists", () => {
  expect(board).not.toBeNull();
});

test("Can place ship on board", () => {
  expect(board.ships.length).toBe(0);
  board.place(ship, 0, 0);
  expect(board.ships.length).toBe(1);
});

test("Placing ship out of bounds throws error", () => {
  expect(() => board.place(ship, 8, 0)).toThrow(Error);
  expect(board.ships.length).toBe(0);
  expect(() => board.place(ship, 7, 0)).not.toThrow(Error);
  expect(board.ships.length).toBe(1);
  expect(() => board.place(ship, 0, 8, true)).toThrow(Error);
  expect(board.ships.length).toBe(1);
  expect(() => board.place(ship, 0, 7, true)).not.toThrow(Error);
  expect(board.ships.length).toBe(2);
});

test("Test if ships overlap", () => {
  board.place(ship, 0, 0);
  expect(() => board.place(ship, 1, 0)).toThrow(Error);
});

test("Ship can receive attack and ship can sink", () => {
  // miss
  board.place(ship, 1, 0);
  expect(board.receiveAttack(0, 0)).toBe(false);

  // hit 1
  let hit = board.receiveAttack(1, 0);
  expect(hit.ship.hits).toBe(1);

  // hit 2
  hit = board.receiveAttack(2, 0);
  expect(hit.ship.hits).toBe(3);
  expect(hit.ship.isSunk()).toBe(false);

  // hit 3
  hit = board.receiveAttack(3, 0);
  expect(hit.ship.hits).toBe(7);
  expect(hit.ship.isSunk()).toBe(true);
});

test("Misses are tracked", () => {
  expect(board.receiveAttack(5, 5)).toBe(false);
  expect(() => board.receiveAttack(5, 5)).toThrow(Error);
});

test("Hits are tracked", () => {
  // No hits should register on a fresh board
  expect(board.hits.length).toBe(0);

  // Place a ship at (0, 0) and attack (1, 0) = middle of ship "SXSOOOOOOO"
  board.place(ship, 0, 0);
  let hit = board.receiveAttack(1, 0);
  expect(hit.ship.hits).toBe(0b010);
  expect(board.hits.at(0)).toBe(1); // id(1,0) = 1
  expect(board.hits.length).toBe(1);

  // Attack the ship a second time "XXSOOOOOOO"
  hit = board.receiveAttack(0, 0);
  expect(hit.ship.hits).toBe(0b011);
  expect(board.hits.at(1)).toBe(0); // id(0,1) = 0
  expect(board.hits.length).toBe(2);

  // Place a second ship directly below the first
  ship = new Ship(3); // <-- important, otherwise the previous ship is cloned
  board.place(ship, 0, 1);
  hit = board.receiveAttack(0, 1);
  expect(hit.ship.hits).toBe(0b001);
  expect(board.hits.at(2)).toBe(10);
  expect(board.hits.length).toBe(3);

  // Miss a shot to ensure that a hit is not added
  hit = board.receiveAttack(3, 0);
  expect(hit).toBe(false);
  expect(board.hits.length).toBe(3);
})

test("Board correctly reports whether all ships have sunk", () => {
  expect(false).toBe(false);
});
