import * as types from '../app/actionTypes';

export const initialState = {
  userVotes: []
};

const userVotedBill = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_VOTED_BILLS_SUCCESS:
      return {
        ...state, ...action.userVotedBills
      };
    case types.GET_USER_VOTED_BILLS_ERROR:
      return {};

    default:
      return state;
  }
};

export default userVotedBill;
