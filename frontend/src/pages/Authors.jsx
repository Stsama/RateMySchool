import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import  Avatar1  from '../images/avatar-1.jpg';
import  Avatar2  from '../images/avatar-2.JPG';
import  Avatar3  from '../images/avatar-3.jpg';


const AuthorsData = [
  {id: 1, avatar: Avatar1, name: 'John Doe', schools: 1},
  {id: 2, avatar: Avatar2, name: 'Jane Doe', schools: 2},
  {id: 3, avatar: Avatar3, name: 'James Doe', schools: 3},
  {id: 4, avatar: Avatar1, name: 'Joelle Doe', schools: 1},
  {id: 5, avatar: Avatar2, name: 'Jannelle Doe', schools: 2},
]
const Authors = () => {
  const [authors, setAuthors] = useState(AuthorsData)
  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors__container">
        {
          authors.map(({id, avatar, name, schools}) => (
            <Link to={`/authors/users/${id}`} key={id} className='author'>
              <div className="author__avatar">
                <img src={avatar} alt={name} />
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{schools} Schools</p>
              </div>
            </Link>
          ))
        }
      </div>  : <h2 className='center'> No Authors Found </h2>}
    </section>
  )
}

export default Authors