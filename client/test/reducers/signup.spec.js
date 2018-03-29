import expect from 'expect';
import signup, { initialState } from '../../js/reducers/signup';


describe('Set Signup Reducer', () => {
  it('should handle SIGN_UP_USER_SUCCESS action', () => {
    const user = {
      fullName: 'Sarah Gi',
      userName: 'sargigs',
      email: 'sarg@gmail.com',
      password: 'password'
    };

    expect(signup(undefined, {
      type: 'SIGN_UP_USER_SUCCESS',
      user
    })).toEqual({ ...user, loggedIn: false });
  });

  it('should handle SIGN_UP_USER_ERROR action', () => {
    expect(signup(undefined, {
      type: 'SIGN_UP_USER_ERROR'
    })).toEqual({});
  });

  it('should return original state if action type is not matched', () => {
    expect(signup(undefined, {})).toEqual(initialState);
  });
});
