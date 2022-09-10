import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h3 className='text-center mt-5 text-label'>Sudoku Game</h3>
            <div className='row mt-4'>
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12">
                    <Link className={'level-link'} to={'/beginner'}>Beginner</Link>
                    <Link className={'level-link'} to={'/intermediate'}>Intermediate</Link>
                    <Link className={'level-link'} to={'/advance'}>Advance</Link>
                </div>
            </div>
            <div className='text-center'>
                <span className='text-label'>Made by - <span className='font-weight-500'>Chetan Gupta</span></span>
            </div>
        </div>
    )
}

export default Home