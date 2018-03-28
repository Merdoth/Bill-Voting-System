import expect from 'expect';
import users, { initialState } from '../../js/reducers/users';


describe('Set Search Reducer', () => {
  it('should handle GET_ALL_USERS_SUCCESS action', () => {
    const usersFound = [];

    expect(users(undefined, {
      type: 'GET_ALL_USERS_SUCCESS',
      usersFound
    })).toEqual({ usersFound });
  });

  it('should handle GET_ALL_USERS_ERROR action', () => {
    expect(users(undefined, {
      type: 'GET_ALL_USERS_ERROR'
    })).toEqual({});
  });

  it('should handle ADD_PERMISSION_SUCCESS action', () => {
    const usersFound = [
      undefined
    ];

    expect(users(undefined, {
      type: 'ADD_PERMISSION_SUCCESS',
      usersFound
    })).toEqual({ usersFound });
  });

  it('should handle ADD_PERMISSION_ERROR action', () => {
    expect(users(undefined, {
      type: 'ADD_PERMISSION_ERROR'
    })).toEqual({});
  });
  it('should return original state if action type is not matched', () => {
    expect(users(undefined, {})).toEqual(initialState);
  });
});
