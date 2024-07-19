import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { Link, useNavigate } from 'react-router-dom'
const DeleteSchool = () => {

  const navigate = useNavigate()

  const {currentUser } = useContext(UserContext)
  const token = currentUser?.id

  // redirect user to login page if not logged in
  useEffect(() => {
    if(!token) { 
      navigate('/login')
    }
  })
  
  return (
    <Link className='btn sm danger'>Delete</Link>
  )
}

export default DeleteSchool