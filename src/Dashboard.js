import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navabardesign from './Navabardesign';
import "./Navbar.css"


const Dashboard = () => {
    const profile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'A passionate developer who loves coding and exploring new technologies.',
        avatar: 'https://via.placeholder.com/150' 
      };
      const [data,setData]=useState([]);
      useEffect(()=>{
        axios.get("http://localhost:5000/allprofiles",{
        headers:{
        'x-auth-token':localStorage.getItem('token')
        }
        }).then(res=>setData(res.data))
      },[])
      if(!localStorage.getItem('token')){
        return window.location.replace("/login")
      }
      
  return (
    <div>
      <Navabardesign/>
    
      {data.length>=1? data.map(profile=>
        <div className="dashboard">
        <div className="profile-card">
        <img className="profile-avatar" src={"https://tse1.mm.bing.net/th?id=OIP.wHmdLYdYLIK6dd3RC_NnNgHaHa&pid=Api&P=0&h=180"} alt="Avatar" />
        <h2 className="profile-name">{profile.name}</h2>
        <p className="profile-email">{profile.email}</p>
        <p className="profile-bio">{profile.bio}</p>
        <p className="profile-skills">
        <b>Skills:</b> 
        {profile.skill.split(',').map((skill, index) => (
          <span key={index} className="skill-item">{skill.trim()}{index < profile.skill.split(',').length - 1 ? ', ' : ''}</span>
        ))}
      </p>
        <p className="profile-bio">{profile.mobile}</p>
       <Link to={`/indprofile/${profile.name}/${profile.email}/${profile.skill}/${profile.mobile}/${profile._id}`}><button className='p-button'>View Profile</button></Link> 
        
      </div>
      </div> ):null}
     
    
  
    
    </div>
  )
}

export default Dashboard