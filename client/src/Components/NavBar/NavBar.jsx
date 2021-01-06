import { Link } from '@reach/router';
import React, {useState} from 'react';
import './NavBar.css';

export default function NavBar () {



  return (
    <div className="nav-wrapper">
      <div className="title">
        <h1>Codagora</h1>
      </div>

      <div className="navigation">
        <Link to="/user/login">
          <button 
            className="login-btn"

            >LOGIN
          </button>
        </Link>
        <Link to="/user/register">
          <button 
            className="register-btn"
            > SIGN UP
          </button>
        </Link>
        
      </div>
    </div>
  )
}