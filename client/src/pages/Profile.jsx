import React from 'react'
import './Profile.css'
import AboutUser from './components/AboutUser'
import UserRequests from './components/UserRequests'

const Profile = () => {
  return (
    <>
    <div id='container'>
        <AboutUser />
        <UserRequests />
    </div>
    </>
  )
}

export default Profile