import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/user';


/**
 *
 * @desc the functional component returns the footer if the page
 *
 * @param { object } props
 *
 * @returns { void }
 */
export class SideBar extends React.Component {
  /**
   * Creates an instance of NavigationBar.
   * @param { Object } props
   *
   * @memberof NavigationBar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * @param { Object } event
   *
   * @memberof NavigationBar
   *
   * @returns { undefined }
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   *
   * @memberof NavigationBar
   *
   * @returns { undefined }
   */
  loggedInUserNav() {
    return (
      <header>
        <div id="slide-out" className="side-nav fixed">
          <div className="side-nav-section logo">
            <Link to="/" className="brand-logo logo">
              <img src="/img/logo-billvoting.png" alt="test" height="40" />
              <span className="logo-text">wevote</span>
            </Link>
          </div>
          <div className="side-nav-section channels">
            <div className="side-nav-logout-btn">
              <a onClick={this.logout}>Logout</a>
            </div>
            <ul className="side-nav-list">
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/clients">Profile </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/clients">Bills </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/create">Voted Bills </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  /**
 *
 * @memberof NavigationBar
 *
 * @returns { undefined }
 */
  loggedInAdminNav() {
    return (
      <header>
        <div id="slide-out" className="side-nav fixed">
          <div className="side-nav-section logo">
            <Link to="/" className="brand-logo logo">
              <img src="/img/logo-billvoting.png" alt="test" height="40" />
              <span className="logo-text">wevote</span>
            </Link>
          </div>
          <div className="side-nav-section channels">
            <div className="side-nav-logout-btn">
              <a onClick={this.logout}>Logout</a>
            </div>
            <ul className="side-nav-list">
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/clients">Profile </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/clients">Bills </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/create">Create a Bill </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/create">Voted Bills </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  /**
*
* @memberof NavigationBar
*
* @returns { undefined }
*/
  loggedInSuperAdminNav() {
    return (
      <header>
        <div id="slide-out" className="side-nav fixed">
          <div className="side-nav-section logo">
            <Link to="/" className="brand-logo logo">
              <img src="/img/logo-billvoting.png" alt="test" height="40" />
              <span className="logo-text">wevote</span>
            </Link>
          </div>
          <div className="side-nav-section channels">
            <div className="side-nav-logout-btn">
              <a onClick={this.logout}>Logout</a>
            </div>
            <ul className="side-nav-list">
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/clients">Bills </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/clients">Users </NavLink>
              </li>
              <li className="side-nav-item">
                <NavLink exact to="/admin/dashboard/create">Create a Bill </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  /**
   *
   *
   * @returns { undefined }
   * @memberof SideBar
   */
  render() {
    const { permission } = this.props;
    let loggedInUser;
    if (permission === 1) {
      loggedInUser = this.loggedInSuperAdminNav();
    } else if (permission === 2) {
      loggedInUser = this.loggedInAdminNav();
    } else if (permission === 3) {
      loggedInUser = this.loggedInUserNav();
    }
    return (
      <div>
        {loggedInUser}
      </div>
    );
  }
}

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  permission: PropTypes.number.isRequired
};

export default connect(null, { logout })(SideBar);
