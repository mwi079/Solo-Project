import React, {useState} from 'react';
import './Signup.css'

export default function Signup({registerNewUser}) {
  const [userDetails, setUserDetails] = useState({name: "", email: "", password: ""});

  const submitHandle = e => {
    e.preventDefault();
    registerNewUser(userDetails)
  }

  return (
    <form onSubmit={submitHandle}>
        <div className="signup-box">
          <div className="title-box">
            <h1>Sign Up</h1>
          </div>
          

          <div className="input_fields">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name_field"
              name="name"
              autoComplete="off"
              onChange={e => setUserDetails({...userDetails, name: e.target.value})}
              />
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email_field"
              name="email"
              autoComplete="off"
              onChange={e => setUserDetails({...userDetails, email: e.target.value})}
              />

            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password_field"
              name="password"
              onChange={e => setUserDetails({...userDetails, password: e.target.value})}
              />

          </div>

          <input type="submit" value="SIGN UP" id="signup-btn"/>
      </div>
    </form>
  )
}
