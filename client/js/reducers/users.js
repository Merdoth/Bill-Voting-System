import * as types from '../app/actionTypes';

const initialState = {
  users: []
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state, ...action.users
      };
    case types.ADD_PERMISSION_SUCCESS:
      const users = state.users;
      const filteredUsers = users.filter(({ _id }) => _id !== action.user._id);

      return {
        ...state, users: [action.user, ...filteredUsers]
      };
    case types.ADD_PERMISSION_ERROR:
    case types.GET_ALL_USERS_ERROR:
      return {};

    default:
      return state;
  }
};

export default users;
