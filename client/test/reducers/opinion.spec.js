import expect from 'expect';
import opinion, { initialState } from '../../js/reducers/opinion';


describe('Set Opinion Reducer', () => {
  it('should handle GET_OPINION_SUCCESS action', () => {
    const opinions = [];

    expect(opinion(undefined, {
      type: 'GET_OPINION_SUCCESS',
      opinions
    })).toEqual({ opinions });
  });

  it('should handle GET_BILL_ERROR action', () => {
    expect(opinion(undefined, {
      type: 'GET_OPINION_ERROR'
    })).toEqual({});
  });

  it('should handle ADD_OPINION_SUCCESS action', () => {
    const opinions = [];

    expect(opinion(undefined, {
      type: 'ADD_OPINION_SUCCESS',
      opinions
    })).toEqual({ opinions: [opinions] });
  });

  it('should handle ADD_OPINION_ERROR action', () => {
    expect(opinion(undefined, {
      type: 'ADD_OPINION_ERROR'
    })).toEqual({});
  });

  it('should return original state if action type is not matched', () => {
    expect(opinion(undefined, {})).toEqual(initialState);
  });
});
