import React, {  useEffect, useState } from 'react';
import GenerateSudoku from '../services/generateSudoku.service';
import { BOX } from '../constants'

const Box = ({ level }) => {

    const [mat, setMat] = useState([[]]);
    const [startingMatrix, setStartingMatrix] = useState([[]]); // for reset
    const [boxColor, setBoxColor] = useState([[]]);
    const [boxNumberColor, setBoxNumberColor] = useState([[]]);
    const [selectedX, setSelectedX] = useState(null); // For horizontal 
    const [selectedY, setSelectedY] = useState(null); // For vertical 

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
        setStartingMatrix(JSON.parse(JSON.stringify(mat))); // todo: remove json...
        setBoxColor(BOX);
        setBoxNumberColor(BOX);
    }, [level])

    const numberClickHandler = (key) => {
        if (selectedX === null || selectedY === null) return;

        const temp = JSON.parse(JSON.stringify(mat));
        temp[selectedX][selectedY] = key;
        setMat(temp);
        let boxColor = JSON.parse(JSON.stringify(boxNumberColor));
        boxColor[selectedX][selectedY] = 'text-white'
        setBoxNumberColor(boxColor)
    }


    const resetHandler = () => {

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
        <div className='mt-5 mb-5 text-center'>
            <div className='box-container'>
                {mat.map((row, i) =>
                    <div className='box-items' key={`row_${i}`}>
                        {row.map((col, j) =>
                            <div
                                className={`box-item ${boxColor[i][j]} ${boxNumberColor[i][j]}`}
                                key={`col_${i}_${j}`}
                                onClick={() => clickBoxItem(i, j)}
                            >
                                <span>{col !== 0 && col}</span>
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
            <div>
                <input type={'checkbox'} /> Show warnings
            </div>
            <div>
                <button
                    type={'reset'}
                    onClick={resetHandler}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Box