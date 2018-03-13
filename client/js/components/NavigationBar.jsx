import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description This is a navigation component
 * @returns { undefined }
 */
const NavigationBar = () => (
  <div className="navbar-fixed navbar-main">
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo logo">
          <img src="/img/logo-billvoting.png" alt="test" height="40" />
          <span className="logo-text">wevote</span>
        </Link>
      </div>
    </nav>
  </div>
);

export default NavigationBar;
