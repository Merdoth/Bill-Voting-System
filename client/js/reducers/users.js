import * as types from '../app/actionTypes';

export const initialState = {
  usersFound: []
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state, ...action.usersFound
      };
    case types.ADD_PERMISSION_SUCCESS:
      const usersFound = state.usersFound;
      const filteredUsers = usersFound.filter(({ _id }) => _id !== action.user._id);

      return {
        ...state, usersFound: [action.user, ...filteredUsers]
      };
    case types.ADD_PERMISSION_ERROR:
    case types.GET_ALL_USERS_ERROR:
      return {};

    default:
      return state;
  }
};

export default users;
