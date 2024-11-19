import React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Heading from './components/Heading/Heading';
import Features from './components/Features/Features';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Registeration/Login';
import Register from './components/Registeration/Register';
import UserProfile from './components/Registeration/userProfile/userProfile';
import ContactForm from './components/contact/contactForm';
import ProfileConfig from './components/Registeration/Additional Information/AddInfo';
// import Chakra from './tests/chakra';



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
          <Route path='/profileConfig' element={<ProfileConfig />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/contact' element={<ContactForm />} />
          {/* <Route path='/test1' element={<Chakra />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
