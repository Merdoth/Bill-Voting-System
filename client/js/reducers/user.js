import * as types from '../app/actionTypes';

const initialState = {
  userFound: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_A_USER_SUCCESS:
      return {
        ...state, ...action.user
      };
    case types.UPDATE_A_USER_SUCCESS:
      return {
        ...state, userFound: {...action.user }
      };
    case types.UPDATE_A_USER_ERROR:
    case types.GET_A_USER_ERROR:
      return {};

    default:
      return state;
  }
};

export default user;
