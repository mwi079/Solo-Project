import React, {useState} from 'react';
import {registerUser} from '../../ApiClientService';
import './Signup.css';


export default function Signup({registerNewUser}) {
  
  async function registerNewUser ({name, email, password}) {
      registerUser({name, email, password})
      .then(res => res.data)
      .then(user => setUserDetails(user))
      .catch(error => setError(error.response.data));
    }
    
  const [userDetails, setUserDetails] = useState({name: "", email: "", password: ""});
  const [error, setError] = useState('');

  const submitHandle = e => {
    e.preventDefault();
    registerNewUser(userDetails)
      .catch(error => console.log('hey', error))
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
              required
              onChange={e => setUserDetails({...userDetails, name: e.target.value})}
              />
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email_field"
              name="email"
              autoComplete="off"
              required
              onChange={e => setUserDetails({...userDetails, email: e.target.value})}
              />

            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password_field"
              name="password"
              required
              onChange={e => setUserDetails({...userDetails, password: e.target.value})}
              />

          </div>

          <input type="submit" value="SIGN UP" id="signup-btn"/>
      </div>
    </form>
  )
}
