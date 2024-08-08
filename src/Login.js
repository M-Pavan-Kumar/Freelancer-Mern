import React, { useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  useEffect(() => {
    document.body.classList.add('login-page1');
    return () => {
      document.body.classList.remove('login-page1');
    };
  }, []);

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(data);
    try {
      const res = await axios.post('http://localhost:5000/login', data);
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === 'User not exist') {
          alert('User not registered, redirecting to register page.');
          navigate('/register'); // Redirect to register page if user is not registered
        } else {
          alert('Error: ' + error.response.data); // Handle other error responses
        }
      } else {
        console.error(error);
        alert('Server error, please try again later.'); // Handle server errors
      }
    }
  };

  if (auth) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='wrapper1'>
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className='input-box1'>
          <input
            type='text'
            id='email'
            name='email'
            placeholder='Email'
            onChange={changeHandler}
            required
            autoComplete='email'
          />
          <MdEmail className='icon' />
        </div>
        <div className='input-box1'>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={changeHandler}
            required
            autoComplete='current-password'
          />
          <RiLockPasswordLine className='icon' />
        </div>
        <div className='remember-forgot1'>
          <label>
            <input type='checkbox' id='remember' name='remember' autoComplete='off' required />
            Remember me
          </label>
          <a href='#'>Forgot Password</a>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link1'>
          <p>
            Don't have an account? <a href='/register'>Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
