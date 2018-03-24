import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import shortId from 'shortid';
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import {
  deleteBill, upvoteBill, downvoteBill,
  getABill, addOpinion,
  getOpinion,
  getAllUsers
} from '../actions';
import SideBar from './SideBar';


/**
 * @description this class returns a BillDetails component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */
export class BillDetails extends Component {
  /**
  * Creates Instance of BillDetails
  * @param {Object} props
  *
  * @memberof BillDetails
  *
  * @returns { undefined }
  */
  constructor(props) {
    super(props);
    this.state = {
      opinion: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
 *
 * @memberof BillDetails
 *
 * @returns {undefined}
 */
  componentDidMount() {
    const { billId } = this.props.match.params;
    this.props.getAllUsers();
    this.props.getABill(billId);
    this.props.getOpinion(billId);
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible('open');
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }
  /**
   * @method onChange
   *
   * @param {Event} event
   *
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
  * @method onSubmit
  *
  * @param {Event} event
  *
  * @return {Object} new State
  */
  onSubmit(event) {
    event.preventDefault();
    const billId = this.props.currentBill._id;
    this.props.addOpinion(billId, this.state);
    this.setState({
      opinion: '',
    });
  }

  /**
   *
   * @param {event} event
   *
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
 * @param {event} event
 *
 * @param { number } billId
 *
 * @return { undefined }
 *
 * @memberof BillDetails
 */
  handleUpvote(event, billId) {
    event.preventDefault();
    const status = 'upvote';
    billId = this.props.currentBill._id;
    this.props.upvoteBill(billId, status);
  }

  /**
 *
 * @param {event} event
 *
 * @param { number } billId
 *
 * @return { undefined }
 *
 * @memberof BillDetails
 */
  handleDownVote(event, billId) {
    event.preventDefault();
    const status = 'downvote';
    billId = this.props.currentBill._id;
    this.props.downvoteBill(billId, status);
  }

  /**
   *
   * @returns { undefined }
   *
   * @memberof BillDetails
   */
  render() {
    const { userName } = this.props.user.token;
    const bill = this.props.currentBill;
    const { title } = bill;
    const shareUrl = 'https://bill-voting-system.herokuapp.com';
    let adminBtn;
    if (this.props.user.token.permission === 1 ||
       this.props.user.token.permission === 2) {
      adminBtn = 'display';
    } else {
      adminBtn = 'dont-display';
    }
    const voteStatus = this.props.currentBill.billProgress ===
    'House Passed' ? 'disable-vote' : 'allow-vote';
    return (
      <div className="dashboard-container">
        <SideBar permission={this.props.user.token.permission} />
        <main className="row s12">
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
          <div className="flexer flexer-row row s12">
            <div className="flexed">
              <div className="flexer flexer-col">
                <div className="bill-desc row s12">
                  <div className="bill-desc-wrapper flexer flexer-col">
                    <div className="bill-desc-notifications flexer">
                      <div className="flexed flexer bill-status">
                        <span className="billProgress">
                          {bill.billProgress}
                        </span>
                      </div>
                      <div className="bill-created">
                        <span className="created-time">Created
                          &nbsp;{moment(bill.created_at).fromNow()}
                        </span>
                      </div>
                    </div>

                    <div className="bill-desc-body flexed">
                      <h2>{title}</h2>
                      <div className="flexer">
                        <div className="">
                          <div className="social-content">
                            <FacebookShareButton
                              url={shareUrl}
                              quote={title}
                              className="share-button"
                            >
                              <FacebookIcon
                                size={32}
                                round
                              />
                            </FacebookShareButton>

                            <TwitterShareButton
                              url={shareUrl}
                              title={title}
                              className="share-button"
                            >
                              <TwitterIcon
                                size={32}
                                round
                              />
                            </TwitterShareButton>

                            <LinkedinShareButton
                              url={shareUrl}
                              title={title}
                              windowWidth={750}
                              windowHeight={600}
                              className="share-button"
                            >
                              <LinkedinIcon
                                size={32}
                                round
                              />
                            </LinkedinShareButton>

                            <EmailShareButton
                              url={shareUrl}
                              subject={title}
                              body="body"
                              className="share-button"
                            >
                              <EmailIcon
                                size={32}
                                round
                              />
                            </EmailShareButton>

                          </div>
                        </div>
                        <div className="flexed">

                          <p>
                            {bill.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bill-desc-footer flexer">
                      <span className={voteStatus} onClick={this.handleUpvote}>
                      upvote {bill.upVoteCount}
                      </span>
                      <span
                        className={voteStatus}
                        onClick={this.handleDownVote}
                      >
                      donwvote {bill.downVoteCount}
                      </span>

                      <Link to={`/bills/${bill._id}/edit`}>
                        <span
                          className={adminBtn}
                          username={userName}
                          bill={bill}
                        >
                          edit
                        </span>
                      </Link>

                      <span
                        className={adminBtn}
                        onClick={this.handleDelete}
                      >
                      delete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flexed bill-opinion">
                  <div>
                    <form className="row" onSubmit={this.onSubmit}>
                      <div className="row opinion-input">
                        <div className="input-field col s10">
                          <input
                            id="icon_prefix"
                            type="text"
                            name="opinion"
                            className="form-control"
                            required
                            value={this.state.opinion}
                            onChange={this.onChange}
                          />
                          <label htmlFor="icon_prefix">Opinion</label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="opinions">
                    {this.props.opinions.map(opinion =>
                      (
                        <div className="opinion-box" key={shortId.generate()} >
                          <span className="created-time">Created&nbsp;
                            {moment(opinion.created_at).fromNow()}
                          </span>
                          <div className="opinion-text">
                            <span>{opinion.opinion}</span>
                          </div>
                        </div>
                    ))}
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
  getABill: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired,
  upvoteBill: PropTypes.func.isRequired,
  downvoteBill: PropTypes.func.isRequired,
  addOpinion: PropTypes.func.isRequired,
  getOpinion: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  opinions: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  const { user } = state.setCurrentUser;
  const currentBill = state.bill.billFound;
  const { opinions } = state.opinion || [];
  return {
    currentBill, user, opinions
  };
};

export default connect(
  mapStateToProps,
  {
    deleteBill,
    upvoteBill,
    downvoteBill,
    getABill,
    addOpinion,
    getOpinion,
    getAllUsers
  }
)(BillDetails);
