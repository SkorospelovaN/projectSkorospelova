import React from 'react'
import './UserRequests.css'
import info from '../assets/info.svg'
import decline from '../assets/decline.svg'
import accept from '../assets/accept.svg'
import { useSelector } from 'react-redux'

const UserRequests = () => {
    const role = useSelector((state) => state.auth.role)

  return (
    <>
    <div className='requests'>
        <h1>{role === "ADMIN" ? 'Заявки' : 'Оставленные заявки'}</h1>
        {role === "ADMIN" ? 
        <div className='admin-req'>
            <p>Дата</p>
            <div>
                <img id="info" src={info} />
                <img id="decline" src={decline} />
                <img id="accept" src={accept} />
            </div>
        </div>
        :
        <div className='user-cont-req'>
            <p>Отклонено</p>
            <div className='user-req'>
                <img src='' alt='photo' />
                <div>
                    <p>Дата</p>
                    <p>Место</p>
                    <p>Номер машины</p>
                    <p>Комментарий</p>
                </div>
            </div>
        </div>
        }    
    </div>
    </>
  )
}

export default UserRequests