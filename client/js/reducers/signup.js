
import * as types from '../app/actionTypes';


const initialState = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  loggedIn: false,
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_USER_SUCCESS:
      return {
        ...state, action
      };

    case types.SIGN_UP_USER_ERROR:
      return {};
    default:
      return state;
  }
};

export default signup;
