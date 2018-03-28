import expect from 'expect';
import search, { initialState } from '../../js/reducers/search';


describe('Set Search Reducer', () => {
  it('should handle SEARCH_SUCCESS action', () => {
    const bill = {};

    expect(search(undefined, {
      type: 'SEARCH_SUCCESS',
      bill
    })).toEqual(bill);
  });

  it('should handle SEARCH_ERROR action', () => {
    expect(search(undefined, {
      type: 'SEARCH_ERROR'
    })).toEqual({});
  });

  it('should return original state if action type is not matched', () => {
    expect(search(undefined, {})).toEqual(initialState);
  });
});
