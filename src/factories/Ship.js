const hitAt = (position, mask) => {
  return ((2 ** position) & mask) !== 0;
};

class Ship {
  length;
  name;
  hits;
  constructor(length, name='Unknown Vessel') {
    this.length = length;
    this.name = name;
    this.hits = 0;
  }

  hit = (position) => {
    const isInBounds = position < this.length && position >= 0;
    if (!isInBounds) throw new Error("Hit position out of bounds");
    const hasAttackedHere = hitAt(position, this.hits);
    if (hasAttackedHere) throw new Error("Attacked same location again");
    this.hits |= 1 << position;
  };

  isSunk = () => 2 ** this.length - 1 === this.hits;

  getPositions = (boardWidth, x, y, vertical) => {
    
  }
}

module.exports = Ship;
