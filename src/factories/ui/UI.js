const CELL_CLASSES = ["cell", "target"];

// A 'Quick and Dirty' solution here, as I know the
// React lessons are starting in the next lesson.
// The assignment says not to worry about UI, just get it done
let ROTATION_DIRECTION = false;

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

  static placeShipInitialize(player, selector, callbackComplete) {
    const gameboard = this.getGameboardElement(selector);

    // Handle keyboard rotation
    document.addEventListener("keydown", (event) => {
      if (event.key === "r" || event.key === "R") {
        ROTATION_DIRECTION = !ROTATION_DIRECTION;
      }
    });

    // Add event listener for
    [...gameboard.children].forEach((div) => {
      const id = Number(div.id.slice(selector.length));
      const [x, y] = player.board.cellXY(id);
      //  mousenter
      div.addEventListener("mouseenter", () => {
        this.clearPreview(gameboard);
        const ids = player.getNextShipIds(x, y, ROTATION_DIRECTION);
        this.setPreview(gameboard, selector, ids);
      });
      // `mouseleve
      div.addEventListener("mouseleave", () => {
        this.clearPreview(gameboard);
      });
      // `click
      div.addEventListener("click", () => {
        player.placeNextUnplacedShip(x, y, ROTATION_DIRECTION);
        UI.updatePlacingUI(player, selector);
        if (player.isDonePlacingShips()) callbackComplete();
      });
    });
  }

  static updatePlacingUI(player, selector) {
    UI.showShips(player.board, selector);
    UI.showShipNames(player.unplacedShips, selector);
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

    if (callback === null) return cell;

    cell.addEventListener("click", () => {
      const parentDiv = UI.getGameboardElement(selector);
      if (!parentDiv.classList.contains("enabled")) return;
      if (!cell.classList.contains("target")) return;
      if (board.haveAllShipsBeenDestroyed()) {
        parentDiv.classList.remove("enabled");
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

  static clearPreview(gameboard) {
    const selected = [...gameboard.querySelectorAll(".preview")];
    selected.forEach((e) => e.classList.remove("preview"));
  }

  static setPreview(gameboard, selector, ids) {
    if (!ids) return;
    ids.forEach((id) => {
      const div = gameboard.querySelector(`#${selector}${id}`);
      if (div !== null) {
        div.classList.add("preview");
      }
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
      if (ship.ship === undefined) {
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
    const winstatus = document.querySelector("#winstatus");
    const winner = winstatus.querySelector("#winner");
    winner.textContent = `${name} wins!`;
    winstatus.classList.remove("hide");
  }

  static removeElementAndChildren(selector) {
    const element = document.querySelector(selector);
    while (element.lastChild) element.removeChild(element.lastChild);
    element.remove();
    console.log("DON!");
  }

  static setHide(selector, isHidden) {
    const element = document.querySelector(selector);
    if (isHidden) element.classList.add("hide");
    else element.classList.remove("hide");
  }

  static getGameboardElement = (selector) =>
    document.querySelector(`#gameboard-${selector}`);

  static getShiplistElement = (selector) =>
    document.querySelector(`#shiplist-${selector}`);

  static getCellElement = (gameboard, selector, id) =>
    gameboard.querySelector(`#${selector}${id}`);
}

module.exports = UI;
