import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create and use this CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        
        <nav className="home-nav">
          <ul>
          <li><h1>Freelancer Hub</h1></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </header>
      <section className="home-main">
        <h2>Welcome to Freelancer Hub</h2>
        <p>Your one-stop solution to connect with top freelancers from around the world. Join us to explore amazing opportunities and grow your business or career.</p>
        <div className="home-buttons">
          <Link to="/register" className="btn">Get Started</Link>
          <Link to="/login" className="btn">Login</Link>
        </div>
      </section>
      <footer className="home-footer">
        <p>&copy; 2024 Freelancer Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
