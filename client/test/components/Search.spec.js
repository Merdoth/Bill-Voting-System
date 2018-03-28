import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Search } from
  '../../js/components/Search';

/* global jest */

const setup = () => {
  const props = {
    bill: [
      {
        success: true,
        message: 'bill successfully created',
        createdBill: {
          updated_at: '2018-03-27T20:54:34.393Z',
          created_at: '2018-03-27T20:54:34.393Z',
          title: 'JAMB OFFICIALS AND SNAKES',
          description: 'How a snake stole 36million from nigeria jamb who can believe is lie.',
          _id: '5abaaf8a8e736588c24978f3',
          billProgress: 'Not enacted',
          downVoteCount: 0,
          upVoteCount: 0
        },
      },
    ],
    user: {
      token: {}
    },
    result: [],
    searchBill: () => jest.fn(),
    currentPage: {},
    paginate: {
      pageCount: 1
    }
  };

  return shallow(<Search {...props} />);
};

describe('Search Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('onChange()', () => {
    it('should set search to state when input values changes', () => {
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'searchTerm', value: '' }
      };
      const wrapper = setup();
      const searchInput = wrapper.find('#search');

      event.target.value = 'Senators';
      searchInput.simulate('change', event);

      expect(wrapper.instance().state.searchTerm)
        .toBe('Senators');
    });
  });
});
