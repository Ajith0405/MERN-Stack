import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { storeUserData } from '../Services/Storage'
import './login.css'
import NavBar from './NavBar'
import loginpng from '../assets/images/login.png'
import {BASE_URL} from '../Services/Api';
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passShowHide, setpassShowHide] = useState(true);



    const handlePassHideShow = () => {
        setpassShowHide(!passShowHide);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, { email, password })
            .then(result => {
                console.log(result)
                if (result.data._id) {

                    storeUserData(result.data._id)
                    //    navigate('/profile')
                    navigate(`/profile/${result.data._id}`)
                } else {
                    setError(result.data);
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <NavBar />
            <div className='row container mx-auto'>
                <div className='col-6 col-lg-6 col-md-6 col-sm-6 d-none d-md-block'>
                    <div className='mt-4' style={{ height: '85vh', backgroundColor: 'lightgreen' }}>
                        <div className='pt-2'>
                            <h1 className='text-center' style={{ fontSize: '48px', fontWeight: '600', color: 'black' }}>Login Now!</h1>
                            <h2 className='text-center' style={{ fontSize: '38px' }}>Step into a world of possibilities with your login</h2>
                        </div>
                        <div className='text-center'>
                            <img src={loginpng} width={'400px'} alt='login' />
                        </div>

                    </div>
                </div>
                <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                    <div className='card p-3' style={{ maxWidth:'400px',marginTop:'150px' }}>
                        <h2 className='text-center'>Login</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className='input_box'>
                                    <input type={passShowHide ? "password" : "text"} className="form-control pass_box" id="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                                    <span onClick={handlePassHideShow}><i className="fa-regular fa-eye eye_btn"></i></span>
                                </div>

                            </div>
                            {
                                error ? (
                                    <div className='text-center mb-2'>
                                        <span className='text-danger' style={{ fontWeight: '600' }}>{error}</span>
                                    </div>
                                ) : null
                            }
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary text-center w-75">Login</button>
                                <p className='mt-2'>Don't have an account? please <Link to='/'>Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login