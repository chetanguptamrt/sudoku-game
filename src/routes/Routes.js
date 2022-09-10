import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../components/Loader';

const Home = lazy(() => import('../components/Home'));
const Beginner = lazy(() => import('../components/Beginner'))
const Intermediate = lazy(() => import('../components/Intermediate'))
const Advance = lazy(() => import('../components/Advance'))

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Loader Component={Home} />} />
            <Route path='/beginner' element={<Loader Component={Beginner} />} />
            <Route path='/intermediate' element={<Loader Component={Intermediate} />} />
            <Route path='/advance' element={<Loader Component={Advance} />} />
        </Routes>
    )
}

export default RoutesComponent