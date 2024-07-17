import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/service-1.jpg'

const SchoolOwner = () => {
  return (
    <Link to={`/schools/author/ssss`} className='post__author'>
      <div className="post__author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="post__author-details">
        <h5>By: Albert EZOULA</h5>
        <small>Just Now</small>
      </div>
    </Link>
  )
}

export default SchoolOwner