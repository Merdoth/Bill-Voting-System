import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout, getAUser, updateUser } from '../actions';
import SideBar from './SideBar';

/**
 *
 *
 * @export
 * @class EditBill
 * @extends {Component}
 */
export class UpdateUser extends Component {
  /**
    * @constructor
    * @description Creates Instance of LoginForm
    * @param {Object} props
    * @memberOf LoginForm
    */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      userName: '',
      loggedIn: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.resetForm = this.resetForm.bind(this);
  }

  /**
  *
  *
  * @memberof Dashboard
  * @returns {void}
  */
  componentDidMount() {
    const { id } = this.props.user.token;
    this.props.getAUser(id);
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible('open');
    });
  }
  /**
*
* @param {*} nextProps updated props
* @returns {DOM} DOM object
*/
  componentWillReceiveProps(nextProps) {
    if (nextProps.userFound) {
      this.setState({
        fullName: nextProps.userFound.fullName,
        email: nextProps.userFound.email,
        userName: nextProps.userFound.userName,
      });
    }
  }
  /**
    * @method onChange
    * @param {Event} event
    * @return {Object} updates State
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   * @param {Event} event
   * @return {Object} new State
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state);
  }

  /**
 *
 *
 * @returns { undefined }
 * @memberof EditBill
 */
  render() {
    const { userName } = this.props.user.token;
    return (
      <div className="dashboard-container">
        <SideBar permission={this.props.user.token.permission} />
        <main>
          <div className="welcome-caption" >
            <div className="mobile-hambuger">
              <a
                href="#"
                data-activates="slide-out"
                className="button-collapse hide-on-large-only "
              >
                <i className="material-icons">menu</i>
              </a>
            </div>
            <span className="float-header-with-flex" />
            <span>
              <h5 className="username-format">
                <i className="material-icons username-icon">
                  account_circle
                </i>
                Welcome, {userName}
              </h5>
            </span>
          </div>
          <div className="container">
            <div className="edit-wrapper">
              <div>
                <h2>Update Profile</h2>
              </div>
              <div className="account-summary-section">
                <div>
                  <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <input
                          className="form-control"
                          type="text"
                          name="fullName"
                          id="firstname"
                          required
                          value={this.state.fullName}
                          onChange={this.onChange}
                        />
                        <label htmlFor="firstname" className="control-label">Fullname :</label>
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
                        />
                        <label htmlFor="lastname" className="control-label">Username :</label>
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
                        <label htmlFor="userId" className="control-label">Email :</label>
                      </div>
                    </div>
                    <div className="row form-cta">
                      <button type="submit" className="btn shadow-effect" href="#">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  getAUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.setCurrentUser.user,
  userFound: state.user.userFound
});

export default connect(mapStateToProps, { logout, getAUser, updateUser })(UpdateUser);
