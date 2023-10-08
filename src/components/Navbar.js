import React from 'react';
import './Navbar.css';
import projectLogo from '../media/projectLogo.svg';

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={projectLogo} alt="logo" className="logo" />
        <span className="project-name">OpenFireWatch</span>
      </div>
      <div className="buttons-container">
        <a href='#' className="nav-button">Docs</a>
        <a href='#' className="nav-button">Collaborate</a>
        <a href='#' className="nav-button">Login</a>
      </div>
    </div>
  );
}

export default Navbar;
