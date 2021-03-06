import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import { createBillRequest } from '../actions';


/**
 * @description this class returns a CreateBill component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class CreateBill extends Component {
  /**
  * Creates Instance of CreateBill
  * @param {Object} props
  *
  * @memberof CreateBill
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @method onChange
   *
   * @param {Event} event
   *
   * @return {Oject} updates state
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   *
   * @param {Event} event
   *
   * @return {state} new state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.createBillRequest(this.state);
  }
  /**
   * @return {undefined} Returns DOM element
   *
   * @method CreateBill
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
                <h1>Create a bill</h1>
              </div>
              <div className="account-summary-section">
                <div>
                  <form className="col s12 create" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          id="title"
                          pattern=".{5,100}"
                          required
                          title="5 characters minimum and 100 maximum"
                          value={this.state.title}
                          onChange={this.onChange}
                        />
                        <label
                          htmlFor="title"
                          className="control-label"
                        >Title :
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <input
                          className="form-control"
                          name="description"
                          id="description"
                          type="text"
                          pattern=".{8,1000}"
                          required
                          title="8 characters minimum and 1000 maximum"
                          value={this.state.description}
                          onChange={this.onChange}
                        />
                        <label
                          htmlFor="description"
                          className="control-label"
                        >Description :
                        </label>
                      </div>
                    </div>
                    <div className="row form-cta">
                      <button
                        type="submit"
                        className="btn shadow-effect"
                        href="#"
                      >Create
                      </button>
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
CreateBill.propTypes = {
  createBillRequest: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
  user: state.setCurrentUser.user,
  allBills: state.bills.allBills
});

export default connect(mapStateToProps, { createBillRequest })(CreateBill);
