import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const SchoolOwner = ({owner, createdAt}) => {
  const [founder, setFounder] = useState({});

  useEffect(() => {
    const getFounder = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${owner}`)
        setFounder(response.data);
      } catch (error) {
      }
    }
    getFounder();
  }, []);



  return (
    <Link to={`/schools/users/${founder.id}`} className='post__author'>
      <div className="post__author-avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/${founder.profilePicture}`} alt={founder.username} />
      </div>
      <div className="post__author-details">
        <h5>By: {founder.username}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>
      </div>
    </Link>
  )
}

export default SchoolOwner