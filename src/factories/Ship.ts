class Ship {
  length;
  hits;
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit = (position) => {
    if (position < this.length && position >= 0) this.hits |= 1 << position;
    else throw new Error("Hit position out of bounds");
  };

  isSunk = () => (2 ** this.length - 1) === this.hits;
}

module.exports = Ship;
