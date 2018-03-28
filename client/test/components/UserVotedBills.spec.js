import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { UserVotedBills } from
  '../../js/components/UserVotedBills';

window.$ = require('jquery');

/* global jest */
const props = {
  userVotedBills: [
    {
      _id: '5ab6aeec46c66b6bc4980d7b',
      updated_at: '2018-03-24T20:02:52.884Z',
      created_at: '2018-03-24T20:02:52.884Z',
      status: 'upvote',
      votedBill: {
        _id: '5ab62c1e2dbcda1e102a79fa',
        updated_at: '2018-03-25T16:23:01.659Z',
        created_at: '2018-03-24T10:44:46.320Z',
        title: 'SENATORS',
        description: 'Nigerian Senators cannot stop all these their lies.',
        billProgress: 'House passed',
        downVoteCount: 2,
        upVoteCount: 2
      },
      votedBy: '5ab626352dbcda1e102a79f7',
    }
  ],
  user: {
    token: {}
  },
  getUserVotedBills: jest.fn(),
  votedBills: [],
  currentPage: {},
};

const setup = () => shallow(<UserVotedBills {...props} />);

describe('UserVotedBills Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('handlePageClick()', () => {
    describe('handlePageClick()', () => {
      it('should get the next all users', () => {
        const wrapper = setup();
        wrapper.instance().handlePageClick({
          selected: 3
        });
        expect(props.getUserVotedBills).toHaveBeenCalledWith(4);
      });
    });
  });
});
