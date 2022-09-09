const Ship = require('../Ship');

let ship;

beforeEach(() => {
  ship = new Ship(3);
})

test('Ship class exists', () => {
  expect(ship).not.toBeNull();
})

test('Ship has a length property', () => {
  expect(ship.length).toBe(3);
})

test('Ship can take a hit', () => {
  ship.hit(2);
  expect(ship.hits).toBe(0b100);
})