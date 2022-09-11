import React, { useEffect, useState } from 'react';
import GenerateSudoku from '../services/generateSudoku.service';
import { checkIfSafe } from '../services/validations.service'
import SudokuSolver from '../services/sudoku.service'
import { BOX } from '../constants'


const Box = ({ level, warningLabelShow }) => {

    const [mat, setMat] = useState([[]]);
    const [startingMatrix, setStartingMatrix] = useState([[]]);
    const [solution, setSolution] = useState([[]]);
    const [showSolution, setShowSolution] = useState(false);
    const [boxColor, setBoxColor] = useState([[]]);
    const [boxNumberColor, setBoxNumberColor] = useState([[]]);
    const [selectedX, setSelectedX] = useState(null); // For horizontal 
    const [selectedY, setSelectedY] = useState(null); // For vertical 
    const [showWarnings, setShowWarnings] = useState(warningLabelShow);

    // add window event
    // useEffect(() => {
    //     window.addEventListener("keydown", keyPressHandler);

    //     return () => {
    //         window.removeEventListener("keydown", keyPressHandler, false);
    //     }
    // }, []);

    useEffect(() => {
        const mat = new GenerateSudoku(level).generate();
        setMat(mat);
        setStartingMatrix(JSON.parse(JSON.stringify(mat)));
        showSolutionHandler(JSON.parse(JSON.stringify(mat)));
        setBoxColor(BOX);
        setBoxNumberColor(BOX);
    }, [level])

    const numberClickHandler = (key) => {
        if (selectedX === null || selectedY === null || mat[selectedX][selectedY] === key) return;
        console.log(mat[selectedX][selectedY])

        const temp = JSON.parse(JSON.stringify(mat));
        temp[selectedX][selectedY] = key;
        setMat(temp);
        const check = checkIfSafe(mat, selectedX, selectedY, key);
        let boxColor = JSON.parse(JSON.stringify(boxNumberColor));
        boxColor[selectedX][selectedY] = check ? 'text-white' : 'text-danger';
        setBoxNumberColor(boxColor)
    }

    const showSolutionHandler = (mat) => {
        try {
            const solution = new SudokuSolver(mat).solve();
            setSolution(JSON.parse(JSON.stringify(solution)));
        } catch (err) {
            console.log(err);
        }
    }

    const resetHandler = () => {
        setBoxColor(BOX);
        setBoxNumberColor(BOX);
        setMat(JSON.parse(JSON.stringify(startingMatrix)));
        setSelectedX(null);
        setSelectedY(null);
    }

    const clickBoxItem = (i, j) => {
        if (startingMatrix[i][j]) return
        let boxColor = JSON.parse(JSON.stringify(BOX));
        boxColor[i][j] = 'selected-box'
        setBoxColor(boxColor);
        setSelectedX(i);
        setSelectedY(j);
    }

    return (
        <div className='mt-5 mb-5 text-center sudoku'>
            <div className='box-container'>
                {mat.map((row, i) =>
                    <div className='box-items' key={`row_${i}`}>
                        {row.map((col, j) =>
                            <div
                                className={`box-item ${boxColor[i][j]} ${showWarnings ? boxNumberColor[i][j] : boxNumberColor[i][j] == 'text-danger' ? 'text-white' : boxNumberColor[i][j]}`}
                                key={`col_${i}_${j}`}
                                onClick={() => clickBoxItem(i, j)}
                            >
                                <span>{startingMatrix[i][j] === 0 && showSolution ? solution[i][j] : col !== 0 && col}</span>
                            </div>
                        )}
                    </div>
                )}
            </div >
            <div className='number-container justify-content-center'>
                {Array.from(Array(9).keys()).map((num, i) =>
                    <div
                        key={`number_${i}`}
                        className='number'
                        onClick={() => numberClickHandler(num + 1)}
                    >
                        {num + 1}
                    </div>
                )}
            </div>
            {warningLabelShow &&
                <div className='show-warning-label'>
                    <input type={'checkbox'} id='showWarnings' checked={showWarnings} onChange={(e) => setShowWarnings(e.target.checked)} />
                    <label htmlFor='showWarnings'>Show warnings</label>
                </div>
            }
            <div>
                <button
                    className='btn btn-success btn-sm pl-2 pr-2'
                    type={'button'}
                    onClick={() => setShowSolution(!showSolution)}
                >
                    {!showSolution ? 'Show' : 'Hide'} Solution
                </button>
                <button
                    className='btn btn-danger btn-sm pl-2 pr-2 m-2'
                    type={'button'}
                    onClick={resetHandler}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Box