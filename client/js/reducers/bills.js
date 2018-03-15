import * as types from '../app/actionTypes';

const initialState = {
  allBills: []
};

const bills = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BILLS_SUCCESS:
      return {
        ...state, ...action.bills
      };

    case types.GET_BILLS_ERROR:
      return {};

    default:
      return state;
  }
};

export default bills;
