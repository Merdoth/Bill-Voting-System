import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout, getAllBills, updateBill } from '../actions';
import SideBar from './SideBar';

/**
 *
 *
 * @export
 * @class EditBill
 * @extends {Component}
 */
export class EditBill extends Component {
  /**
    * @constructor
    * @description Creates Instance of LoginForm
    * @param {Object} props
    * @memberOf LoginForm
    */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentBill.title,
      description: this.props.currentBill.description,
      billProgress: this.props.currentBill.billProgress
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  /**
  *
  *
  * @memberof Dashboard
  * @returns {void}
  */
  componentDidMount() {
    this.props.getAllBills();
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
    this.setState({
      title: nextProps.currentBill.title,
      description: nextProps.currentBill.description,
      billProgress: nextProps.currentBill.billProgress,
    });
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
    this.props.updateBill(this.props.currentBill._id, this.state);
  }

  /**
    * @method resetForm
    *
    * @memberof EditClient
    *
    * @return { undefined }
    */
  resetForm() {
    this.setState({
      ...this.props.user
    });
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
                <h2>Edit bill</h2>
              </div>
              <div className="account-summary-section">
                <div>
                  <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          id="title"
                          pattern=".{5,50}"
                          required
                          title="5 characters minimum"
                          value={this.state.title || ''}
                          onChange={this.onChange}
                        />
                        <label htmlFor="title" className="control-label">Title :</label>
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
                          title="8 characters minimum"
                          value={this.state.description || ''}
                          onChange={this.onChange}
                        />
                        <label htmlFor="description" className="control-label">Description :</label>
                      </div>
                    </div>
                    <div className="row">
                      <label>Bill Progress:</label>

                      <select
                        className="browser-default"
                        id="billProgress"
                        name="billProgress"
                        required="true"
                        value={this.state.billProgress}
                        onChange={this.onChange}
                      >
                        <option value="Not enacted" defaultValue>Not enacted</option>
                        <option value="Senate Voted">Senate Voted</option>
                        <option value="House passed">House Passed</option>
                      </select>
                    </div>
                    <div className="row form-cta">
                      <button type="submit" className="btn shadow-effect" href="#">Submit</button>
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

EditBill.propTypes = {
  user: PropTypes.object.isRequired,
  currentBill: PropTypes.object.isRequired,
  getAllBills: PropTypes.func.isRequired,
  updateBill: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const { billId } = ownProps.match.params;
  const currentBill = state.bills.allBills.find(bill => bill._id === billId) || {};
  const { user } = state.setCurrentUser;
  return {
    currentBill, user
  };
};

export default connect(mapStateToProps, { logout, getAllBills, updateBill })(EditBill);
