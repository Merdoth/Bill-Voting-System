import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../app/actionTypes';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';


const getBillsSuccess = bills =>
  ({ type: types.GET_BILLS_SUCCESS, bills });

const getBillsFailed = bills =>
  ({ type: types.GET_BILLS_ERROR, bills });

/**
   * @function getUserDetails
   * @returns {object} dispatches an action
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
 * @function createBillRequest
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
 * @function createBillRequest
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
