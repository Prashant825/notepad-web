import React from 'react';
import './App.css';
import Register from './Userregister/Register';
import Login from './Userregister/Login';
import UpdateUsername from './Userregister/UpdateUsername';
import Home from './Userregister/Home';
import Dashboard from './Userregister/Dashboard';
import Createdocx from './Userregister/Createdocx';
import ForgotPassword from './Userregister/ForgotPassword';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  
  render() {

    const token = localStorage.getItem('token');
    return (
    
      <div className='container-fluid main-container'> 
        <Router>
          <Routes>
            <Route exect path='/' element={<Home />} />
            <Route path = "/dashboard" element={<Dashboard username = {token}/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/updateusername' element={<UpdateUsername />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/createdocx' element={<Createdocx/>} />
          </Routes>
        </Router>
      
      </div >

    );
  }
}
export default App;
