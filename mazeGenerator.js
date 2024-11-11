import Grid from "./grid.js";

export default class MazeGenerator {
  #rows;
  #cols;
  #board;

  constructor(rows = 5, cols = 5) {
    this.#rows = rows;
    this.#cols = cols;
    this.#board = {
      rows: rows,
      cols: cols,
      start: {
        row: 0,
        col: 0,
      },
      goal: {
        row: rows - 1,
        col: cols - 1,
      },
      maze: this.#defaultGrid(),
    };
  }

  #defaultGrid() {
    const grid = new Grid(this.#rows, this.#cols, {});
    for (let r = 0; r < this.#rows; r++) {
      for (let c = 0; c < this.#cols; c++) {
        grid.set(
          { row: r, col: c },
          {
            row: r,
            col: c,
            north: true,
            east: true,
            west: true,
            south: true,
          }
        );
      }
    }
    return grid;
  }

  generate() {
    this.#board.maze = this.#defaultGrid();
    return this.#board;
  }
}
