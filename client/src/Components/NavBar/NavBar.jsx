import { Link } from '@reach/router';
import React, {useState} from 'react';
import './NavBar.css';

export default function NavBar () {

  const [title, setTitle] = useState('');

  function handleClick (e) {
    setTitle(e.target.textContent);
  }

  return (
    <div className="nav-wrapper">
      <div className="title">
        <h1>Codagora</h1>
      </div>

      <div className="navigation">
        <Link to="/user/login">
          <button 
            className="login-btn"
            onClick={e => handleClick(e)}
            >LOGIN
          </button>
        </Link>
        <button 
          className="register-btn"
          onClick={e => handleClick(e)}
          > SIGN UP
        </button>
      </div>
    </div>
  )
}