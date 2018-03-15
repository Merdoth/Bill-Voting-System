import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../app/actionTypes';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

const signupSuperAdminSuccess = user =>
  ({ type: types.SIGN_UP_ADMIN_SUCCESS, user });

const signupSuperAdminFail = user =>
  ({ type: types.SIGN_UP_ADMIN_ERROR, user });

/**
 * @function userSignupRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
export const SuperAdminSignupRequest = userData => dispatch =>
  axios.post('/api/v1/admin/signup', userData)
    .then((response) => {
      dispatch(signupSuperAdminSuccess(response));
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      Materialize.toast(response.data.message, 3000, 'rounded green');
      history.push('/dashboard');
    }).catch((err) => {
      dispatch(signupSuperAdminFail(err));
      Materialize.toast(err.response.data.message, 3000, 'rounded red');
    });

const signupUserSuccess = user => ({ type: types.SIGN_UP_USER_SUCCESS, user });

const signupUserFail = user => ({ type: types.SIGN_UP_USER_ERROR, user });

/**
 * @function userSignupRequest
 * @param { object } userData
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
export const userSignupRequest = userData => dispatch =>
  axios.post('/api/v1/user/signup', userData)
    .then((response) => {
      dispatch(signupUserSuccess(response));
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      Materialize.toast(response.data.message, 3000, 'green');
      history.push('/dashboard');
    }).catch((err) => {
      dispatch(signupUserFail(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

const userLoginSuccess = user => ({ type: types.LOGIN_USER_SUCCESS, user });

const userLoginFailed = user => ({ type: types.LOGIN_USER_ERROR, user });

/**
   * @function userLoginRequest
   * @param { object } userData
   * @returns {object} dispatches an action
   * @description It makes an api call to log i a registered user
   */
export const userLoginRequest = userData => dispatch =>
  axios.post('/api/v1/user/signin', userData)
    .then((response) => {
      dispatch(userLoginSuccess(response));
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      Materialize.toast(response.data.message, 3000, 'green');
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch(userLoginFailed(err));
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

const logoutSuccess = user => ({
  type: types.LOGOUT_USER,
  user
});

/**
 * @function logout
 * @returns {object} dispatches an action
 * @description It logs out the user and deletes token from local storage
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(logoutSuccess());
  history.push('/');
};

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

const updateDetailsSuccess = details =>
  ({ type: types.UPDATE_USERDETAILS_SUCCESS, details });

const updateDetailsFailed = details =>
  ({ type: types.UPDATE_USERDETAILS_ERROR, details });

/**
     * @function updateUserDetails
     * @returns {object} dispatches an action
     * @description It logs out the user and deletes token from local storage
     * @param {object} userData form data
     */
export const updateUserDetails = userData => dispatch =>
  axios.put('/api/v1/user/update', userData)
    .then((response) => {
      dispatch(updateDetailsSuccess(response));
      Materialize.toast(response.data.message, 3000, 'rounded green');
      history.push('/my-ideas');
    })
    .catch((response) => {
      dispatch(updateDetailsFailed(response));
      Materialize.toast(response.error, 3000, 'rounded red');
    });

