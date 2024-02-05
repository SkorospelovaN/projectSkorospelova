import React, { useEffect, useState } from 'react'
import './AboutUser.css'
import edit from '../assets/Edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmailThunk,  logOut } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { REQ_ROUTE } from '../../utils/consts'

const AboutUser = () => {

    const dispatch = useDispatch()

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.role)
    const email = useSelector((state) => state.auth.email)
    const fio = useSelector((state) => state.auth.fio)
    const phone = useSelector((state) => state.auth.phone)

    const [mail, setMail] = useState(email)
    const [info, setInfo] = useState(fio)
    const [tel, setTel] = useState(phone)
    

    const nav = useNavigate()
    const newReq = () => {
        nav(REQ_ROUTE)
    }
    

  return (
    <>
    <div className='user-container'>
        <div className='user'>
            <h1>Данные пользователя</h1>
            <div>
                <input type='text' placeholder='e-mail пользователя' value={mail} onChange={e => {
                    setMail(e.target.value)
                    localStorage.setItem("email", e.target.value)
                    }}/>
                <img src={edit} onClick={() => {
                        dispatch(changeEmailThunk({email: email}))
                          }}/>
            </div>
            <div>
                <input type='text' placeholder='ФИО пользователя' value={info} onChange={e => setInfo(e.target.value)}/>
                <img src={edit} />
            </div>
            <div>
                <input type='text' placeholder='Номер телефона' value={tel} onChange={e => setTel(e.target.value)}/>
                <img src={edit} />
            </div>
        </div>
        {role === "ADMIN" ? 
        <div className='buttons'>
            <button onClick={() => {
                dispatch(logOut())
            }} className='exit' style={{background: '#A42323'}}>Выйти</button>
        </div>
        :
        <div className='buttons'>
            <button className='new' onClick={newReq}>Добавить заявку</button>
            <button onClick={() => {
                dispatch(logOut())
            }} className='exit'>Выйти</button>
        </div>
        }     
    </div>
    </>
  )
}

export default AboutUser