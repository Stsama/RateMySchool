import React from 'react'
import { Link } from 'react-router-dom'
import SchoolOwner from './SchoolOwner'



const SchoolItem = ({schoolId, name, address, location, phoneNumber,  category, thumbnail, description, AuthorID}) => {
  const shortDescription = description.length > 50 ? description.substr(0, 50) + '...' : description;
  return (
    <article className="post">
        <div className="post__thumbnail">
            <img src={thumbnail} alt={name} />
        </div>
        <div className="post__content">
            <Link to={`/schools/${schoolId}`} >
                <h3>{name}</h3>
            </Link>
            <p>{shortDescription}</p>
            <div className="post__footer">
              <SchoolOwner/>
              <Link to={`/schools/categories/${category}`} className='btn category'> {category} </Link>
            </div>
        </div>
    </article>
  )
}

export default SchoolItem