import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { DUMMY_SCHOOLS } from '../data'

const Dashboard = () => {
  const [schools, setSchool] = useState(DUMMY_SCHOOLS)
  return (
    <section className="dashboard">
      {
        schools.length ? <div className="container dashboard__container">
          {
            schools.map(school => {
              return <article key={school.id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={school.thumbnail} alt="" />
                  </div>
                  <h5>{school.name}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/schools/${school.id}`} className='btn sm'>View</Link>
                  <Link to={`/schools/${school.id}/edit`} className='btn sm primary'>Edit</Link>
                  <Link to={`/schools/${school.id}/delete`} className='btn sm danger'>Delete</Link>
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