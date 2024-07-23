import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li> <Link to='/schools/categories/University'>University</Link> </li>
        <li> <Link to='/schools/categories/Secondary'>Secondary School</Link> </li>
        <li> <Link to='/schools/categories/High School'>High School</Link> </li>
        <li> <Link to='/schools/categories/Primary'>Primary School</Link> </li>
        <li> <Link to='/schools/categories/Uncategorized'>Uncategorized</Link> </li>
      </ul>
      <div className="footer__copyright">
        <small>All Right Reserved &copy; Copyright, EZOULA Albert@2024</small>
      </div>
    </footer>
  )
}

export default Footer