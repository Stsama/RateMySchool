import React, { useContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import SchoolOwner from '../components/SchoolOwner'
import { UserContext } from '../context/userContext'
import DeleteSchool from './DeleteSchool'
import axios from 'axios'
import { IoLocationSharp } from "react-icons/io5";
import Loader from '../components/Loader'

const SingleSchool = () => {

  const { id } = useParams()
  const [school, setSchool] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
 const {currentUser} = useContext(UserContext)
  useEffect(() => {
    const getSchool = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/schools/${id}`);
        // const response = await axios.get(`http://localhost:5000/api/v1/schools/${ id }`);
        setSchool(response?.data);
      } catch (error) {


      }
      setIsLoading(false);
    }
    getSchool();
  }, [])


 if (isLoading) {
  return <Loader/>
 }

  return (
    <section className="post-detail">
        {error && <p className="error">{error}</p> } 
        {school && <div className="container post-detail__container">
            <div className="post-detail__header">
                <SchoolOwner ownerID={school.owner} createdAt={school.createdAt}/>
                {currentUser?.id === school?.owner && <div className="post-detail__buttons">
                    <Link to={`/schools/${school.id}/edit`} className="btn sm primary">Edit</Link>
                    <DeleteSchool schoolId={id}/>
                </div>}
            </div>
            <h1 className='school_name'>{school.name}</h1>
            <p className='location__section'> <span className="location__icone"> <IoLocationSharp /></span> <span className="country">{school.location}</span> &nbsp; <span className="location">{school.address}</span> </p>
            <div className="post-detail__thumbnail">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/${school.thumbnail}`} alt="School Name" />
            </div>
            <p dangerouslySetInnerHTML={{__html: school.description}}></p>
        </div>}
    </section>
  )
}

export default SingleSchool