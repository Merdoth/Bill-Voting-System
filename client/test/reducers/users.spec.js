import expect from 'expect';
import usersReducer, { initialState } from '../../js/reducers/usersReducer';


describe('Set Users Reducer', () => {
  it('should handle GET_ALL_USERS_SUCCESS action', () => {
    const usersFound = { users: [] };

    expect(usersReducer(undefined, {
      type: 'GET_ALL_USERS_SUCCESS',
      usersFound
    })).toEqual(usersFound);
  });

  it('should handle GET_ALL_USERS_ERROR action', () => {
    expect(usersReducer(undefined, {
      type: 'GET_ALL_USERS_ERROR'
    })).toEqual({});
  });

  it('should handle ADD_PERMISSION_SUCCESS action', () => {
    const users = [undefined];

    expect(usersReducer(undefined, {
      type: 'ADD_PERMISSION_SUCCESS',
      users
    })).toEqual({ users });
  });

  it('should handle ADD_PERMISSION_ERROR action', () => {
    expect(usersReducer(undefined, {
      type: 'ADD_PERMISSION_ERROR'
    })).toEqual({});
  });
  it('should return original state if action type is not matched', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });
});
