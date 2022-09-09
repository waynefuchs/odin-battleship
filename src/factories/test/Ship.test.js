const Ship = require('../Ship');

test('Ship class exists', () => {
  expect(new Ship()).not.toBeNull();
})