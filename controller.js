"use strict";

import MazeGenerator from "./mazeGenerator.js";

window.addEventListener("load", async () => {
  const boardData = (await fetch("maze.json")).json();
  const c = new Controller(await boardData);
  c.init();
});

class Controller {
  constructor(boardData) {
    this.board = boardData;
  }

  async init() {
    this.board = new MazeGenerator(5, 5).generate();
    this.displayBoard();
  }

  displayBoard() {
    document.querySelector(
      "#game"
    ).innerHTML = `<div id="board" style="grid-template-columns: repeat(${
      this.board.cols
    }, 1fr); width: ${this.board.cols * 20}px"></div>`;
    let cellNo = 0;
    for (let row = 0; row < this.board.rows; row++) {
      for (let col = 0; col < this.board.cols; col++) {
        cellNo++;
        document.querySelector("#board").insertAdjacentHTML(
          "beforeend",
          `
                <div class="cell" id="cell${cellNo}"></div>
                `
        );
        const cell = this.board.maze.get({ row: row, col: col });
        const cellElement = document.querySelector(`#cell${cellNo}`);
        if (cell.north) {
          cellElement.classList.add("north");
        }
        if (cell.east) {
          cellElement.classList.add("east");
        }
        if (cell.west) {
          cellElement.classList.add("west");
        }
        if (cell.south) {
          cellElement.classList.add("south");
        }
        if (row === this.board.start.row && col === this.board.start.col) {
          cellElement.classList.add("start");
        } else if (row === this.board.goal.row && col === this.board.goal.col) {
          cellElement.classList.add("goal");
        }
      }
    }
  }
}
