const GameBoard = require('../GameBoard');
const Ship = require('../Ship');

let board;
let ship;

beforeEach(() => {
  board = new GameBoard();
  ship = new Ship(3);
})

test('Board class exists', () => {
  expect(board).not.toBeNull();
})

test('Can place ship on board', () => {
  expect(board.shipCount).toBe(0);
  board.place(ship, 0, 0);
  expect(board.shipCount).toBe(1);
})

test('Placing ship out of bounds throws error', () => {
  expect(() => board.place(ship, 8, 0)).toThrow(Error);
  expect(board.shipCount).toBe(0);
  expect(() => board.place(ship, 7, 0)).not.toThrow(Error);
  expect(board.shipCount).toBe(1);
  expect(() => board.place(ship, 0, 8, true)).toThrow(Error);
  expect(board.shipCount).toBe(1);
  expect(() => board.place(ship, 0, 7, true)).not.toThrow(Error);
  expect(board.shipCount).toBe(2);
});

test('Test if ships overlap', () => {
  board.place(ship, 0, 0);
  expect(() => board.place(ship, 1, 0)).toThrow(Error);
})

test('Ship can receive attack', () => {
  board.place(ship, 1, 0);
  expect(board.receiveAttack(0, 0)).toBe(false);
  const hitShip = board.receiveAttack(0, 1);
  expect(hitShip.ship.hits).toBe(1);
})