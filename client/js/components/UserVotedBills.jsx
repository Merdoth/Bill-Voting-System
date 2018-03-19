import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import shortId from 'shortid';
import { getUserVotedBills } from '../actions';
import SideBar from './SideBar';


/**
 *
 *
 * @class AdminDashboard
 * @extends {Component}
 */
class UserVotedBills extends Component {
  /**
  * Creates Instance of UpdateProfilePage
  * @param {Object} props
  * @memberOf UpdateProfilePage
  */
  constructor(props) {
    super(props);
    this.state = {
      votedBills: [],
      page: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
 *
 *
 * @memberof Dashboard
 * @returns {void}
 */
  componentDidMount() {
    this.props.getUserVotedBills(this.state.page);
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
      votedBills: nextProps.votedBills
    });
  }

  /**
  * @method handlePageClick
  * @param {*} event
  * @return {DOM} returns a new page of result
  *
  */
  handlePageClick(event) {
    const { selected } = event;
    const page = Math.ceil(selected) + 1;
    this.props.getUserVotedBills(page);
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
            <span className="float-header-with-flex">
              <Link to={'/search'}><i className="material-icons medium search-icon">search</i></Link>
            </span>
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
                {this.props.votedBills.length > 0 ? this.props.votedBills.map(bill => (
                  <Link to={`/bills/${bill.votedBill._id}`} className="flexer bill-content" key={shortId.generate()}>
                    <div className="flexed content-align">
                      <div className="flexer bill-details">
                        <span
                          className={`${bill.votedBill.billProgress} tooltipped`}
                          data-position="top"
                          data-delay="50"
                          data-tooltip={`${bill.votedBill.billProgress}`}
                        />
                        <div className="bill-title">{bill.votedBill.title}</div>
                      </div>
                      <div className="truncate">{bill.votedBill.description}</div>
                    </div>
                    <div className="vote-btn">
                      <div
                        className="upvote-count tooltipped"
                        data-position="top"
                        data-delay="50"
                        data-tooltip="upvote count"
                      >
                        {bill.votedBill.upVoteCount}
                      </div>
                      <div
                        className="downvote-count tooltipped"
                        data-position="top"
                        data-delay="50"
                        data-tooltip="downvote count"
                      >
                        {bill.votedBill.downVoteCount}
                      </div>
                    </div>
                  </Link>
                )) : (<h3>Sadly nothing to show :)</h3>)}
                <ReactPaginate
                  previousLabel="previous"
                  nextLabel="next"
                  pageCount={this.props.currentPage.pages || 0}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

UserVotedBills.propTypes = {
  user: PropTypes.object.isRequired,
  getUserVotedBills: PropTypes.func.isRequired,
  votedBills: PropTypes.array.isRequired,
  currentPage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
  user: state.setCurrentUser.user,
  votedBills: state.userVotedBill.userVotes || [],
  currentPage: state.userVotedBill.pageInfo || {}
});
export default connect(mapStateToProps, { getUserVotedBills })(UserVotedBills);
