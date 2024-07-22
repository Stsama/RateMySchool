import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import loader from '../images/loader.gif'

const DeleteSchool = ({schoolId: id}) => {

  const navigate = useNavigate()

  const {currentUser } = useContext(UserContext)
  const token = currentUser?.token
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  // redirect user to login page if not logged in
  useEffect(() => {
    if(!token) { 
      navigate('/login')
    }
  })

  const removePost = async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/schools/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status === 200) {
        if (location.pathname === '/dahsboard') {
          navigate(0)
        } else {
          navigate('/')
        }
      }
      setIsLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <img src={loader} alt="Loading..." />
  }
  
  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeleteSchool