import * as types from '../app/actionTypes';

const initialState = {
  username: '',
  password: '',
  isLoggedIn: false
};

const signin = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state, action
      };

    case types.SIGN_UP_ADMIN_ERROR:
      return {};

    default:
      return state;
  }
};

export default signin;
