const GameBoard = require('../GameBoard');
const Ship = require('../Ship');

let board;

beforeEach(() => {
  board = new GameBoard();
})

test('Board class exists', () => {
  expect(board).not.toBeNull();
})

test('Can place ship on board', () => {
  const ship = new Ship(3);
  expect(board.shipCount).toBe(0);
  board.place(ship, 0, 0);
  expect(board.shipCount).toBe(1);
})