class Ship {
  length;
  hits;
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit = (position) => {
    if (position < this.length && position >= 0) this.hits |= 1 << position;
    else throw new Error('Hit position out of bounds');
  };
}

module.exports = Ship;
