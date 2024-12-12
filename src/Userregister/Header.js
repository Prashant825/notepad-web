import React, { } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from '../assets/image/logo.png';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";

function Header() {

  const token = localStorage.getItem('token');
  const currentURL = window.location.href;
  const logout = () => {
    const token = localStorage.removeItem('token', 'token_id');
    const token_id = localStorage.removeItem('token_id');
    if (!token || !token_id) {
      window.location.href = "/";
    }
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <Link className="header-logo" to="/"> <img src={logo} alt="header-logo" class="navbar-logo" /></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <Link to='/'><h2 className="nav-docx-heading">Documento App</h2></Link>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link" aria-current="page">Home</Link>
            </li>
            <li class="nav-item">
              {currentURL === 'http://localhost:3000/dashboard' ? null : token ? <Link to='/dashboard' class="nav-link" aria-current="page">My account</Link> : null}
            </li>
            {currentURL === 'http://localhost:3000/dashboard' ? null : token ? null : <li class="nav-item"><Link to='/login' class="nav-link nav-link login-btn" aria-current="page">Login</Link> </li>}
            <li class="nav-item">
              {/* {currentURL === 'http://localhost:3000/dashboard' ? null : <Link to='/register' class="nav-link" aria-current="page">Register</Link>} */}
            </li>
          </ul>
          <div class="user-dropdown">
            {token ? <h4 class="nav-link user-profile">{token[0].toUpperCase()}</h4> : null}
            <ul className="user-profile-list">
              <li className="user-subitem user-name">{token}</li>
              <li class="user-subitem user-link my-account"><FontAwesomeIcon className="user-profile-icon" icon={faUser} /><Link to='/dashboard' aria-current="page">My account</Link></li>
              <li className="user-subitem user-link" onClick={() => { logout() }}><FontAwesomeIcon className="user-profile-icon" icon={faSignOut} />LogOut</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;