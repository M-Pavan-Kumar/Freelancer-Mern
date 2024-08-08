
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav1.css';

const Nav1 = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    return (
        <nav className="navbar">
            <button className="navbar-button" onClick={handleBackClick}>
                Back to Dashboard
            </button>
        </nav>
    );
};

export default Nav1;
