import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import shortId from 'shortid';
import { getAllBills } from '../actions';
import SideBar from './SideBar';


/**
 * @description this class returns a Bills component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class Bills extends Component {
  /**
  * Creates Instance of Bills
  * @param {Object} props
  *
  * @memberof Bills
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      allBills: [],
      page: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
 *
 * @memberof BillDetails
 *
 * @returns {undefined}
 */
  componentDidMount() {
    this.props.getAllBills(this.state.page);
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible('open');
      $('.tooltipped').tooltip();
    });
  }

  /**
  *
  * @memberof Bills
  *
  * @param {Object} nextProps updated props
  *
  * @return {undefined} sets state to currrent prop
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      allBills: nextProps.allBills
    });
  }

  /**
 *
 * @memberof BillDetails
 *
 * @returns {undefined}
 */
  componentDidUpdate() {
    $(document).ready(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }
  /**
  * @method handlePageClick
  *
  * @param {event} event
  *
  * @return {undefined}
  *
  */
  handlePageClick(event) {
    const { selected } = event;
    const page = Math.ceil(selected) + 1;
    this.props.getAllBills(page);
  }
  /**
   *
   * @returns { undefined }
   *
   * @memberof Bills
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
              <Link to="/search">
                <i
                  id="search"
                  className="material-icons medium search-icon"
                >search
                </i>
              </Link>
            </span>
            <span>
              <h5 className="username-format">
                <i
                  id="user-img"
                  className="material-icons username-icon"
                >
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
                  <Link
                    id="main-bill-detail"
                    to={`/bills/${bill._id}`}
                    className="flexer bill-content"
                    key={shortId.generate()}
                  >
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
                      <div className="bill-desc-summary truncate">{bill.description}</div>
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

Bills.propTypes = {
  user: PropTypes.object.isRequired,
  getAllBills: PropTypes.func.isRequired,
  allBills: PropTypes.array.isRequired,
  currentPage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
  user: state.setCurrentUser.user,
  allBills: state.bills.allBills || [],
  currentPage: state.bills.pageInfo || {}
});
export default connect(mapStateToProps, { getAllBills })(Bills);
