import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../app/actionTypes';
import history from '../utils/history';

const getABillSuccess = bill =>
  ({ type: types.GET_BILL_SUCCESS, bill });

const getABillFailed = bill =>
  ({ type: types.GET_BILL_ERROR, bill });

/**
   * @function getABill
   *
   * @param { number } billId
   *
   * @returns {object} dispatches an action
   *
   * @description It logs out the user and deletes token from local storage
   */
export const getABill = billId => dispatch =>
  axios.get(`/api/v1/bills/${billId}`)
    .then((response) => {
      dispatch(getABillSuccess(response.data));
    })
    .catch((response) => {
      dispatch(getABillFailed(response));
    });

const getBillsSuccess = bills =>
  ({ type: types.GET_BILLS_SUCCESS, bills });

const getBillsFailed = bills =>
  ({ type: types.GET_BILLS_ERROR, bills });

/**
   * @function getUserDetails
   *
   * @returns {object} dispatches an action
   *
   * @description It logs out the user and deletes token from local storage
   */
export const getAllBills = () => dispatch => axios.get('/api/v1/bills')
  .then((response) => {
    dispatch(getBillsSuccess(response.data));
  })
  .catch((response) => {
    dispatch(getBillsFailed(response));
  });

const createBillSuccess = bill => ({ type: types.CREATE_BILL_SUCCESS, bill });

const createBillFail = bill => ({ type: types.CREATE_BILL_ERROR, bill });

/**
 * @function createBillRequest
 *
 * @param { object } billData
 *
 * @returns {object} dispatches an action
 *
 * @description It makes an api call to register a new user
 */
export const createBillRequest = billData => dispatch =>
  axios.post('/api/v1//admin/bills', billData)
    .then((response) => {
      dispatch(createBillSuccess(response));
      Materialize.toast(response.data.message, 3000, 'green');
      history.push('/bills');
    }).catch((err) => {
      dispatch(createBillFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });


const updateBillSuccess = bill => ({ type: types.UPDATE_BILL_SUCCESS, bill });

const updateBillFail = bill => ({ type: types.UPDATE_BILL_ERROR, bill });

/**
 * @function updateBill
 *
 * @param { number } billId
 * @param { object } billData
 *
 * @returns {object} dispatches an action
 *
 * @description It makes an api call to register a new user
 */
export const updateBill = (billId, billData) => dispatch =>
  axios.put(`/api/v1/admin/bills/${billId}`, billData)
    .then((response) => {
      dispatch(updateBillSuccess(response));
      Materialize.toast(response.data.message, 3000, 'green');
      history.push('/bills');
    }).catch((err) => {
      dispatch(updateBillFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

/**
 * @function deleteBill
 *
 * @param { number } billId
 *
 * @returns {object} dispatches an action
 *
 * @description It makes an api call to register a new user
 */
export const deleteBill = billId =>
  axios.delete(`/api/v1/admin/bills/${billId}`)
    .then((response) => {
      Materialize.toast(response.data.message, 3000, 'green');
      history.push('/bills');
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

const upvoteBillSuccess = bill => ({ type: types.UPVOTE_BILL_SUCCESS, bill });

const upvoteBillFail = bill => ({ type: types.UPVOTE_BILL_ERROR, bill });
/**
* @function upvoteBill
*
* @param { number } billId
* @param { string } status
*
* @returns {object} dispatches an action
*
* @description It makes an api call to register a new user
*/
export const upvoteBill = (billId, status) => dispatch =>
  axios.post(`/api/v1//bill/upvotes/${billId}`, { status })
    .then((response) => {
      const bill = response.data.votedBill || response.data.updatedVoteCount;
      dispatch(upvoteBillSuccess(bill));
      // Materialize.toast(response.data.message, 3000, 'green');
    }).catch((err) => {
      dispatch(upvoteBillFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

const downvoteBillSuccess = bill => ({ type: types.DOWNVOTE_BILL_SUCCESS, bill });

const downvoteBillFail = bill => ({ type: types.DOWNVOTE_BILL_ERROR, bill });
/**
* @function downvoteBill
*
* @param { number } billId
* @param { string } status
*
* @returns {object} dispatches an action
*
* @description It makes an api call to register a new user
*/
export const downvoteBill = (billId, status) => dispatch =>
  axios.post(`/api/v1//bill/downvotes/${billId}`, { status })
    .then((response) => {
      const bill = response.data.votedBill || response.data.updatedVoteCount;
      dispatch(downvoteBillSuccess(bill));
      // Materialize.toast(response.data.message, 3000, 'green');
    }).catch((err) => {
      dispatch(downvoteBillFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

const addOpinionSuccess = opinions => ({ type: types.ADD_OPINION_SUCCESS, opinions });

const addOpinionFail = opinions => ({ type: types.ADD_OPINION_ERROR, opinions });
/**
* @function addOpinion
*
* @param { number } billId
* @param { object } opinion
*
* @returns {object} dispatches an action
*
* @description It makes an api call to register a new user
*/
export const addOpinion = (billId, opinion) => dispatch =>
  axios.post(`/api/v1/bill/${billId}/opinions`, opinion)
    .then((response) => {
      dispatch(addOpinionSuccess(response.data.newOpinion));
      // Materialize.toast(response.data.message, 3000, 'green');
    }).catch((err) => {
      dispatch(addOpinionFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });


const getOpinionSuccess = opinions => ({ type: types.GET_OPINION_SUCCESS, opinions });

const getOpinionFail = opinions => ({ type: types.GET_OPINION_ERROR, opinions });
/**
* @function getOpinion
*
* @param { number } billId
*
* @returns {object} dispatches an action
*
* @description It makes an api call to register a new user
*/
export const getOpinion = billId => dispatch =>
  axios.get(`/api/v1/bill/${billId}/opinions`)
    .then((response) => {
      dispatch(getOpinionSuccess(response.data));
      // Materialize.toast(response.data.message, 3000, 'green');
    }).catch((err) => {
      dispatch(getOpinionFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });


const searchBillSuccess = bill => ({ type: types.SEARCH_SUCCESS, bill });

const searchBillError = bill => ({ type: types.SEARCH_ERROR, bill });
/**
* @function searchBill
*
* @param { string } searchTerm
* @param { number } offset
*
* @returns {object} dispatches an action
*
* @description It makes an api call to register a new user
*/
export const searchBill = (searchTerm, offset) => dispatch => axios.post(`/api/v1/bills/search?offset=${offset}`, searchTerm)
  .then((response) => {
    dispatch(searchBillSuccess(response.data));
  })
  .catch((error) => {
    dispatch(searchBillError(error));
  });
