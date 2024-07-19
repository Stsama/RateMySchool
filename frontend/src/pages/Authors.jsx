import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'



const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`)
        const data = response?.data
        setAuthors(data)
      } catch (error) {
        // console.error(error)
      }
      setLoading(false)
    }
    fetchAuthors()
  }, [])
  if (loading) {
    <Loader/>
  }

  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors__container">
        {
          authors.map(({_id: id, profilePicture, username}) => (
            <Link to={`/schools/users/${id}`} key={id} className='author'>
              <div className="author__avatar">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/${profilePicture}`} alt={username} />
              </div>
              <div className="author__info">
                <h4>{username}</h4>
              </div>
            </Link>
          ))
        }
      </div>  : <h2 className='center'> No Authors Found </h2>}
    </section>
  )
}

export default Authors