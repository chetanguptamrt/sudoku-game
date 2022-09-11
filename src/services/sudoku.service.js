class SudokuSolver {

    constructor(grid) {
        this.grid = grid;
        this.N = 9
        // Bitmasks for each row/column/box
        this.row = new Array(this.N);
        this.col = new Array(this.N);
        this.box = new Array(this.N);
        this.seted = false;
    }


    solve() {
        if (this.SolveSudoku(0, 0))
            return this.grid;
        else
            throw new Error("No solution exists");
    }

    // Utility function to find the box index
    // of an element at position [i][j] in the grid
    getBox(i, j) {
        return Math.floor(i / 3) * 3 + Math.floor(j / 3);
    }

    // Utility function to check if a number
    // is present in the corresponding row/column/box
    isSafe(i, j, number) {
        return !((this.row[i] >> number) & 1)
            && !((this.col[j] >> number) & 1)
            && !((this.box[this.getBox(i, j)] >> number) & 1);
    }

    // Utility function to set the initial values of a Sudoku board
    // (map the values in the bitmasks)
    setInitialValues() {
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.N; j++) {
                this.row[i] |= 1 << this.grid[i][j]
                this.col[j] |= 1 << this.grid[i][j]
                this.box[this.getBox(i, j)] |= 1 << this.grid[i][j]
            }
    }

    /* Takes a partially filled-in grid and attempts
    to assign values to all unassigned locations in
    such a way to meet the requirements for
    Sudoku solution (non-duplication across rows,
    columns, and boxes) */
    SolveSudoku(i, j) {
        // Set the initial values
        if (!this.seted) {
            this.seted = true
            this.setInitialValues();
        }

        if (i == this.N - 1 && j == this.N)
            return true;
        if (j == this.N) {
            j = 0;
            i++;
        }

        if (this.grid[i][j])
            return this.SolveSudoku(i, j + 1);

        for (let nr = 1; nr <= this.N; nr++) {
            if (this.isSafe(i, j, nr)) {
                /* Assign nr in the
                    current (i, j)
                    position and
                    add nr to each bitmask
                */
                this.grid[i][j] = nr;
                this.row[i] |= 1 << nr;
                this.col[j] |= 1 << nr;
                this.box[this.getBox(i, j)] |= 1 << nr;

                if (this.SolveSudoku(i, j + 1))
                    return true;

                // Remove nr from each bitmask
                // and search for another possibility
                this.row[i] &= ~(1 << nr);
                this.col[j] &= ~(1 << nr);
                this.box[this.getBox(i, j)] &= ~(1 << nr);
            }

            this.grid[i][j] = 0;
        }

        return false;
    }


}

module.exports = SudokuSolver;