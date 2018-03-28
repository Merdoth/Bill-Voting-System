import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Bills } from
  '../../js/components/Bills';

window.$ = require('jquery');

const props = {
  bills: [
    {
      _id: '5ab8e269f10a5e001481c955',
      updated_at: '2018-03-26T12:07:05.593Z',
      created_at: '2018-03-26T12:07:05.593Z',
      title: 'JAMB OFFICIALS ',
      description: 'The stole money',
      billProgress: 'Not enacted',
      downVoteCount: 0,
      upVoteCount: 0
    }
  ],
  user: {
    token: {}
  },
  getAllBills: jest.fn(),
  allBills: [],
  currentPage: {}
};

const setup = () => shallow(<Bills {...props} />);

describe('Bills Component snapshot', () => {
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
        expect(props.getAllBills).toHaveBeenCalledWith(4);
      });
    });
  });
});

