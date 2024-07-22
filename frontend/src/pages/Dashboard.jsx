import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import DeleteSchool from './DeleteSchool'

const Dashboard = () => {

  const { id } = useParams()
  const [schools, setSchool] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  // redirect user to login page if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  })

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/schools/users/${id}`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
        setSchool(response?.data)
      } catch (error) {
        // console.error(error)
      }
      setIsLoading(false)
    }
    fetchSchools();
  }, []);


  if (isLoading) {
    return <Loader />
  }


  return (
    <section className="dashboard">
      {
        schools.length ? <div className="container dashboard__container">
          {
            schools.map(school => {
              return <article key={school._id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/${school.thumbnail}`} alt="" />
                  </div>
                  <h5>{school.name}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/schools/${school._id}`} className='btn sm'>View</Link>
                  <Link to={`/schools/${school._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeleteSchool schoolID={school._id}/>
                </div>
              </article>
            })
          }
        </div> : <h2 className='center'>You have no school</h2>
      }
    </section>
  )
}

export default Dashboard