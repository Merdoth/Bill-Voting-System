import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


/**
 * @description this class returns a Home component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class Home extends Component {
  /**
   *
   * @returns { undefined }
   *
   * @memberof Home
   */
  render() {
    const date = moment(new Date()).format('MMMM YYYY');
    return (
      <div className="flexer">
        <div className="flexed flexer">
          <div className="flexed home-desc-wrapper">
            <div className="home-header">
              <a to="/" className="brand-logo logo">
                <img src="/img/logo-billvoting.png" alt="test" height="40" />
                <span className="logo-text">wevote</span>
              </a>
            </div>
            <div className="flexed home-body">
              <div className="home-date">{date.toString()}</div>
              <p>Making better decision for tomorrows leaders</p>
              <span
                className="quote"
              >We grant people the opportunity to vote for or
                against bills that affect their lives and existence. We give
                voice to the citizenry and participants in legislation.
              </span>
              <Link to="/signin">
                <span className="link-signin">
                  Vote Now
                  <i className="material-icons">
                    chevron_right
                  </i>
                </span>
              </Link>
            </div>
          </div>
          <div className="home-image">
            <img src="/img/bill_votes.jpg" alt="votes" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
