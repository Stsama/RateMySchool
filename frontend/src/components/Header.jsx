import React from 'react'
import { Link } from 'react-router-dom'
import service from '../images/service-1.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


const Header = () => {
  return (
    <nav>
        <div className="container nav__container">
            {/* <Link to="/" className="nav__logo">RateMySchool.</Link> */}
            <Link to="/" className="nav__logo">
                <img src={service} alt="RateMySchool" />
            </Link>
            <ul className='nav__menu'>
                <li><Link to="/profile">Albert Ezoula</Link></li>
                <li><Link to="/create">Add School</Link></li>
                <li><Link to="/schools">Schools</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
            <button className="nav__toggle-btn">
                <AiOutlineClose />
            </button>
        </div>
    </nav>
  )
}

export default Header