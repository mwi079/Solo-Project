import React from 'react';
import {Router} from '@reach/router';

import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/LoginPage/Login';
import './App.css';

function App() {


  return (
    <>
    <React.StrictMode>
      <NavBar /> 
      <div className="App">
        <Router>
          <LandingPage path="/"/>
          <Login path="user/login"/>
        </Router>
      </div>
      </React.StrictMode>
    </>
  );
}

export default App;
