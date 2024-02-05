import React from 'react'
import './App.css'
import Header from './pages/components/Header'
import { Outlet } from 'react-router-dom'

const MainPage = () => {


    return (
        <>
        <div className='page'>
            <Header />
            <Outlet />
        </div>
        </>
    )
}

export default MainPage