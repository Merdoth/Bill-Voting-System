import * as types from '../app/actionTypes';

export const initialState = {
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return {
        ...state, ...action.bill
      };
    case types.SEARCH_ERROR:
      return {};

    default:
      return state;
  }
};

export default search;
