import React, { useEffect, useState } from 'react';
import './Myprofile.css';
import Nav1 from './Nav1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Myprofile = ({ profile = {} }) => { 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [review,setReviev]=useState([]); 
    const navigate=useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            setError('No Data found. Please log in.');
            alert("Please Login")
            navigate("/login")
            return;
        }

        axios.get("http://localhost:5000/myprofile", {
            headers: { 'x-auth-token': token }
        })
        .then(res => {
            setData(res.data);
            
        })
        .catch(err => {
            console.error('Request failed', err);
            setError('Failed to fetch profile. Please try again.');
        });
        axios.get("http://localhost:5000/myreviews", {
            headers: { 'x-auth-token': token }
        })
        .then(res => {
            setReviev(res.data);
            
        })
        .catch(err => {
            console.error('Request failed', err);
            setError('Failed to fetch profile. Please try again.');
        });
    }, []);

    // Destructure with default values to avoid errors if profile is not fully defined
    const {
        avatar = 'https://tse1.mm.bing.net/th?id=OIP.wHmdLYdYLIK6dd3RC_NnNgHaHa&pid=Api&P=0&h=180',
        name = 'N/A',
        email = 'N/A',
        bio = 'No bio available',
        skills = '',
        mobile = 'N/A'
    } = profile;

    return (
        <div>
            
            <Nav1 />
            
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                data && (
                    <div className="profile-card">
                        <img className="profile-avatar" src={avatar} alt="Avatar" />
                        <h2 className="profile-name">{data.name}</h2>
                        <p className="profile-email">{data.email}</p>
                        
                        <p className="profile-skills">
                            <b>Skills:</b> 
                            {data.skill ? data.skill.split(',').map((skill, index) => (
                                <span key={index} className="skill-item">
                                    {skill.trim()}{index < data.skill.split(',').length - 1 ? ', ' : ''}
                                </span>
                            )) : 'N/A'}
                        </p>
                        <p className="profile-mobile">{data.mobile}</p>
                        {review.length > 0 ? (
    review.map((rev, index) => (
        <div key={index} className="rating">
            <div className="rating-taskprovider">
                <b>Task Provider:</b>
                <span className="rating-value">{rev.taskprovider}</span>
            </div>
            <div className="rating-rating">
                <b>Rating:</b>
                <span className="rating-value">{rev.rating}/5</span>
            </div>
        </div>
    ))
) : (
    <div className="no-reviews">No reviews available</div>
)}
                    </div>
                )
            )}
                
            
        </div>
    );
};

export default Myprofile;
