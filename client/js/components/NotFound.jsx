import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';


/**
 *
 * @description this returns a NotFound component
 *
 * @returns { undefined }
 */
const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <NavigationBar />
      <div className="container not-found-content">
        <div className="flexer flexer-col">
          <div className="img-wrapper">
            <img src="/img/rocket.gif" alt="" className="not-found-img" />
          </div>
          <div className="not-found-text flexed">
            <div className="not-found-404-text">404</div>
            <p>We can't find the page you're looking for.</p>
            <Link to="/">
              <div className="back-btn">Back Home</div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
