import expect from 'expect';
import userVotedBill, { initialState } from '../../js/reducers/userVotedBill';


describe('Set User Voted Bills Reducer', () => {
  it('should handle GET_USER_VOTED_BILLS_SUCCESS action', () => {
    const userVotes = [];

    expect(userVotedBill(undefined, {
      type: 'GET_USER_VOTED_BILLS_SUCCESS',
      userVotes
    })).toEqual({ userVotes });
  });

  it('should handle GET_USER_VOTED_BILLS_ERROR action', () => {
    expect(userVotedBill(undefined, {
      type: 'GET_USER_VOTED_BILLS_ERROR'
    })).toEqual({});
  });

  it('should return original state if action type is not matched', () => {
    expect(userVotedBill(undefined, {})).toEqual(initialState);
  });
});
