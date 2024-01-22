import React from 'react'
import { Link } from 'react-router-dom'
import { isAunthenticate } from '../Services/auth'
import { removeUserData } from '../Services/Storage'
import logo  from '../assets/images/logo.png'

const NavBar = () => {

    const handleLogout =()=>{
        removeUserData();
        window.location.reload();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src='https://www.mangoitsolutions.com/wp-content/uploads/2022/01/becomeamernstackdeveloper-mobile-300x279.png' alt='logo' width={'50px'}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav text-center">
                            {
                                !isAunthenticate() ? (
                                    <li className="nav-item me-2">
                                        <Link className='btn btn-dark' to='/'>Register</Link>
                                    </li>
                                ) : null
                            }
                            {
                                !isAunthenticate() ? (
                                    <li className="nav-item me-2">
                                        <Link className='btn btn-dark' to='/login'>Login</Link>
                                    </li>
                                ) : null
                            }

                            {
                                isAunthenticate() ? (
                                    <li className="nav-item">
                                        <button type='button' onClick={handleLogout} className='btn btn-danger'> Logout</button>
                                    </li>
                                ) : null
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar