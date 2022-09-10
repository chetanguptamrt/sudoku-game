const N = 9 // lenght

// Bitmasks for each row/column/box
let row = new Array(N), col = new Array(N), box = new Array(N);
let seted = false;

// Utility function to find the box index
// of an element at position [i][j] in the grid
function getBox(i, j) {
    return Math.floor(i / 3) * 3 + Math.floor(j / 3);
}

// Utility function to check if a number
// is present in the corresponding row/column/box
function isSafe(i, j, number) {
    return !((row[i] >> number) & 1)
        && !((col[j] >> number) & 1)
        && !((box[getBox(i, j)] >> number) & 1);
}

// Utility function to set the initial values of a Sudoku board
// (map the values in the bitmasks)
function setInitialValues(grid) {
    for (let i = 0; i < N; i++)
        for (let j = 0; j < N; j++) {
            row[i] |= 1 << grid[i][j]
            col[j] |= 1 << grid[i][j]
            box[getBox(i, j)] |= 1 << grid[i][j]
        }
}

/* Takes a partially filled-in grid and attempts
to assign values to all unassigned locations in
such a way to meet the requirements for
Sudoku solution (non-duplication across rows,
columns, and boxes) */
function SolveSudoku(grid, i, j) {
    // Set the initial values
    if (!seted) {
        seted = true
        setInitialValues(grid);
    }

    if (i == N - 1 && j == N)
        return true;
    if (j == N) {
        j = 0;
        i++;
    }

    if (grid[i][j])
        return SolveSudoku(grid, i, j + 1);

    for (let nr = 1; nr <= N; nr++) {
        if (isSafe(i, j, nr)) {
            /* Assign nr in the
                current (i, j)
                position and
                add nr to each bitmask
            */
            grid[i][j] = nr;
            row[i] |= 1 << nr;
            col[j] |= 1 << nr;
            box[getBox(i, j)] |= 1 << nr;

            if (SolveSudoku(grid, i, j + 1))
                return true;

            // Remove nr from each bitmask
            // and search for another possibility
            row[i] &= ~(1 << nr);
            col[j] &= ~(1 << nr);
            box[getBox(i, j)] &= ~(1 << nr);
        }

        grid[i][j] = 0;
    }

    return false;
}

// Utility function to print the solved grid
function print(grid) {
    for (let i = 0; i < N; i++) {
        let line = "";
        for (let j = 0; j < N; j++) {
            line += grid[i][j] + ' ';
        }
        console.log(line)
    }
}

// 0 means unassigned cells
let grid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

// if (SolveSudoku(grid, 0, 0))
//     print(grid);
// else
//     console.log("No solution exists", "</br>");


