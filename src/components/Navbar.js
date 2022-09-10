import React from 'react'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-custom p-2">
            <div className="container-fluid">
                <Link to={'/'} className='nav-link'>
                    <img
                        alt=""
                        src="./logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Sudoku Game
                </Link>
            </div>
        </nav>
    )
}

export default NavbarComponent