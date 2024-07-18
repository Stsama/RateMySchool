import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const chanceInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form">
          <p className="form__error-message">This is an error message</p>
          <input type="text" placeholder='Enter your Full Name'name='username' value={userData.username} onChange={chanceInputHandler} />
          <input type="email" placeholder='Enter your email'name='email' value={userData.email} onChange={chanceInputHandler} />
          <input type="password" placeholder='Enter your password'name='password' value={userData.password} onChange={chanceInputHandler} />
          <input type="password" placeholder='confirm your password'name='confirmPassword' value={userData.confirmPassword} onChange={chanceInputHandler} />
          <button className='btn primary'>Sign Up</button>
        </form>
        <small>Already have an account? <Link to='/login'>Sign In</Link> </small>
        <p className="center">Or</p>
        <Link to='/google' className='btn primary'><FcGoogle /> Sign Up with google</Link>
      </div>
    </section>
  )
}

export default Register