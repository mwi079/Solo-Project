import { Link } from '@reach/router';
import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';
import React from 'react';
import './NavBar.css';

export default function NavBar () {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="nav-wrapper">
      <div className="title">
        <h1>Codagora</h1>
      </div>

      <div className="navigation">
        <Link to="/user/register">
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
        
      <Box textAlign="right" mr={3} ml={3}>
          {colorMode === 'light' 
            ? <IconButton  icon={<SunIcon />} onClick={toggleColorMode}/>
            : <IconButton icon={<MoonIcon />} onClick={toggleColorMode}/>
          } 
      </Box>
      </div>
    </div>
  )
}