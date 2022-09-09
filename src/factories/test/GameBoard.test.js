const GameBoard = require('../GameBoard');

let board;

beforeEach(() => {
  board = new GameBoard();
})

test('Board class exists', () => {
  expect(board).not.toBeNull();
})