import React from 'react';
import './Login.css';

export default function Login () {
  return (
    <div className="login-wrap">
      <div className="login-box">
        <input 
          type="email" 
          id="email_field"
          
          />
        <input 
          type="password" 
          id="password_field"
          />
      </div>
    </div>
  )
}
