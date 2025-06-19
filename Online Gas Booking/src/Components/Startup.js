import React, { useState } from 'react';
import cylinderImage from '../Images/cylinder.jpeg';
import Login from './Login';
import Register from './Register';

export default function Startup() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div class="container">
        <div class="main">
            <h2 className='main-heading'>Book Gas Online</h2>
            <img src={cylinderImage} alt="animated cylinder icon" />
        </div>
        <div class="login-register-form">
            { showLogin ? <Login setShowLogin = {setShowLogin}/> : <Register setShowLogin = {setShowLogin}/>}
        </div>
    </div>
  )
}
