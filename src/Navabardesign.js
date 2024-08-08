import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navabardesign = () => {
  return (
    <>
    <div className='nav-bar'>
        <div className='text'>
        <Link to='/'><h5 className='home'>Home</h5></Link>
        <h4 className='my-profile'>Developers Profiles</h4>
        <Link to='/myprofile'><h5 className='my-profile'>My Profile</h5></Link>
        <Link to="/"><button className='button' onClick={()=>localStorage.removeItem('token')}><h5>Logout</h5></button></Link>
        </div>
            
        
    </div>
  </>
  )
}

export default Navabardesign