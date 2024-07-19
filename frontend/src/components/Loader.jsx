import React from 'react'
import loading from '../images/loader.gif'

const Loader = () => {
  return (
    <div className="loader">
      <img src={loading} alt="Loading..." />
    </div>
  )
}

export default Loader