import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import service from '../images/service-1.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


const Header = () => {
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)

    const closeNavHandler = () => {
        if(window.innerWidth < 800) {
            setIsNavShowing(false)
        } else {
            setIsNavShowing(true)
        }
    }
  return (
    <nav>
        <div className="container nav__container">
            {/* <Link to="/" className="nav__logo">RateMySchool.</Link> */}
            <Link to="/" className="nav__logo" onClick={closeNavHandler}>
                <img src={service} alt="RateMySchool" />
            </Link>
            {isNavShowing && <ul className='nav__menu'>
                <li><Link to="/profile/sesese" onClick={closeNavHandler}>Albert Ezoula</Link></li>
                <li><Link to="/create" onClick={closeNavHandler}>Add School</Link></li>
                <li><Link to="/schools" onClick={closeNavHandler}>Schools</Link></li>
                <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
            </ul>}
            <button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
                {isNavShowing ? <AiOutlineClose /> : <FaBars />}
                
            </button>
        </div>
    </nav>
  )
}

export default Header