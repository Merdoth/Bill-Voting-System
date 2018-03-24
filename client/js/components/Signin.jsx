import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { userLoginRequest } from '../actions';

/**
 * @description this class returns a Signin component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class Signin extends Component {
 /**
  * Creates Instance of Signin
  * @param {Object} props
  *
  * @memberof Signin
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @method onChange
   *
   * @param {Event} event
   *
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   *
   * @param {Event} event
   *
   * @return {Object} new State
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userLoginRequest(this.state);
  }

  /**
   * @memberof Signin
   *
   * @returns { undefined }
   */
  render() {
    return (
      <div className="login">
        <NavigationBar />
        <div className="container auth-form">
          <span className="login-header">
            <h3>Sign In</h3>
            <i className="material-icons">person</i>
          </span>
          <div>
            <form className="row" onSubmit={this.onSubmit}>
              <div className="col s12">
                <div className="input-field">
                  <label
                    htmlFor="email"
                    className="control-label"
                  >Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    className="form-control login"
                    required
                    onChange={this.onChange}
                    autoComplete="off"
                  />
                </div>
                <div className="input-field">
                  <label
                    htmlFor="password"
                    className="control-label"
                  >Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    pattern=".{8,50}"
                    required
                    title="8 characters minimum"
                    value={this.state.password}
                    className="form-control"
                    onChange={this.onChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-cta">
                  <button
                    type="submit"
                    className="btn shadow-effect"
                  >Log in
                  </button>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col s12">
                <p className="authlinks">
                  <Link to="/register">
                  or create an account
                  </Link>
                </p>
              </div>
            </div>
            <div className="disclaimer row">
              <div>
                <span>
                  <img src="/img/votebox.png" alt="" width="100" height="100" />
                </span>
              </div>
              <div className="disclaimer-right">
                <img src="/img/norton.png" alt="" width="100" height="50" />
                <span>
                  A username and password is required to use this service.
                  If you have difficulty logging in please
                  contact your admin for support.
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Signin.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};


export default connect(null, { userLoginRequest })(Signin);
