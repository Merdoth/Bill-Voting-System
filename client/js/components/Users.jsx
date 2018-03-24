import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import shortId from 'shortid';
import { getAllUsers, addPermission } from '../actions';
import SideBar from './SideBar';


/**
 * @description this class returns a Users component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class Users extends Component {
  /**
  * Creates Instance of Users
  * @param {Object} props
  *
  * @memberof Users
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
 *
 * @memberof Users
 *
 * @returns {undefined}
 */
  componentDidMount() {
    this.props.getAllUsers(this.state.page);
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible('open');
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }

  /**
 * @method onChange
 *
 * @param {event} event
 *
 * @returns { undefined }
 *
 */
  onChange(event) {
    const isActive = event.target.checked;
    const adminPermission = isActive === true ? 2 : 3;
    const id = event.target.name;
    this.props.addPermission(id, adminPermission, isActive);
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
    this.props.getAllUsers(page);
  }
  /**
   *
   * @returns { undefined }
   *
   * @memberof Users
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
                <i className="material-icons medium search-icon">search</i>
              </Link>
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
                <h3>Users</h3>
              </div>
              <div className="bill-body">
                <div className="summary-container">
                  <div className="summary-section">
                    {this.props.users.length > 0 ?
                    this.props.users.map(user => (
                      <div className="summary-list" key={shortId.generate()}>
                        <span key={shortId.generate()}> {user.fullName}</span>
                        <div className="switch">
                          <label>
                            Off
                            <input
                              id={user._id}
                              name={user._id}
                              type="checkbox"
                              onChange={this.onChange}
                              checked={user.isActive}
                            />
                            <span className="lever" />
                            On
                          </label>
                        </div>
                      </div>
                    )) : (<h3> No users found</h3>)}
                  </div>
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
          </div>
        </main>
      </div>
    );
  }
}

Users.propTypes = {
  user: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  addPermission: PropTypes.func.isRequired,
  currentPage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
  users: state.users.users || [],
  user: state.setCurrentUser.user,
  currentPage: state.users.pageInfo || {}
});
export default connect(
  mapStateToProps,
  { getAllUsers, addPermission }
)(Users);
