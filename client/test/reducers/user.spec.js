import expect from 'expect';
import user, { initialState } from '../../js/reducers/user';


describe('Set User Reducer', () => {
  it('should handle GET_A_USER_SUCCESS action', () => {
    const userFound = {
    };

    expect(user(undefined, {
      type: 'GET_A_USER_SUCCESS',
      userFound
    })).toEqual({ userFound });
  });

  it('should handle GET_A_USER_ERROR action', () => {
    expect(user(undefined, {
      type: 'GET_A_USER_ERROR'
    })).toEqual({});
  });

  it('should handle UPDATE_A_USER_SUCCESS action', () => {
    const userFound = {
    };

    expect(user(undefined, {
      type: 'UPDATE_A_USER_SUCCESS',
      userFound
    })).toEqual({ userFound });
  });

  it('should handle UPDATE_A_USER_ERROR action', () => {
    expect(user(undefined, {
      type: 'UPDATE_A_USER_ERROR'
    })).toEqual({});
  });
  it('should return original state if action type is not matched', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });
});
