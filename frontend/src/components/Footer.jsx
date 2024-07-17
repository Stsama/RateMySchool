import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li> <Link to='/schools/categories/Middle_School'>Middle School</Link> </li>
        <li> <Link to='/schools/categories/Elementary_School'>Elementary School</Link> </li>
        <li> <Link to='/schools/categories/High_School'>High School</Link> </li>
        <li> <Link to='/schools/categories/primary_School'>Primary School</Link> </li>
        <li> <Link to='/schools/categories/uncategorized'>Uncategorized</Link> </li>
      </ul>
      <div className="footer__copyright">
        <small>All Right Reserved &copy; Copyright, EZOULA Albert@2024</small>
      </div>
    </footer>
  )
}

export default Footer