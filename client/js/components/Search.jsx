import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import shortId from 'shortid';
import SideBar from './SideBar';
import { searchBill } from '../actions';


/**
 * @description this class returns a Search component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class Search extends Component {
 /**
  * Creates Instance of Search
  * @param {Object} props
  *
  * @memberof Search
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      offset: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * @method onChange
   *
   * @param {event} event
   *
   * @return {undefined} updates state
   */
  onChange(event) {
    const searchInput = {
      searchTerm: event.target.value
    };
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.value.length > 0) {
      this.props.searchBill(searchInput, this.state.offset);
    }
  }

  /**
 * @method handlePageClick
 *
 * @param {event} event
 *
 * @return {undefined} returns a new page of result
 *
 */
  handlePageClick(event) {
    const { selected } = event;
    const limit = 6;
    const offset = Math.ceil(selected * limit);
    this.setState({
      offset
    });
    this.props.searchBill(this.state, offset);
  }

  /**
   *
   * @returns { undefined }
   *
   * @memberof Search
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
              <div className="input-field s6 search">
                <label
                  htmlFor="search"
                  className="control-label"
                >Search:
                </label>
                <input
                  type="text"
                  name="searchTerm"
                  value={this.state.searchTerm}
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
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
                <h3>Result</h3>
              </div>
              <div className="bill-body">
                {this.props.result.length > 0 ? this.props.result.map(bill => (
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
                      <div className="truncate bill-desc-summary">
                        {bill.description}
                      </div>
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
                  pageCount={this.props.currentPage.pageCount || 0}
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

Search.propTypes = {
  user: PropTypes.object.isRequired,
  result: PropTypes.array.isRequired,
  searchBill: PropTypes.func.isRequired,
  currentPage: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.setCurrentUser.user,
  result: state.search.bills || [],
  currentPage: state.search.pageInfo || {}
});

export default connect(mapStateToProps, { searchBill })(Search);
