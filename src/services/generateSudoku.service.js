
class GenerateSudoku {

    constructor(level) {

        switch (level) {
            case 'BEGINNER':
                this.K = 20 // number of missing digits
                break;
            case 'INTERMEDIATE':
                this.K = 40 // number of missing digits
                break;
            case 'ADVANCED':
                this.K = 60 // number of missing digits
                break;
            default:
                this.K = 20 // number of missing digits
        }

        this.N = 9; // number of columns/rows.
        this.SRN = 3;
        this.mat = this.freshGrid(); // create fresh matrix
    }

    freshGrid() {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    generate() {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
        this.removeKDigits();
        return this.mat;
    }

    // fill diagonal 3x3 array
    fillDiagonal() {
        for (let i = 0; i < this.N; i += this.SRN)
            this.fillBox(i, i);

    }

    fillBox(row, col) {
        let num;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                do {
                    num = this.randomGenerator(this.N);
                } while (!this.unUsedInBox(row, col, num));
                this.mat[row + i][col + j] = num;
            }
        }
    }

    randomGenerator(range) {
        return Math.floor((Math.random() * range + 1));
    }

    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < this.SRN; i++)
            for (let j = 0; j < this.SRN; j++)
                if (this.mat[rowStart + i][colStart + j] === num)
                    return false;
        return true;
    }

    // check in the row for existence
    unUsedInRow(i, num) {
        for (let j = 0; j < this.N; j++)
            if (this.mat[i][j] === num)
                return false;
        return true;
    }

    // check in the row for existence
    unUsedInCol(j, num) {
        for (let i = 0; i < this.N; i++)
            if (this.mat[i][j] === num)
                return false;
        return true;
    }

    CheckIfSafe(i, j, num) {
        return (this.unUsedInRow(i, num) &&
            this.unUsedInCol(j, num) &&
            this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num));
    }


    fillRemaining(i, j) {
        if (j >= this.N && i < this.N - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.N && j >= this.N)
            return true;

        if (i < this.SRN) {
            if (j < this.SRN)
                j = this.SRN;
        }
        else if (i < this.N - this.SRN) {
            if (j === parseInt(i / this.SRN) * this.SRN)
                j = j + this.SRN;
        }
        else {
            if (j === this.N - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.N)
                    return true;
            }
        }

        for (let num = 1; num <= this.N; num++) {
            if (this.CheckIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1))
                    return true
                this.mat[i][j] = 0;
            }
        }
        return false;
    }

    removeKDigits() {
        let count = this.K;
        while (count !== 0) {
            let cellId = this.randomGenerator(this.N * this.N) - 1;

            let i = parseInt(cellId / this.N);
            let j = cellId % 9;
            if (j !== 0)
                j = j - 1;

            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
    }

}

module.exports = GenerateSudoku;