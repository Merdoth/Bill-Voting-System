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
      history.push('/bills');
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
      history.push('/bills');
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
      history.push('/bills');
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

const getAllUsersSuccess = users =>
  ({ type: types.GET_ALL_USERS_SUCCESS, users });

const getAllUsersFailure = users =>
  ({ type: types.GET_ALL_USERS_ERROR, users });

/**
     * @function updateUserDetails
     * @returns {object} dispatches an action
     * @description It logs out the user and deletes token from local storage
     * @param {object} userData form data
     */
export const getAllUsers = () => dispatch =>
  axios.get('/api/v1/admin/users')
    .then((response) => {
      dispatch(getAllUsersSuccess(response.data));
    })
    .catch((response) => {
      dispatch(getAllUsersFailure(response));
    });


const getAUserSuccess = user =>
  ({ type: types.GET_A_USER_SUCCESS, user });

const getAUserFailure = user =>
  ({ type: types.GET_A_USER_ERROR, user });

/**
     * @function updateUserDetails
     *
     * @returns {object} dispatches an action
     *
     * @description It logs out the user and deletes token from local storage
     *
     * @param {object} userId form data
     */
export const getAUser = userId => dispatch =>
  axios.get(`/api/v1/user/${userId}`)
    .then((response) => {
      dispatch(getAUserSuccess(response.data));
    })
    .catch((response) => {
      dispatch(getAUserFailure(response));
    });

const updateUserSuccess = user =>
  ({ type: types.UPDATE_A_USER_SUCCESS, user });

const updateUserFailure = user =>
  ({ type: types.UPDATE_A_USER_ERROR, user });

/**
     * @function updateUserDetails
     *
     * @returns {object} dispatches an action
     *
     * @description It logs out the user and deletes token from local storage
     *
     * @param {object} userData form data
     */
export const updateUser = userData => dispatch =>
  axios.put('/api/v1/user/updateprofile', userData)
    .then((response) => {
      dispatch(updateUserSuccess(response.data.user));
      Materialize.toast(response.data.message, 3000, 'green');
    })
    .catch((response) => {
      dispatch(updateUserFailure(response));
    });
