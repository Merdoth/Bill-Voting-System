import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockData from '../__mocks__/mockData';
import * as types from '../../js/app/actionTypes';
import * as billActions from '../../js/actions/bill';


/* global expect jest */

const mockStore = configureMockStore([thunk]);
window.localStorage = mockLocalStorage;
window.Materialize = {
  toast: () => (jest.fn())
};


describe('Bills action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_BILL_SUCCESS', (done) => {
    const { bill } = mockData;
    moxios.stubRequest(`/api/v1/bills/${bill.billFound._id}`, {
      status: 200,
      response: bill
    });
    const expectedActions = [{
      type: types.GET_BILL_SUCCESS,
      bill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.getABill(bill.billFound._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch GET_BILL_ERROR', (done) => {
    const bill = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/bills/200', {
      status: 404,
      response: bill
    });
    const expectedActions = [{
      type: types.GET_BILL_ERROR,
      bill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.getABill(200))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });


  it('should dispatch GET_BILLS_SUCCESS', (done) => {
    const { bills } = mockData;
    moxios.stubRequest('/api/v1/bills?page=1', {
      status: 200,
      response: bills
    });
    const expectedActions = [{
      type: types.GET_BILLS_SUCCESS,
      bills,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.getAllBills(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_BILLS_ERROR', (done) => {
    const bills = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/bills?page=10', {
      status: 404,
      response: bills
    });
    const expectedActions = [{
      type: types.GET_BILLS_ERROR,
      bills,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.getAllBills(10))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch UPVOTE_BILL_SUCCESS', (done) => {
    const { status, bill, votedBill } = mockData;
    moxios.stubRequest(`/api/v1/bill/upvotes/${bill.billFound._id}`, {
      status: 201,
      response: {
        bill: {
          votedBill
        }
      }
    });
    const expectedActions = [{
      type: types.UPVOTE_BILL_SUCCESS,
      bill: bill.votedBill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .upvoteBill(bill.billFound._id, status.upvote))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch UPVOTE_BILL_ERROR', (done) => {
    const bill = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/bill/upvotes/200', {
      status: 404,
      response: bill
    });
    const expectedActions = [{
      type: types.UPVOTE_BILL_ERROR,
      bill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.upvoteBill(200))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch DOWNVOTE_BILL_SUCCESS', (done) => {
    const { status, bill, votedBill } = mockData;
    moxios.stubRequest(`/api/v1/bill/downvotes/${bill.billFound._id}`, {
      status: 201,
      response: {
        bill: {
          votedBill
        }
      }
    });
    const expectedActions = [{
      type: types.DOWNVOTE_BILL_SUCCESS,
      bill: bill.votedBill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .downvoteBill(bill.billFound._id, status.downvote))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch DOWNVOTE_BILL_ERROR', (done) => {
    const bill = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/bill/downvotes/200', {
      status: 404,
      response: bill
    });
    const expectedActions = [{
      type: types.DOWNVOTE_BILL_ERROR,
      bill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.downvoteBill(200))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch ADD_OPINION_SUCCESS', (done) => {
    const { opinions, bill, opinion } = mockData;
    moxios.stubRequest(`/api/v1/bill/${bill.billFound._id}/opinions`, {
      status: 201,
      response: {
        opinions: {
          opinion
        }
      }
    });
    const expectedActions = [{
      type: types.ADD_OPINION_SUCCESS,
      opinions: opinion,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .addOpinion(bill.billFound._id, opinions))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_OPINION_SUCCESS', (done) => {
    const { opinions, bill } = mockData;
    moxios.stubRequest(`/api/v1/bill/${bill.billFound._id}/opinions`, {
      status: 200,
      response: opinions
    });
    const expectedActions = [{
      type: types.GET_OPINION_SUCCESS,
      opinions,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .getOpinion(bill.billFound._id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_OPINION_ERROR', (done) => {
    const opinions = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/bill/200/opinions', {
      status: 404,
      response: opinions
    });
    const expectedActions = [{
      type: types.GET_OPINION_ERROR,
      opinions,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.getOpinion(200))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch SEARCH_SUCCESS', (done) => {
    const { searchTerm, bill } = mockData;
    moxios.stubRequest('/api/v1/bills/search?offset=1', {
      status: 202,
      response: bill
    });
    const expectedActions = [{
      type: types.SEARCH_SUCCESS,
      bill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .searchBill(searchTerm, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch SEARCH_ERROR', (done) => {
    const { searchTerm1 } = mockData;
    const bill = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/bills/search?offset=1', {
      status: 404,
      response: bill
    });
    const expectedActions = [{
      type: types.SEARCH_ERROR,
      bill,
    }];
    const store = mockStore({});

    return store.dispatch(billActions.searchBill(searchTerm1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_USER_VOTED_BILLS_SUCCESS', (done) => {
    const { userVotedBills } = mockData;
    moxios.stubRequest('/api/v1/user/votedbills?page=1', {
      status: 200,
      response: userVotedBills
    });
    const expectedActions = [{
      type: types.GET_USER_VOTED_BILLS_SUCCESS,
      userVotedBills,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .getUserVotedBills(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_USER_VOTED_BILLS_ERROR', (done) => {
    const userVotedBills = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/user/votedbills?page=1', {
      status: 404,
      response: userVotedBills
    });
    const expectedActions = [{
      type: types.GET_USER_VOTED_BILLS_ERROR,
      userVotedBills,
    }];
    const store = mockStore({});

    return store.dispatch(billActions
      .getUserVotedBills(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
