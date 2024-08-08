import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
    useEffect(() => {
        document.body.classList.add('register-page');
        return () => {
            document.body.classList.remove('register-page');
        }
    }, []);

    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        skill: '',
        password: '',
        confirmpassword: ''
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', data);
            alert(response.data); // Handle success response
            navigate('/login'); // Navigate to login page on successful registration
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data === "User already registered") {
                    alert('User already registered, redirecting to login page.');
                    navigate('/login'); // Navigate to login page if user is already registered
                } else {
                    alert('Error: ' + error.response.data); // Handle other error responses
                }
            } else {
                console.error(error);
                alert('Server error, please try again later.'); // Handle server errors
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={submitHandler}>
                <h1 className='reg'>Register</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Full Name' name='name' onChange={changeHandler} required />
                    <IoPerson className='icon' />
                </div>
                <div className='input-box'>
                    <input type='email' placeholder='Email' name='email' onChange={changeHandler} required />
                    <MdEmail className='icon' />
                </div>
                <div className='input-box'>
                    <input type='number' placeholder='Mobile' name='mobile' onChange={changeHandler} required />
                    <FaPhoneAlt className='icon' />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Skills' name='skill' onChange={changeHandler} required />
                    <GiSkills className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' name='password' onChange={changeHandler} required />
                    <RiLockPasswordLine className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Confirm Password' name='confirmpassword' onChange={changeHandler} required />
                    <RiLockPasswordLine className='icon' />
                </div>
                <div className='remember-forgot'>
                    <label className='reg'><input type='checkbox' required /> I accept the <a href='#' className='reg'>terms of use</a> & <a href='#' className='reg'>privacy policy</a></label>
                    <label className='reg'>Already have an account <Link to="/login"><span className='r-login'>Login</span></Link></label>
                    
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;
