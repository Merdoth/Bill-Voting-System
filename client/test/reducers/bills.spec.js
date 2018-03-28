import expect from 'expect';
import bills, { initialState } from '../../js/reducers/bills';


describe('Set Bill Reducer', () => {
  it('should handle GET_BILL_SUCCESS action', () => {
    const allBills = [];

    expect(bills(undefined, {
      type: 'GET_BILLS_SUCCESS',
      allBills
    })).toEqual({ allBills });
  });

  it('should handle GET_BILL_ERROR action', () => {
    expect(bills(undefined, {
      type: 'GET_BILLS_ERROR'
    })).toEqual({});
  });

  it('should return original state if action type is not matched', () => {
    expect(bills(undefined, {})).toEqual(initialState);
  });
});
