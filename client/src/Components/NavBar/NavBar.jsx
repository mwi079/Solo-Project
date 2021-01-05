import React from 'react';
import './NavBar.css';

export default function NavBar () {
  return (
    <div className="nav-wrapper">
      <div className="title">
        <h1>Codagora</h1>
      </div>

      <div className="navigation">
        <button className="login-btn">LOGIN</button>
        <button className="register-btn">SIGN UP</button>
      </div>
    </div>
  )
}