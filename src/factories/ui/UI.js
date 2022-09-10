const CELL_CLASSES = ["cell"];

class UI {
  drawBoard(board, selector) {
    const gameboard = document.querySelector(selector);
    for (let y = 0; y < board.width; y++) {
      for (let x = 0; x < board.height; x++) {
        gameboard.append(this.makeBoardCell());
      }
    }
  }

  makeBoardCell() {
    const div = document.createElement("div");
    CELL_CLASSES.forEach((c) => div.classList.add(c));
    return div;
  }
}

module.exports = UI;
