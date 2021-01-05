import React from 'react';
import './Login.css';

export default function Login () {
  return (
    <div className="login-box">
      <div className="title-box">
        <h1>Login</h1>
      </div>
      <div className="input_fields">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email_field"
          name="email"
          autoComplete="off"
          />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password_field"
          name="password"
          />

      </div>

        <button className="login">
          Login
        </button>
    </div>
  )
}
