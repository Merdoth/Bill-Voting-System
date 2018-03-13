import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';



/**
 *
 * @desc the functional component returns the footer if the page
 * @returns { void }
 */
const ClientDashboard = () => {
  return (
    <div className="">
      <NavigationBar />
      <div>
        this is a test
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
