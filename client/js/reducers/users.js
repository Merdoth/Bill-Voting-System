import * as types from '../app/actionTypes';

const initialState = {
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state, ...action.users
      };
    case types.GET_ALL_USERS_ERROR:
      return {};

    default:
      return state;
  }
};

export default users;
