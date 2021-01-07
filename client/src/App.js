import React, {useState} from 'react';
import {Router} from '@reach/router';
import {ChakraProvider, CSSReset, ThemeProvider} from '@chakra-ui/react';
import customTheme from './customTheme';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/LoginPage/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Signup from './Components/Signup/Signup';



function App() {

  return (
    <>
    <React.StrictMode>
      <ThemeProvider theme={customTheme}>
        <ChakraProvider resetCSS="true">
          <CSSReset />
          <div className="App">
            <NavBar />
            <Router>
              <LandingPage path="/"/>
              <Login path="user/login" />
              <Signup path="user/register" />
              <Dashboard path="application/dashboard"/>
            </Router>
          </div>

        </ChakraProvider>
      </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
