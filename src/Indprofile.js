import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav1 from './Nav1';
import axios from 'axios';

const Indprofile = () => {
    const { name, email, skill, mobile,_id } = useParams();
    const [rating, setRating] = useState('null');
    const [taskprovider, setTaskprovider] = useState('null');

    const handleRatingChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 1 && Number(value) <= 5)) {
            setRating(value);
        }
    };

    const handleTaskProviderChange = (e) => {
        setTaskprovider(e.target.value);
    };

    const submitHandler = (e) => {
        
        e.preventDefault(); // Prevents page reload
        axios.get("http://localhost:5000/myprofile", {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then(res => setTaskprovider(res.data.name));
        const review = {
            taskprovider,
            taskworker:_id,
            rating,
        };

        axios.post("http://localhost:5000/addreview", review, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then(res => alert(res.data))
        .catch(err => alert('Error: ' + err.message));
    };

    return (
        <div>
            <Nav1 />
            <div className="dashboard">
                <div className="profile-card">
                    <img className="profile-avatar" src={"https://tse1.mm.bing.net/th?id=OIP.wHmdLYdYLIK6dd3RC_NnNgHaHa&pid=Api&P=0&h=180"} alt="Avatar" />
                    <h2 className="profile-name">{name}</h2>
                    <p className="profile-email">{email}</p>
                    <p className="profile-bio"></p>
                    <p className="profile-skills">
                        <b>Skills:</b> 
                        <span className='skill'>{skill || 'N/A'}</span>
                    </p>
                    <p className="profile-bio">{mobile}</p>
                </div>
            </div>
            <div className='review'>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Ratings</h2>
                        <h3>Enter Your Rating</h3>
                        <input 
                            min="1" 
                            max="5" 
                            step="1" 
                            type='number' 
                            placeholder='Enter your rating out of 5' 
                            className='input' 
                            value={rating} 
                            onChange={handleRatingChange}
                        />
                        
                        <br />
                        <button onClick={submitHandler} className='rev-button'>Add rating</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Indprofile;
