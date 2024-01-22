import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import signupImg from '../assets/images/siginup.png'
import {BASE_URL} from '../Services/Api';

const SignUp = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");

    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,}$/;
    const [passError, setPassError] = useState("");

    const [passShowHide, setpassShowHide] = useState(true);
    const [conpasShowHide, setConPasShowHide] = useState(true)

    const [pswdErr, setPswdErr] = useState("");
    const [pswdErrClr, setPswdErrClr] = useState("");

    const [emailErr, setEmailErr] = useState("");
    

    const[onBlurPass,setOnBlurPass]= useState(false)

    const handlePassHideShow = () => {
        setpassShowHide(!passShowHide);
    };
    const handleConPassHideShow = () => {
        setConPasShowHide(!conpasShowHide);
    }

    const handleOnblurPassCon =()=>{
        setOnBlurPass(false);
        
    }
    const handleOnfocusPassCon =()=>{
        setOnBlurPass(true)
    }
    const handleOnfocusemail =()=>{
        setEmailErr("");
    }
    
    useEffect(() => {
        if (password && conPassword) {
            if (password === conPassword) {
                setPswdErr("Password Matched")
            } else {
                setPswdErr("Password Mis-match")
            }
        }
        if (pswdErr.length > 16) {
            setPswdErrClr("red")

        } else {
            setPswdErrClr("green")
        }
        if (password.length > 0 && !password_pattern.test(password)) {
            setPassError(`-At least 8 character, 1 uppercase,
            -1 lowercase, 1 special character`)
        } else {
            setPassError(null);
        }


    }, [pswdErr, password, conPassword, passError])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/register`, { name, email, password })
            .then(result => {
                console.log(result);
                // console.log(typeof(result.data));
                if(typeof(result.data) == "string"){
                    setEmailErr(result.data);
                    
                }else{
                alert("Registered Successfully..")
                setEmailErr("");
                setInterval(navigate('/login'), 2000)
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
                            <h1 className='text-center' style={{fontSize:'48px',fontWeight:'600',color:'black'}}>Register Now!</h1>
                            <h2 className='text-center' style={{fontSize:'38px'}}>Join us and unlock a world of possibilities. </h2>
                        </div>
                        <div className='text-center'>
                         <img src={signupImg} width={'500px'} alt='register'/>
                        </div>
                       
                    </div>
                </div>
                <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                    <div className='card p-3 mt-5 my-auto mx-auto' style={{maxWidth:'400px'}} >
                        <h2 className="text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} onFocus={handleOnfocusemail} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label ">Password</label>
                                <div className='input_box'>
                                    <input type={passShowHide ? "password" : "text"} className="form-control pass_box" id="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} onBlur={handleOnblurPassCon} onFocus={handleOnfocusPassCon} required />
                                    <span onClick={handlePassHideShow}><i className="fa-regular fa-eye eye_btn"></i></span>
                                </div>
                                {
                                    passError ? (<p style={{ color: 'red', whiteSpace: 'pre-line' }}>{passError}</p>) : null
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="conPassword" className="form-label">Confirm Password</label>
                                <div className='input_box'>
                                    <input type={conpasShowHide ? "password" : "text"} className="form-control pass_box" id="conPassword" placeholder='Confirm Password' onChange={(e) => setConPassword(e.target.value)} onBlur={handleOnblurPassCon} onFocus={handleOnfocusPassCon} required />
                                    <span onClick={handleConPassHideShow}><i className="fa-regular fa-eye eye_btn"></i></span>
                                </div>
                                <p>{(conPassword && onBlurPass) ? (
                                    <span style={{ color: `${pswdErrClr}`, fontWeight: '600' }}>{pswdErr}</span>
                                ) : null}</p>
                            </div>
                            <div className='text-center text-danger'>
                                    {
                                        emailErr?(<h6>{emailErr}</h6>):null
                                    }
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary text-center w-75">Register</button>
                            </div>
                        </form>
                        <div className="text-center d-flex justify-content-center">
                            <p className="mt-2 me-1">Already Have an Account? Please</p>
                            <Link to="/login" className='mt-2'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp