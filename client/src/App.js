import React, {useState} from 'react';
import {Router} from '@reach/router';

import {getToken, registerUser} from './ApiClientService';

import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/LoginPage/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Signup from './Components/Signup/Signup';

function App() {

  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState({name: "", email: "", password: ""});

  function getUserToken ({email, password}) {
    getToken({email, password})
      .then(res => res.data)
      .then(token => setToken(token));
  }

  function registerNewUser ({name, email, password}) {
    registerUser({name, email, password})
      .then(res => res.data)
      .then(user => setUserDetails(userDetails));
  }

  return (
    <>
    <React.StrictMode>
      <NavBar /> 
      <div className="App">
        <Router>
          <LandingPage path="/"/>
          <Login path="user/login"  getUserToken={getUserToken}/>
          <Signup path="user/register" registerNewUser={registerNewUser}/>
          <Dashboard path="application/dashboard"/>
        </Router>
      </div>
      </React.StrictMode>
    </>
  );
}

export default App;
