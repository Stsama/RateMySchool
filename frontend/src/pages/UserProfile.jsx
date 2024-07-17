import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar-1.jpg'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar)
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [currentpassword, setcurrentPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myschools/ueuef`} className='btn'>My School</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            {/* Form to update avatar */}
            <form className="avatar__form">
              <input type="file" id="avatar" name='avatar' accept="png, jpg, jpeg" onChange={e => setAvatar(e.target.files[0])} />
              <label htmlFor="avatar" className="btn"><FaEdit /></label>
            </form>
            <button type="submit" className="profile__avatar-btn"><FaCheck /></button>
          </div>
          <h1>Albert EZOULA</h1>
          {/* Form to update user details */}
          <form className="form profile__form">
            <p className="form__error-message">This is an error message</p>
            <input type="text" placeholder='Enter your full name' name='username' value={username} onChange={e => setusername(e.target.value)} autoFocus />
            <input type="email" placeholder='Enter your email' name='email' value={email} onChange={e => setEmail(e.target.value)} autoFocus />
            <input type="password" placeholder='Enter your current password' name='currentPassword' value={currentpassword} onChange={e => setcurrentPassword(e.target.value)} autoFocus />
            <input type="password" placeholder='Enter your new passwordnew' name='newPassword' value={newpassword} onChange={e => setNewPassword(e.target.value)} autoFocus />
            <input type="password" placeholder='Confirm your new password' name='password' value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} autoFocus />
            <button type='submit' className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile