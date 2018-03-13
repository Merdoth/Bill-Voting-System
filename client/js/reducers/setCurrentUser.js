
import isEmpty from 'lodash/isEmpty';
import * as types from '../app/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const setCurrentUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
};
export default setCurrentUser;
