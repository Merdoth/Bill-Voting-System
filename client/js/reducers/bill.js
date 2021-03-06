import * as types from '../app/actionTypes';

export const initialState = {
  billFound: {}
};

const bill = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BILL_SUCCESS:
      return {
        ...state, ...action.bill
      };
    case types.UPVOTE_BILL_SUCCESS:
      return {
        ...state, billFound: { ...action.bill }
      };
    case types.DOWNVOTE_BILL_SUCCESS:
      return {
        ...state, billFound: { ...action.bill }
      };
    case types.UPVOTE_BILL_ERROR:
    case types.DOWNVOTE_BILL_ERROR:
    case types.GET_BILL_ERROR:
      return {};

    default:
      return state;
  }
};

export default bill;
