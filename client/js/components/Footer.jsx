import React from 'react';
/**
 *
 * @desc the functional component returns the footer if the page
 * @returns { void }
 */
const Footer = () => {
  return (
    <div className="mastfoot">
      <div className="footer-left">
        <img src="/img/Vote.png" alt="" width="60" height="40" />
        <div className="footer-left-trademark">
          <span className="">
            2018 Bill Voting System. All rights reserved
          </span>
          <span>Disclosures</span>
        </div>
      </div>
      <div className="footer-logo-right">
        <img src="/img/voters.png" alt="" width="50" height="50" />
      </div>
    </div>
  );
};

export default Footer;
