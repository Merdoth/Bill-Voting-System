import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import shortId from 'shortid';
import { getAllUsers, getAllBills } from '../actions';
import SideBar from './SideBar';


/**
 *
 *
 * @class AdminDashboard
 * @extends {Component}
 */
class Bills extends Component {
  /**
  * Creates Instance of UpdateProfilePage
  * @param {Object} props
  * @memberOf UpdateProfilePage
  */
  constructor(props) {
    super(props);
    this.state = {
      allBills: [],
    };
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
  * @method
  * @memberOf Class CommentPage
  * @param {*} nextProps updated props
  * @return {*} sets state to currrent prop
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      allBills: nextProps.allBills
    });
  }

  /**
   *
   *
   * @returns { undefined }
   * @memberof AdminDashboard
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
          <div className="flexer flexer-row">
            <div className="flexed bill-list">
              <div className="bill-header" >
                <h3>Bills</h3>
              </div>
              <div className="bill-body">
                {this.props.allBills.length > 0 ? this.props.allBills.map(bill => (
                  <Link to={`/bills/${bill._id}`} className="flexer bill-content" key={shortId.generate()}>
                    <div className="flexed content-align">
                      <div className="flexer bill-details">
                        <span
                          className={`${bill.billProgress} tooltipped`}
                          data-position="top"
                          data-delay="50"
                          data-tooltip={`${bill.billProgress}`}
                        />
                        <div className="bill-title">{bill.title}</div>
                      </div>
                      <div className="truncate">{bill.description}</div>
                    </div>
                    <div className="vote-btn">
                      <div
                        className="upvote-count tooltipped"
                        data-position="top"
                        data-delay="50"
                        data-tooltip="upvote count"
                      >
                        {bill.upVoteCount}
                      </div>
                      <div
                        className="downvote-count tooltipped"
                        data-position="top"
                        data-delay="50"
                        data-tooltip="downvote count"
                      >
                        {bill.downVoteCount}
                      </div>
                    </div>
                  </Link>
                )) : (<h3>Sadly nothing to show (:</h3>)}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Bills.propTypes = {
  user: PropTypes.object.isRequired,
  getAllBills: PropTypes.func.isRequired,
  allBills: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
  user: state.setCurrentUser.user,
  allBills: state.bills.allBills
});
export default connect(mapStateToProps, { getAllBills })(Bills);
