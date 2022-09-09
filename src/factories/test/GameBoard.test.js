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
  expect(() => board.place(ship, 7, 0)).toThrow(Error);
  expect(board.shipCount).toBe(0);
  expect(() => board.place(ship, 6, 0)).not.toThrow(Error);
  expect(board.shipCount).toBe(1);
  expect(() => board.place(ship, 0, 6, true)).not.toThrow(Error);
  expect(board.shipCount).toBe(2);
  expect(() => board.place(ship, 0, 7, true)).toThrow(Error);
  expect(board.shipCount).toBe(2);
});