import React, { useState } from 'react'
import './Request.css'
import { useSelector } from 'react-redux'

const Request = () => {
  const [date,setDate] = useState('')
  const [place,setPlace] = useState('')
  const [media,setMedia] = useState('')
  const [mediaValue, setMediaValue] = useState()
  const [number,setNumber] = useState('')
  const [comm,setComm] = useState('')
  const id = useSelector((state) => state.auth.id)

  async function add(date,place,media,number,comm,id) {
    const data = new FormData();

    data.append('date', date)
    data.append('place', place)
    data.append('mediaValue', mediaValue[0])
    data.append('number', number)
    data.append('comm', comm)
    data.append('id', id)

    console.log(data)
    console.log(media)

    await fetch('http://localhost:5000/add/', {
      method: 'POST',
      mode: 'cors',
      body: data
    });
    setDate('')
    setPlace('')
    setMedia('')
    setMediaValue()
    setNumber('')
    setComm('')
  }


  return (
    <>
        <h1>Оставить заявку</h1>
        <form className='auth-form' onSubmit={(e) => {
          e.preventDefault() 
          add(date,place, media, number,comm, id)
          }} encType='multipart/form-data'> 
            <input type='date' id='date' name='date' value={date} onChange={e => setDate(e.target.value)} placeholder='Выберите дату...' />
            <input type='text' id='place' name='place' value={place} onChange={e => setPlace(e.target.value)} placeholder='Введите место...' />
            <input type='file' id='media' name='media' value={media} onChange={(e) => {
              setMedia(e.target.value)
              setMediaValue(e.target.files)
              }} placeholder='Добавьте фото/видео...' />
            <input type='text' id='number' name='number' value={number} onChange={e => setNumber(e.target.value)} placeholder='Введите номер машины...' />
            <input type='text' id='comm' name='comm' value={comm} onChange={e => setComm(e.target.value)} placeholder='Введите комментарий...' />
            <input type='hidden' id="id" name='id' value={id} />
            <button className='send' type='submit'>Отправить</button>
        </form>
    </>
  )
}

export default Request