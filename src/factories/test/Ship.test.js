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

test('Ship hits out of bounds throw an error', () => {
  expect(() => ship.hit(-1)).toThrow(Error);
  expect(() => ship.hit(0)).not.toThrow(Error);
  expect(() => ship.hit(1)).not.toThrow(Error);
  expect(() => ship.hit(2)).not.toThrow(Error);
  expect(() => ship.hit(3)).toThrow(Error);
})

test('Ship can be sunk', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit(0);
  expect(ship.isSunk()).toBe(false);
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
})