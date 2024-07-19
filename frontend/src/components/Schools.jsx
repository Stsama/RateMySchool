import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SchoolItem from './SchoolItem'
import Loader from './Loader'

const Schools = () => {
    const [schools, setSchools] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    
    useEffect(() => {
      const fetchSchools = async () => {
        setIsLoading(true)
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/schools`)
          setSchools(response?.data)
        } catch (error) {
            
        }

        setIsLoading(false)
      }
      fetchSchools();
    }, []);

  if (isLoading) {
    return <Loader />
  }



  return (
    <section className='posts'>
        {schools.length > 0 ? <div className="container posts__container">
            {
                schools.map(({_id: id, name, address, category, location, phoneNumber, description, thumbnail, owner, createdAt}) => 
                <SchoolItem key={id} schoolId={id} name={name} category={category} address={address} location={location} phoneNumber={phoneNumber} 
                description={description} thumbnail={thumbnail} owner={owner} createdAt={createdAt} />)
            }
        </div> : <h2 className='center'> No Schools Found </h2>}
    </section>
  )
}

export default Schools