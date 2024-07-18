import React, { useState } from 'react'
import {DUMMY_SCHOOLS} from '../data'
import SchoolItem from '../components/SchoolItem'

const AuthorSchools = () => {
  const [schools, setSchools] = useState(DUMMY_SCHOOLS);

  return (
    <section className='author__posts'>
        {schools.length > 0 ? <div className="container posts__container">
            {
                schools.map(({id, name, address, category, location, phoneNumber, description, thumbnail, owner}) => 
                <SchoolItem key={id} schoolId={id} name={name} category={category} address={address} location={location} phoneNumber={phoneNumber} 
                description={description} thumbnail={thumbnail} owner={owner} />)
            }
        </div> : <h2 className='center'> No Schools Found </h2>}
    </section>
  )
}

export default AuthorSchools