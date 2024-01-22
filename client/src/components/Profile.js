import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getUserData, removeUserData } from '../Services/Storage'
import { isAunthenticate } from '../Services/auth'
import { Navigate } from 'react-router-dom'
import NavBar from './NavBar'
import {BASE_URL} from '../Services/Api';

import profilePic from '../assets/images/profile-image.png'

const Profile = () => {

  // const {id} = useParams();
  const id = getUserData();
  const [userData, setUserData] = useState([]);

  const[name,setName]= useState("");
  const[email,setEmail]= useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState();
  const [highEdu, setHighEdu] = useState();
  
  const [formDisable, setFormDisable] = useState(true);

  useEffect(() => {
    console.log(id);
    axios.get(`${BASE_URL}/getUser/` + id, {})
      .then(res => {
        console.log(res);
        setName(res.data.name);
        setEmail(res.data.email);
        setUserData(res.data);
        setAge(res.data.age);
        setDob(res.data.dob);
        setGender(res.data.gender);
        setMobile(res.data.mobile);
        setHighEdu(res.data.highEdu);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id])

  const handleLogout = () => {
    removeUserData();
    window.location.reload();

  }

  const handleDeteleUser = ()=>{
      axios.delete('http://localhost:3001/deleteUser/'+id)
      .then(res=>{
        console.log(res)
        removeUserData();
        window.location.reload();
      })
      .catch(err=>{
        console.log(err)
        console.log(id)
      })
  }

  const handleSave = (e) => {
    e.preventDefault();
    axios.put(`${BASE_URL}/updateUser/`+id,{age,dob,gender,mobile,highEdu})
    .then(res=>{
        console.log(res)
        alert("Updated Successfully..")
        
        })
    .catch(err=>console.log(err))
    setFormDisable(true);
  }

  const handleEdit = () => {
    setFormDisable(false);
  }

  if (!isAunthenticate()) {

    return <Navigate to='/login' />

  }

  return (
    <div>
      <NavBar/>
      <div className=' mt-3 container'>
        <div className='row '>
          <div className='col-12 col-lg-5 col-md-5 bg-dark px-3' style={{ backgroundColor: 'gray', height: '85vh',margin:'0px 0px',borderRadius:'20px 20px 20px 20px'}}>
            <div className='text-center'>
                <img src={profilePic} alt='profile' className='p-2' width={'200px'}/>
            </div>
            <h5 className='text-light text-center'>Welcome Back!</h5>
            <h5 className='text-light text-center'> Hi {userData.name}</h5>
            <div className='text-end'>
              <button type='button' className='btn btn-danger' onClick={handleDeteleUser}>Delete Account</button>
            </div>
            <div className=''>
              <h6 className='text-light ps-3'>Personal informations </h6>
              <hr style={{color:'gray'}}/>
            </div>
            <div className='row'>
                  <div className='col-6'>
                    <p style={{color:'gray'}}>Name : {name}</p>
                    <p style={{color:'gray'}}>Email : {email}</p>
                    <p style={{color:'gray'}}>Age : {age}</p>
                    <p style={{color:'gray'}}>DOB : {dob}</p>
                  </div>
                  <div className='col-6'>
                    <p style={{color:'gray'}}>Mobile : {mobile}</p>
                    <p style={{color:'gray'}}>Gender : {gender}</p>
                    <p style={{color:'gray'}}>Highest Qualification : {highEdu}</p>
                    
                  </div>
            </div>
          </div>
          <div className='col-12 col-lg-5 col-md-5 '>
              <div className='text-center mt-2'>
                <hr/>
                <h3 style={{fontSize:'30px', fontWeight:'600'}}>Update Personal Informations</h3>
                <hr />
              </div>
            <div className='w-75 mx-auto px-2'>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="text" className="form-control" id="age" placeholder='Enter Age' value={age} disabled={formDisable} onChange={(e) => { setAge(e.target.value) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" id="dob" value={dob} disabled={formDisable} onChange={(e) => { setDob(e.target.value) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor='gender' className='form-label'>Gender</label>
                  <div className='d-flex justify-content-around'>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" disabled={formDisable}  name="gender" id="Male" value="Male" onChange={(e) => { setGender(e.target.value) }} />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" disabled={formDisable} name="gender" id="Female" value="Female" onChange={(e) => { setGender(e.target.value) }} />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" disabled={formDisable} name="gender" id="Others" value="Others" onChange={(e) => { setGender(e.target.value) }} />
                      <label className="form-check-label" htmlFor="Others">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile </label>
                  <input type="tel" className="form-control" id="mobile" value={mobile} disabled={formDisable} placeholder='Enter Mobile No' onChange={(e) => { setMobile(e.target.value) }} />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="highEdu" className="form-label">Highest Level of Education</label>
                  <select required className="form-select" value={highEdu} id='highEdu' disabled={formDisable} onChange={e => setHighEdu(e.target.value)}>
                    <option value='' >--Select--</option>
                    <option value="PG">PG</option>
                    <option value='UG' >UG</option>
                    <option value='HSC' >HSC</option>
                    <option value='SSLC'>SSLC</option>
                  </select>
                </div>
                <div className='d-flex justify-content-around'>
                  <button type='button' className='btn btn-warning' onClick={handleEdit}>Edit</button>
                  <button type='submit' className='btn btn-success'>Save & Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile