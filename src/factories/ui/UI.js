const CELL_CLASSES = ["cell", "target"];

class UI {
  initializeBoard(board, selector, callback = null) {
    const boardDiv = this.getGameboardElement(selector);
    for (let y = 0; y < board.width; y++) {
      for (let x = 0; x < board.height; x++) {
        const cell = this.makeBoardCell(board, selector, x, y, callback);
        boardDiv.append(cell);
      }
    }
  }

  updateBoard(board, selector, showShips = false) {
    if (showShips) this.showShips(board, selector);
    this.showHits(board, selector);
    this.showMisses(board, selector);
    this.showShipNames(board.ships, selector);
  }

  makeBoardCell(board, selector, x, y, callback) {
    const cell = document.createElement("div");
    const id = board.cellId(x, y);
    const htmlId = `${selector}${id}`;
    CELL_CLASSES.forEach((c) => cell.classList.add(c));
    cell.id = htmlId;

    if (callback === null) return cell;

    cell.addEventListener("click", () => {
      const parentDiv = this.getGameboardElement(selector);
      if (!parentDiv.classList.contains("enabled")) return;
      if (!cell.classList.contains("target")) return;

      cell.classList.remove("target");
      board.receiveAttack(x, y);

      console.log("clicked?");
      callback();
      // this.showHits(board, selector);
      // this.showMisses(board, selector);
    });
    return cell;
  }

  makeShipListLi(name, destroyed = false) {
    const li = document.createElement("li");
    li.textContent = name;
    if (destroyed) li.classList.add("destroyed");
    return li;
  }

  showShips(board, selector) {
    const gameboard = this.getGameboardElement(selector);
    board.ships.forEach((ship) => {
      ship.positions.forEach((id) => {
        const cell = this.getCellElement(gameboard, selector, id);
        cell.classList.add("ship");
      });
    });
  }

  clearShipList(shiplist) {
    const lis = [...shiplist.querySelectorAll("li")];
    lis.forEach((li) => li.remove());
  }

  clearHits(gameboard) {
    const hits = [...gameboard.querySelectorAll(".hit")];
    hits.forEach((e) => e.classList.remove("hit"));
  }

  clearMisses(gameboard) {
    const hits = [...gameboard.querySelectorAll(".miss")];
    hits.forEach((e) => e.classList.remove("miss"));
  }

  showHits(board, selector) {
    const gameboard = this.getGameboardElement(selector);
    this.clearHits(gameboard);
    board.hits.forEach((id) => {
      const cell = this.getCellElement(gameboard, selector, id);
      cell.classList.add("hit");
    });
  }

  showMisses(board, selector) {
    const gameboard = this.getGameboardElement(selector);
    this.clearMisses(gameboard);
    board.misses.forEach((id) => {
      const cell = this.getCellElement(gameboard, selector, id);
      cell.classList.add("miss");
    });
  }

  showShipNames(ships, selector) {
    const shiplist = this.getShiplistElement(selector);
    this.clearShipList(shiplist);
    ships.forEach((ship) => {
      const li = this.makeShipListLi(ship.ship.name, ship.ship.isSunk());
      shiplist.append(li);
    });
  }

  getGameboardElement = (selector) =>
    document.querySelector(`#gameboard-${selector}`);

  getShiplistElement = (selector) =>
    document.querySelector(`#shiplist-${selector}`);

  getCellElement = (gameboard, selector, id) =>
    gameboard.querySelector(`#${selector}${id}`);
}

module.exports = UI;
