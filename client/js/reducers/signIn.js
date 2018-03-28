import * as types from '../app/actionTypes';

export const initialState = {
  userName: '',
  password: '',
  isLoggedIn: false
};

const signin = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state, ...action.user
      };

    case types.LOGIN_USER_ERROR:
      return {};

    default:
      return state;
  }
};

export default signin;
