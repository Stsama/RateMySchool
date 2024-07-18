import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/userContext';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: ''});

  // error state
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // get the current user from the context
  const { setCurrentUser } = useContext(UserContext);


  const chanceInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, userData);
      const user = await response.data
      setCurrentUser(user);
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Login</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="email" placeholder='Enter your email'name='email' value={userData.email} onChange={chanceInputHandler} autoFocus />
          <input type="password" placeholder='Enter your password'name='password' value={userData.password} onChange={chanceInputHandler} />
          <button className='btn primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to='/register'>Sign Up</Link> </small>
      </div>
    </section>
  )
};

export default Login;