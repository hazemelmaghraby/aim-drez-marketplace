import React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Heading from './components/Heading/Heading';
import Features from './components/Features/Features';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Registeration/Login';
import Register from './components/Registeration/Register';



const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Heading />
              <Features />
            </>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
