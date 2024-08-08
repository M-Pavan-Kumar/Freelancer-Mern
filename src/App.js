import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

import Register from './Register';
import Dashboard from './Dashboard';
import Myprofile from './Myprofile';
import Indprofile from './Indprofile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/myprofile" element={<Myprofile/>}/>
          <Route path="/indprofile/:name/:email/:skill/:mobile/:_id" element={<Indprofile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
