
import * as types from '../app/actionTypes';


export const initialState = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  loggedIn: false,
};

const adminSignup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_ADMIN_SUCCESS:
      return { ...state, ...action.user };

    case types.SIGN_UP_ADMIN_ERROR:
      return {};
    default:
      return state;
  }
};

export default adminSignup;
