import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../../utils/consts'

const Header = () => {
  const role = useSelector((state) => state.auth.role)

  const nav = useNavigate()
  const to = () => {
    nav(MAIN_ROUTE)
  }

  return (
    <>
    {role === "ADMIN" ? 
    <div className='header'>
        <p>Штрафам ДА!</p><p id='admin-p'>АДМИНИСТРАТОР</p>
    </div> 
    : 
    <div className='header' onClick={to}>
        Штрафам ДА!
    </div>
    }
    </>
    
  )
}

export default Header