import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li> <Link to='/schools'>All Schools</Link> </li>
        <li> <Link to='/create'>Add School</Link> </li>
        <li> <Link to='/search'>Search</Link> </li>
        <li> <Link to='/login'>Login</Link> </li>
        <li> <Link to='/register'>Register</Link> </li>
      </ul>
      <div className="footer__copyright">
        <small>All Right Reserved &copy; Copyright, EZOULA Albert@2024</small>
      </div>
    </footer>
  )
}

export default Footer