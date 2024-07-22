import React from 'react'
import { Link } from 'react-router-dom'
import SchoolOwner from './SchoolOwner'
import { IoLocationSharp } from "react-icons/io5";



const SchoolItem = ({schoolId, name, address, location, phoneNumber,  category, thumbnail, description, owner, createdAt}) => {
  const shortDescription = description.length > 100 ? description.substr(0, 100) + '...' : description;
  return (
    <article className="post">
        <div className="post__thumbnail">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/${thumbnail}`} alt="" />
        </div>
        <div className="post__content">
            <Link to={`/schools/${schoolId}`} >
                <h3>{name}</h3>
            </Link>
            <p className='location__section'> <span className="location__icone"> <IoLocationSharp /></span> <span className="country">{location}</span> &nbsp; <span className="location">{address}</span> </p>
            <p dangerouslySetInnerHTML={{__html: shortDescription}}/>
            <div className="post__footer">
              <SchoolOwner ownerID={owner} createdAt={createdAt}/>
              <Link to={`/schools/categories/${category}`} className='btn category'> {category} </Link>
            </div>
        </div>
    </article>
  )
}

export default SchoolItem