const unUsedInBox = (mat, rowStart, colStart, num) => {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (mat[rowStart + i][colStart + j] === num)
                return false;
    return true;
}

const unUsedInRow = (mat, i, num) => {
    for (let j = 0; j < 9; j++)
        if (mat[i][j] === num)
            return false;
    return true;
}

const unUsedInCol = (mat, j, num) => {
    for (let i = 0; i < 9; i++)
        if (mat[i][j] === num)
            return false;
    return true;
}
const checkIfSafe = (mat, i, j, num) => {
    return (unUsedInRow(mat, i, num) &&
        unUsedInCol(mat, j, num) &&
        unUsedInBox(mat, i - i % 3, j - j % 3, num));
}

module.exports = {
    checkIfSafe,
}