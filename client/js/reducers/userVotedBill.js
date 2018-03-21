import * as types from '../app/actionTypes';

const initialState = {
  userVotes: []
};

const userVotedBill = (state = initialState, action) => {
  console.log(action.userVotedBills, 'this is a response');

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
