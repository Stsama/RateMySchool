import React, { useState, useEffect } from 'react'
import SchoolItem from '../components/SchoolItem'
import Loader from '../components/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const AuthorSchools = () => {
  const [schools, setSchools] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  // const { currentUser } = useContext(UserContext)
  // const token = currentUser?.token

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/schools/users/${id}`)
        setSchools(response?.data)
      } catch (error) {
        console.error(id, 'error', "test")
      }

      setIsLoading(false)
    }
    fetchSchools();
  }, [id]);

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

export default AuthorSchools