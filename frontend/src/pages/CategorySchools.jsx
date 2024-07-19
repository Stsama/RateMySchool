import React, { useState, useEffect } from 'react'
import SchoolItem from '../components/SchoolItem'
import Loader from '../components/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CategorySchools = () => {
  const [schools, setSchools] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { category } = useParams()

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/schools/categories/${category}`)
        setSchools(response?.data)
      } catch (error) {
        console.error(error)
      }

      setIsLoading(false)
    }
    fetchSchools();
  }, [category]);

  if (isLoading) {
    return <Loader />
  }



  return (
    <section className='posts'>
      {schools.length > 0 ? <div className="container posts__container">
        {
          schools.map(({ _id, name, address, category, location, phoneNumber, description, thumbnail, owner, createdAt }) =>
            <SchoolItem key={_id} schoolId={_id} name={name} category={category} address={address} location={location} phoneNumber={phoneNumber}
              description={description} thumbnail={thumbnail} owner={owner} createdAt={createdAt} />)
        }
      </div> : <h2 className='center'> No Schools Found </h2>}
    </section>
  )
}

export default CategorySchools