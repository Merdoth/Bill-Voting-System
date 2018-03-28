import expect from 'expect';
import bill, { initialState } from '../../js/reducers/bill';


describe('Set Bill Reducer', () => {

  it('should handle GET_BILL_SUCCESS action', () => {
    const billFound = {};

    expect(bill(undefined, {
      type: 'GET_BILL_SUCCESS',
      billFound
    })).toEqual({ billFound });
  });

  it('should handle GET_BILL_ERROR action', () => {
    expect(bill(undefined, {
      type: 'GET_BILL_ERROR'
    })).toEqual({});
  });

  it('should handle UPVOTE_BILL_SUCCESS action', () => {
    const billFound = {};

    expect(bill(undefined, {
      type: 'UPVOTE_BILL_SUCCESSS',
      billFound
    })).toEqual({ billFound });
  });

  it('should handle UPVOTE_BILL_ERROR action', () => {
    expect(bill(undefined, {
      type: 'UPVOTE_BILL_ERROR'
    })).toEqual({});
  });

  it('should handle DOWNVOTE_BILL_SUCCESS action', () => {
    const billFound = {};

    expect(bill(undefined, {
      type: 'DOWNVOTE_BILL_SUCCESS',
      billFound
    })).toEqual({ billFound });
  });

  it('should handle DOWNVOTE_BILL_ERROR action', () => {
    expect(bill(undefined, {
      type: 'DOWNVOTE_BILL_ERROR'
    })).toEqual({});
  });
  
  it('should return original state if action type is not matched', () => {
    expect(bill(undefined, {})).toEqual(initialState);
  });
});
