import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import axios from 'axios';

const UserProfile = () => {
  const [profilePicture, setprofilePicture] = useState()
  const [username, setusername] = useState()
  const [email, setEmail] = useState()
  const [currentPassword, setcurrentPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false)


  // redirect user to login page if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  })

  // fetch the user
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${currentUser?.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      const { username, email, profilePicture } = response?.data
      setusername(username)
      setEmail(email)
      setprofilePicture(profilePicture)
    }
    getUser()
  })

  const changeAvatar = async () => {
    setIsAvatarUpdating(false)
    // send avatar to server
    try {
      const postData = new FormData()
      postData.set('profilePicture', profilePicture)
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/change-avatar`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      setprofilePicture(response?.data?.profilePicture)
      console.log(response.data.profilePicture)
    } catch (error) {
      console.log(error)
    }
  }


  const updateUserDetail = async (e) => {
    e.preventDefault()
    try {
      const userData = new FormData()
      userData.set('username', username)
      userData.set('email', email)
      userData.set('phoneNumber', phoneNumber)
      userData.set('currentPassword', currentPassword)
      userData.set('password', password)
      userData.set('password2', password2)
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 200) {
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message)
    }

  }




  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myschools/${currentUser.id}`} className='btn'>My School</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/${profilePicture}`} alt="" />
            </div>
            {/* Form to update avatar */}
            <form className="avatar__form" onSubmit={changeAvatar}>
              <input type="file" id="profilePicture" name={profilePicture} accept="png, jpg, jpeg" onChange={e => setprofilePicture(e.target.files[0])} />
              <label htmlFor="profilePicture" className="btn" onClick={() => setIsAvatarUpdating(true)}><FaEdit /></label>
            </form>
            {isAvatarUpdating && <button type="submit" className="profile__avatar-btn" onClick={changeAvatar}><FaCheck /></button>}
          </div>
          <h1>{currentUser?.name}</h1>
          {/* Form to update user details */}
          <form className="form profile__form" onSubmit={updateUserDetail}>
            {error && <p className="form__error-message">{error}</p>}
            <input type="text" placeholder='Enter your full name' name='username' value={username} onChange={e => setusername(e.target.value)} autoFocus />
            <input type="email" placeholder='Enter your email' name='email' value={email} onChange={e => setEmail(e.target.value)} autoFocus />
            <input type="text" placeholder='Enter your new phoneNumber' name='phoneNumber' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} autoFocus />
            <input type="password" placeholder='Enter your current password' name='currentPassword' value={currentPassword} onChange={e => setcurrentPassword(e.target.value)} autoFocus />
            <input type="password" placeholder='Enter your new password' name='password' value={password} onChange={e => setPassword(e.target.value)} autoFocus />
            <input type="password" placeholder='Confirm your new password' name='password2' value={password2} onChange={e => setPassword2(e.target.value)} autoFocus />
            <button type='submit' className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile