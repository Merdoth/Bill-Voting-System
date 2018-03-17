import * as types from '../app/actionTypes';

const initialState = {
  opinions: []
};

const opinion = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_OPINION_SUCCESS:
      return {
        ...state, ...action.opinions
      };
    case types.ADD_OPINION_SUCCESS:
      return {
        ...state, opinions: [...state.opinions, action.opinions]
      };
    case types.DOWNVOTE_BILL_SUCCESS:
      return {
        ...state, billFound: { ...action.bill }
      };
    case types.GET_OPINION_ERROR:
    case types.ADD_OPINION_ERROR:
      return {};

    default:
      return state;
  }
};

export default opinion;
