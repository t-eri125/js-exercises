import { ROWS, COLS } from "./constants.js";

export function updateGrid(grid) {
    const nextGrid = grid.map((arr) => [...arr]);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            let count = 0;

            for (let r = Math.max(0, row - 1); r < Math.min(ROWS, row + 2); r++) {
                for (let c = Math.max(0, col - 1); c < Math.min(COLS, col + 2); c++) {
                    if (grid[r][c] === true && !(r === row && c === col)) {
                        count++;
                    }
                }
            }

            if (grid[row][col] === true) {
                if (count < 2 || count > 3) {
                    nextGrid[row][col] = false;
                }
            } else {
                if (count === 3) {
                    nextGrid[row][col] = true;
                }
            }
        }
    }
    return nextGrid;
}