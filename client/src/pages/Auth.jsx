import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AUTH_ROUTE,MAIN_ROUTE} from '../utils/consts'
import { regThunk } from '../redux/regSlice'
import { loginThunk } from '../redux/authSlice'


const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === MAIN_ROUTE
  const [email,setEmail] = useState('')
  const [fio,setFio] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')

  const authState = useSelector((state) => state.auth)
  const regState = useSelector((state) => state.reg)
  const dispatch = useDispatch()

  const nav = useNavigate()

    useEffect(() => {
      
    }, [authState])

    useEffect(() => {
      if (regState.message) {
          nav(MAIN_ROUTE)
      }
  }, [regState])

  const handleSubmit = event => {
    event.preventDefault();
  }

  return (
    <>
        <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
        <form onSubmit={handleSubmit} className='auth-form'>
          {isLogin ? <></> : <input type='text' placeholder='Введите ФИО...' value={fio} onChange={e => setFio(e.target.value)}/>}
            <input type='text' placeholder='Введите e-mail...' value={email} onChange={e => setEmail(e.target.value)}/>
          {isLogin ? <input type='text' placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/> : <input type='text' placeholder='Придумайте пароль...' value={password} onChange={e => setPassword(e.target.value)}/>}
          {isLogin ? <></> : <input type='tel' placeholder='Введите номер телефона...' value={phone} onChange={e => setPhone(e.target.value)}/>}
            <div>
                <p>{isLogin ? 'Впервые у нас?' : 'Уже есть аккаунт?'}</p>{isLogin ? <Link to={AUTH_ROUTE}>Зарегистрируйтесь</Link> : <Link to={MAIN_ROUTE}>Войдите</Link>}
            </div>
            {isLogin ? 
            <button onClick={() => {
                        dispatch(loginThunk({
                            email: email,
                            password: password}))
                          }} type='submit'>Войти</button>
                    :
            <button onClick={() => {
                        dispatch(regThunk({
                            fio: fio,
                            email: email,
                            password: password,
                            phone: phone,
                          }))
                          }} type='submit'>Зарегистрироваться</button> 
            }
        </form>
    </>
  )
}

export default Auth