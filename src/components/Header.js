import React from 'react';
import ProfileMenu from './ProfileMenu';
import '../style.css';

function Header({ setIsAuthenticated }) {
  return (
    <header className="container-1">
      <nav className="navbar navbar-expand bg-body-tertiary d-flex justify-content-between align-items-center px-4">
        <a className="navbar-brand" href="#">
          <div className="heading-img">
            <h2><b>ChakraX</b></h2>
          </div>
        </a>
        
          <img
            src="/images/chakraX_logo.png"
            alt="ChakraX Logo"
            className="logo-image"
          />
      </nav>
      <h1 className="header">Let's Book A Ride</h1>
    </header>
  );
}

export default Header;
