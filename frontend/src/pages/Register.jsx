import React, { useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `http://localhost:5000/api/auth/google`;
    } catch (error) {
      
    }
  }

  const chanceInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }


  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    if (userData.password !== userData.password2) {
      setError('Passwords do not match');
      // return;
    }
    if (userData.password.length < 5 || userData.password2.length < 5) {
      setError('Password must be at least 5 characters long');
      // return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register`, userData);
      if (response && response.data) {
        const newUser = response.data;
        console.log(newUser);
        if (!newUser) {
          setError('Could not create user, please try again');
          // return;
        }
        navigate('/');
      } else {
        setError('Invalid response from server');
        // return;
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
      // return;
    }
  };

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{ error }</p>}
          <input type="text" placeholder='Enter your Full Name'name='username' value={userData.username} onChange={chanceInputHandler} />
          <input type="email" placeholder='Enter your email'name='email' value={userData.email} onChange={chanceInputHandler} />
          <input type="password" placeholder='Enter your password'name='password' value={userData.password} onChange={chanceInputHandler} />
          <input type="password" placeholder='confirm your password'name='password2' value={userData.password2} onChange={chanceInputHandler} />
          <button className='btn primary'>Sign Up</button>
        </form>
        <small>Already have an account? <Link to='/login'>Sign In</Link> </small>
        <p className="center">Or</p>
        {/* <Link to={`/${process.env.GOOGLE_LOGIN_URL}/api/v1/auth/google`} className='btn primary'><FcGoogle /> Sign Up with google</Link> */}
        <button className="btn primary" onClick={handleGoogleLogin}><FcGoogle /> Sign Up with google</button>
      </div>
    </section>
  )
}

export default Register