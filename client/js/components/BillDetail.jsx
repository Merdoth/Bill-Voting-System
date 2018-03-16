import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllBills, deleteBill } from '../actions';
import SideBar from './SideBar';


/**
 *
 *
 * @class AdminDashboard
 * @extends {Component}
 */
class BillDetails extends Component {
  /**
  * Creates Instance of UpdateProfilePage
  * @param {Object} props
  * @memberOf UpdateProfilePage
  */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDelete = this.handleDelete.bind(this);
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
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }
  /**
   *
   * @param {any} event
   * @param { number } billId
   *
   * @return { undefined }
   *
   * @memberof BillDetails
   */
  handleDelete(event, billId) {
    event.preventDefault();
    billId = this.props.currentBill._id;
    this.props.deleteBill(billId);
  }
  /**
   *
   *
   * @returns { undefined }
   * @memberof AdminDashboard
   */
  render() {
    const { userName } = this.props.user.token;
    const bill = this.props.currentBill;
    const { title } = bill;
    const status = bill.billProgress ===
    'House Passed' ? 'Vote Closed' : 'Vote In-progress';
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
          <div className="flexer flexer-row">
            <div className="flexed">
              <div className="flexer flexer-col">
                <div className="bill-desc">
                  <div className="bill-desc-wrapper flexer flexer-col">
                    <div className="bill-desc-notifications flexer">
                      <div className="flexed flexer bill-status">
                        <span className="billProgress">
                          {bill.billProgress}
                        </span>
                        <span className="status">{status}</span>
                      </div>
                      <div className="bill-created">
                        <span className="created-time">
                          {moment(bill.created_at).fromNow()}
                        </span>
                      </div>
                    </div>
                    <div className="bill-desc-footer flexer">
                      <span>upvote</span>
                      <span>donwvote</span>
                      <span username={userName} bill={bill}>
                        <Link to={`/bills/${bill._id}/edit`}>edit</Link>
                      </span>
                      <span onClick={this.handleDelete}>delete</span>
                    </div>
                    <div className="bill-desc-body flexed">
                      <h2>{title}</h2>
                      <p>
                        {bill.description}
                      </p>
                    </div>

                  </div>
                </div>
                <div className="flexed bill-opinion">
                  <div>
                    <div className="row">
                      <div className="input-field col s10">
                        <input id="icon_prefix" type="text" className="validate" />
                        <label htmlFor="icon_prefix">First Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="opinions">
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

BillDetails.propTypes = {
  user: PropTypes.object.isRequired,
  currentBill: PropTypes.object.isRequired,
  getAllBills: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const { billId } = ownProps.match.params;
  const currentBill = state.bills.allBills
    .find(bill => bill._id === billId) || {};
  const { user } = state.setCurrentUser;
  return {
    currentBill, user
  };
};

export default connect(
  mapStateToProps,
  { getAllBills, deleteBill }
)(BillDetails);
