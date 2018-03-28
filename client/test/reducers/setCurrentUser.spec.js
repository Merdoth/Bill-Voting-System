import expect from 'expect';
import setCurrentUser, { initialState } from '../../js/reducers/setCurrentUser';


describe('Set Current User Reducer', () => {
  it('should return original state if action type is not matched', () => {
    expect(setCurrentUser()).toEqual(initialState);
  });


  it('should handle SET_CURRENT_USER action', () => {
    const user = { fullName: 'Sarah Gigs' };

    expect(setCurrentUser(undefined, {
      type: 'SET_CURRENT_USER',
      user
    })).toEqual({
      isAuthenticated: true,
      user
    });

    expect(setCurrentUser(undefined, {
      type: 'SET_CURRENT_USER',
      user: {}
    })).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
});
