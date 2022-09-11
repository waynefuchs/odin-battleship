const CELL_CLASSES = ["cell", "target"];

class UI {
  static initializeBoard(board, selector, callback = null) {
    const boardDiv = UI.getGameboardElement(selector);
    for (let y = 0; y < board.width; y++) {
      for (let x = 0; x < board.height; x++) {
        const cell = UI.makeBoardCell(board, selector, x, y, callback);
        boardDiv.append(cell);
      }
    }
  }

  static setPlayerName(name, selector) {
    const h1 = document.querySelector(`#name-${selector}`);
    h1.textContent = name;
  }

  static updateBoard(board, selector, showShips = false) {
    if (showShips) UI.showShips(board, selector);
    UI.showHits(board, selector);
    UI.showMisses(board, selector);
    UI.showShipNames(board.ships, selector);
  }

  static makeBoardCell(board, selector, x, y, callback) {
    const cell = document.createElement("div");
    const id = board.cellId(x, y);
    const htmlId = `${selector}${id}`;
    CELL_CLASSES.forEach((c) => cell.classList.add(c));
    cell.id = htmlId;
    // TODO: REMOVE
    cell.textContent = id;

    if (callback === null) return cell;

    cell.addEventListener("click", () => {
      const parentDiv = UI.getGameboardElement(selector);
      if (!parentDiv.classList.contains("enabled")) return;
      if (!cell.classList.contains("target")) return;
      if (board.haveAllShipsBeenDestroyed()) {
        parentDiv.classList.remove('enabled');
        return;
      }

      cell.classList.remove("target");
      board.receiveAttack(x, y);

      callback();
    });
    return cell;
  }

  static makeShipNameLi(name, destroyed = false) {
    const li = document.createElement("li");
    li.textContent = name;
    if (destroyed) li.classList.add("destroyed");
    return li;
  }

  static showShips(board, selector) {
    const gameboard = UI.getGameboardElement(selector);
    board.ships.forEach((ship) => {
      ship.positions.forEach((id) => {
        const cell = UI.getCellElement(gameboard, selector, id);
        cell.classList.add("ship");
      });
    });
  }

  static clearShipList(shiplist) {
    const lis = [...shiplist.querySelectorAll("li")];
    lis.forEach((li) => li.remove());
  }

  static clearHits(gameboard) {
    const hits = [...gameboard.querySelectorAll(".hit")];
    hits.forEach((e) => e.classList.remove("hit"));
  }

  static clearMisses(gameboard) {
    const hits = [...gameboard.querySelectorAll(".miss")];
    hits.forEach((e) => e.classList.remove("miss"));
  }

  static showHits(board, selector) {
    const gameboard = UI.getGameboardElement(selector);
    UI.clearHits(gameboard);
    board.hits.forEach((id) => {
      const cell = UI.getCellElement(gameboard, selector, id);
      cell.classList.add("hit");
    });
  }

  static showMisses(board, selector) {
    const gameboard = UI.getGameboardElement(selector);
    UI.clearMisses(gameboard);
    board.misses.forEach((id) => {
      const cell = UI.getCellElement(gameboard, selector, id);
      cell.classList.add("miss");
    });
  }

  static showShipNames(ships, selector) {
    const shiplist = UI.getShiplistElement(selector);
    UI.clearShipList(shiplist);
    ships.forEach((ship) => {
      let name;
      let sunk = false;
      if(ship.ship === undefined) {
        name = ship.name;
      } else {
        name = ship.ship.name;
        sunk = ship.ship.isSunk();
      }

      const li = UI.makeShipNameLi(name, sunk);
      shiplist.append(li);
    });
  }

  static showGameOver(name) {
    const winstatus = document.querySelector('#winstatus');
    const winner = winstatus.querySelector('#winner');
    winner.textContent = `${name} wins!`;
    winstatus.classList.remove('hide');
  }

  static getGameboardElement = (selector) =>
    document.querySelector(`#gameboard-${selector}`);

  static getShiplistElement = (selector) =>
    document.querySelector(`#shiplist-${selector}`);

  static getCellElement = (gameboard, selector, id) =>
    gameboard.querySelector(`#${selector}${id}`);
}

module.exports = UI;
