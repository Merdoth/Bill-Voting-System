import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import moxios from 'moxios';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockData from '../__mocks__/mockData';
import * as types from '../../js/app/actionTypes';
import * as userActions from '../../js/actions/user';
import history from '../../js/utils/history';


/* global expect jest */

const mockStore = configureMockStore([thunk]);
window.localStorage = mockLocalStorage;
window.Materialize = {
  toast: () => (jest.fn())
};
history.push = jest.fn();

describe('User action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('User authentication action creators', () => {
    it('should dispatch SIGN_UP_ADMIN_SUCCESS', () => {
      const { user, token } = mockData;
      moxios.stubRequest('/api/v1/admin/signup', {
        status: 201,
        response: {
          user,
          token
        }
      });
      const expectedActions = [{
        type: types.SIGN_UP_ADMIN_SUCCESS,
        user: {
          user,
          token
        },
      }, {
        type: types.SET_CURRENT_USER, user: jwt.decode(token)
      }];
      const store = mockStore({});

      return store.dispatch(userActions
        .SuperAdminSignupRequest(user.userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(history.push.mock.calls[0][0]).toEqual('/bills');
        });
    });

    it('should dispatch SIGN_UP_ADMIN_ERROR', (done) => {
      const user = new Error('Request failed with status code 400');
      moxios.stubRequest('/api/v1/admin/signup', {
        status: 400,
        response: user
      });
      const expectedActions = [{
        type: types.SIGN_UP_ADMIN_ERROR,
        user,
      }];
      const store = mockStore({});

      return store.dispatch(userActions.SuperAdminSignupRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SIGN_UP_USER_SUCCESS', () => {
      const { user, token } = mockData;
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
        response: {
          user,
          token
        }
      });
      const expectedActions = [{
        type: types.SIGN_UP_USER_SUCCESS,
        user: {
          user,
          token
        },
      }, {
        type: types.SET_CURRENT_USER, user: jwt.decode(token)
      }];
      const store = mockStore({});

      return store.dispatch(userActions
        .userSignupRequest(user.userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(history.push.mock.calls[0][0]).toEqual('/bills');
        });
    });

    it('should dispatch SIGN_UP_USER_ERROR', (done) => {
      const user = new Error('Request failed with status code 400');
      moxios.stubRequest('/api/v1/user/signup', {
        status: 400,
        response: user
      });
      const expectedActions = [{
        type: types.SIGN_UP_USER_ERROR,
        user,
      }];
      const store = mockStore({});

      return store.dispatch(userActions.userSignupRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch LOGIN_USER_SUCCESS', () => {
      const { user, token } = mockData;
      moxios.stubRequest('/api/v1/user/signin', {
        status: 201,
        response: {
          user,
          token
        }
      });
      const expectedActions = [{
        type: types.LOGIN_USER_SUCCESS,
        user: {
          user,
          token
        },
      }, {
        type: types.SET_CURRENT_USER, user: jwt.decode(token)
      }];
      const store = mockStore({});

      return store.dispatch(userActions
        .userLoginRequest(user.userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(history.push.mock.calls[0][0]).toEqual('/bills');
        });
    });

    it('should dispatch LOGIN_USER_ERROR', (done) => {
      const user = new Error('Request failed with status code 400');
      moxios.stubRequest('/api/v1/user/signin', {
        status: 400,
        response: user
      });
      const expectedActions = [{
        type: types.LOGIN_USER_ERROR,
        user,
      }];
      const store = mockStore({});

      return store.dispatch(userActions.userLoginRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('UserActions action creators', () => {
    it('should dispatch GET_ALL_USERS_SUCCESS', () => {
      const { usersFound } = mockData;
      moxios.stubRequest('/api/v1/admin/users?page=1', {
        status: 200,
        response:
          usersFound
      });
      const expectedActions = [{
        type: types.GET_ALL_USERS_SUCCESS,
        usersFound
      }];
      const store = mockStore({});

      return store.dispatch(userActions.getAllUsers(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should dispatch GET_ALL_USERS_ERROR', (done) => {
      const usersFound = new Error('Request failed with status code 404');
      moxios.stubRequest('/api/v1/admin/users?page=1', {
        status: 404,
        response: usersFound
      });
      const expectedActions = [{
        type: types.GET_ALL_USERS_ERROR,
        usersFound,
      }];
      const store = mockStore({});

      return store.dispatch(userActions.getAllUsers(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch GET_A_USER_SUCCESS', () => {
      const { users, user } = mockData;
      moxios.stubRequest(`/api/v1/user/${users.user2._id}`, {
        status: 200,
        response:
          user
      });
      const expectedActions = [{
        type: types.GET_A_USER_SUCCESS,
        user
      }];
      const store = mockStore({});

      return store.dispatch(userActions.getAUser(users.user2._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch GET_A_USER_ERROR', (done) => {
      const user = new Error('Request failed with status code 404');
      moxios.stubRequest('/api/v1/user/200', {
        status: 404,
        response: user
      });
      const expectedActions = [{
        type: types.GET_A_USER_ERROR,
        user,
      }];
      const store = mockStore({});

      return store.dispatch(userActions.getAUser(200))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch UPDATE_A_USER_ERROR', (done) => {
      const user = new Error('Request failed with status code 404');
      moxios.stubRequest('/api/v1/user/updateprofile', {
        status: 404,
        response: user
      });
      const expectedActions = [{
        type: types.UPDATE_A_USER_ERROR,
        user,
      }];
      const store = mockStore({});

      return store.dispatch(userActions.updateUser(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
