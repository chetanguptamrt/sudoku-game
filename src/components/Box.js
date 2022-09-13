import React, { useEffect, useState } from 'react';
import GenerateSudoku from '../services/generateSudoku.service';
import { checkIfSafe } from '../services/validations.service';
import SudokuSolver from '../services/sudoku.service';
import { BOX } from '../constants';
import { Modal } from 'react-bootstrap';

const Box = ({ level, warningLabelShow }) => {

    const [mat, setMat] = useState([[]]);
    const [startingMatrix, setStartingMatrix] = useState([[]]);
    const [solution, setSolution] = useState([[]]);
    const [showSolution, setShowSolution] = useState(false);
    const [boxColor, setBoxColor] = useState([[]]);
    const [boxNumberColor, setBoxNumberColor] = useState([[]]);
    const [selectedX, setSelectedX] = useState(null); // For horizontal 
    const [selectedY, setSelectedY] = useState(null); // For vertical 
    const [showModal, setShowModal] = useState(false);
    const [showWarnings, setShowWarnings] = useState(warningLabelShow);

    // add window event
    useEffect(() => {
        window.addEventListener("keydown", keyPressHandler);

        return () => {
            window.removeEventListener("keydown", keyPressHandler, false);
        }
    }, [selectedX, selectedY, mat, boxColor, showModal, boxNumberColor, startingMatrix]);

    const keyPressHandler = ({ key }) => {
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
            numberClickHandler(parseInt(key));
        }
    }


    useEffect(() => {
        const mat = new GenerateSudoku(level).generate();
        setMat(mat);
        setStartingMatrix(JSON.parse(JSON.stringify(mat)));
        showSolutionHandler(JSON.parse(JSON.stringify(mat)));
        setBoxColor(BOX);
        setBoxNumberColor(BOX);
    }, [level])

    const numberClickHandler = (key) => {
        // validations
        if (showSolution ||
            selectedX === null ||
            selectedY === null ||
            mat[selectedX][selectedY] === key
        ) return;

        // set box item
        const temp = JSON.parse(JSON.stringify(mat));
        temp[selectedX][selectedY] = key;
        setMat(temp);

        // box color
        let boxColor = JSON.parse(JSON.stringify(boxNumberColor));
        // check old field warnings
        boxColor.forEach((m, i) => {
            m.forEach((n, j) => {
                if (n === 'text-danger' && selectedX !== i && selectedY !== j) {
                    const tempCheck = JSON.parse(JSON.stringify(temp));
                    tempCheck[i][j] = 0;
                    const check = checkIfSafe(tempCheck, i, j, temp[i][j]);
                    if (check) boxColor[i][j] = 'text-white';
                }
            });
        })
        const check = checkIfSafe(mat, selectedX, selectedY, key);
        boxColor[selectedX][selectedY] = check ? 'text-white' : 'text-danger';
        setBoxNumberColor(boxColor)

        if (check) {
            if (!temp.reduce((a, b) => a.concat(b)).includes(0)) {
                let isWin = true;
                temp.forEach((m, i) => {
                    m.forEach((n, j) => {
                        if (startingMatrix[i][j] === 0) {
                            let conMat = JSON.parse(JSON.stringify(mat));
                            conMat[i][j] = 0;
                            const isSafe = checkIfSafe(conMat, i, j, n);
                            if (!isSafe) isWin = false;
                            console.log(isSafe, i, j)
                        }
                    })
                })
                if (isWin) {
                    setShowModal(true);
                }

            }
            // if (!boxColor.reduce((a, b) => a.concat(b)).includes('text-danger')) {
            //     setShowModal(true);
            // }
        }
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
        setShowSolution(false);
    }

    const restartHandler = () => {
        const mat = new GenerateSudoku(level).generate();
        setMat(mat);
        setStartingMatrix(JSON.parse(JSON.stringify(mat)));
        showSolutionHandler(JSON.parse(JSON.stringify(mat)));
        setBoxColor(BOX);
        setBoxNumberColor(BOX);
        setShowModal(false);
        setSelectedX(null);
        setSelectedY(null);
        setShowSolution(false);
    }

    const clickBoxItem = (i, j) => {
        if (showSolution || startingMatrix[i][j]) return;

        let boxColor = JSON.parse(JSON.stringify(BOX));
        boxColor[i][j] = 'selected-box'
        setBoxColor(boxColor);
        setSelectedX(i);
        setSelectedY(j);
    }

    return (
        <div className='mt-3 mb-5 text-center sudoku'>
            <div className='box-container'>
                {mat.map((row, i) =>
                    <div className='box-items' key={`row_${i}`}>
                        {row.map((col, j) =>
                            <div
                                className={showSolution
                                    ? `box-item ${startingMatrix[i][j] === 0 ? 'box-item-solution' : ''}`
                                    : `box-item 
                                        ${boxColor[i][j]}
                                        ${showWarnings
                                        ? boxNumberColor[i][j]
                                        : boxNumberColor[i][j] === 'text-danger'
                                            ? 'text-white'
                                            : boxNumberColor[i][j]
                                    }`}
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
            {showModal &&
                <Modal
                    show={showModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className='modal'
                >
                    <Modal.Header className='modal-header' >
                        <Modal.Title>You Won!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='modal-body text-center' >
                        <button className='btn btn-success' onClick={restartHandler}>Restart</button>
                    </Modal.Body>
                </Modal>
            }
        </div >
    )
}

export default Box