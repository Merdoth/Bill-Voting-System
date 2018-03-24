import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { SuperAdminSignupRequest } from '../actions/user';


/**
 * @description this class returns a SuperAdminSignup component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class SuperAdminSignup extends Component {
  /**
  * Creates Instance of SuperAdminSignup
  * @param {Object} props
  *
  * @memberof SuperAdminSignup
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      userName: 'super-admin',
      password: '',
      loggedIn: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @memberof SuperAdminSignup
   *
   * @return { undefined }
   */
  componentWillMount() {
    $(document).ready(() => {
      $('select').material_select();
    });
  }
  /**
   * @method onChange
   *
   * @param {Event} event
   *
   * @return {undefined} updates state
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   *
   * @param {Event} event
   *
   * @return {undefined} new state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.SuperAdminSignupRequest(this.state);
  }
  /**
   * @return {undefined}
   *
   * @memberof SuperAdminSignup
   */
  render() {
    return (
      <div className="login">
        <NavigationBar />
        <div className="container signup-form ">
          <span className="login-header">
            <h3>Create an account</h3>
            <i className="material-icons">person</i>
          </span>
          <div>
            <div className="row">
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="input-field col s12 m12">
                    <input
                      className="form-control"
                      type="text"
                      name="fullName"
                      id="firstname"
                      pattern=".{8,50}"
                      required
                      title="8 characters minimum"
                      value={this.state.fullName}
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor="firstname"
                      className="control-label"
                    >Fullname :
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12">
                    <input
                      className="form-control"
                      name="userName"
                      id="userName"
                      type="text"
                      required
                      value={this.state.userName}
                      onChange={this.onChange}
                      disabled
                    />
                    <label
                      htmlFor="lastname"
                      className="control-label"
                    >Username :
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor="userId"
                      className="control-label"
                    >Email :
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      id="password"
                      pattern=".{8,50}"
                      required
                      title="8 characters minimum"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor="userId"
                      className="control-label"
                    >Password :
                    </label>
                  </div>
                </div>
                <div className="row form-cta">
                  <button
                    type="submit"
                    className="btn shadow-effect"
                    href="#"
                  >Signup
                  </button>
                </div>
              </form>
              <div className="row">
                <div className="col s12">
                  <p className="authlinks">
                    <Link to="/">
                      or Log in
                    </Link>
                  </p>
                </div>
              </div>
              <div className="disclaimer row">
                <div>
                  <span>
                    <img
                      src="/img/votebox.png"
                      alt=""
                      width="100"
                      height="100"
                    />
                  </span>
                </div>
                <div className="disclaimer-right">
                  <img src="/img/norton.png" alt="" width="100" height="50" />
                  <span>
                    Services is provided through a
                    secured connection.
                    If you have difficulty creating a user please
                     contact your site administrator.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
SuperAdminSignup.propTypes = {
  SuperAdminSignupRequest: PropTypes.func.isRequired
};


export default connect(null, {
  SuperAdminSignupRequest
})(SuperAdminSignup);
