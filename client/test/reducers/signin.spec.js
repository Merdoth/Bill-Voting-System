import expect from 'expect';
import signin, { initialState } from '../../js/reducers/signIn';


describe('Set Signin Reducer', () => {
  it('should handle LOGIN_USER_SUCCESS action', () => {
    const user = {
      userName: 'Adakhuhf',
      password: 'password'
    };

    expect(signin(undefined, {
      type: 'LOGIN_USER_SUCCESS',
      user
    })).toEqual({ ...user, isLoggedIn: false });
  });

  it('should handle LOGIN_USER_ERROR action', () => {
    expect(signin(undefined, {
      type: 'LOGIN_USER_ERROR'
    })).toEqual({});
  });

  it('should return original state if action type is not matched', () => {
    expect(signin(undefined, {})).toEqual(initialState);
  });
});
