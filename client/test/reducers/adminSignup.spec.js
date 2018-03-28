import expect from 'expect';
import adminSignup, { initialState } from '../../js/reducers/adminSignup';


describe('Super-admin Signup Reducer', () => {
  it('should return original state if action type is not matched', () => {
    expect(adminSignup(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGN_UP_ADMIN_SUCCESS action', () => {
    const user = {
      fullName: 'Sarah Gigs',
      userName: 'super-admin',
      email: 'sargig@gmail.com',
      password: 'password'
    };

    expect(adminSignup(undefined, {
      type: 'SIGN_UP_ADMIN_SUCCESS',
      user
    })).toEqual({ ...user, loggedIn: false });
  });

  it('should handle SIGN_UP_ADMIN_ERROR action', () => {
    expect(adminSignup(undefined, {
      type: 'SIGN_UP_ADMIN_ERROR'
    })).toEqual({});
  });
});
