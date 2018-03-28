import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Users } from '../../js/components/Users';

window.$ = require('jquery');

const props = {
  users: [
    {
      _id: '5ab426f31d305b4eaf5b5d9b',
      updated_at: '2018-03-22T22:10:38.604Z',
      created_at: '2018-03-22T21:58:12.000Z',
      fullName: 'Louis nwamadi',
      userName: 'Louisdante9',
      permission: 2,
      email: 'louisdante9@gmail.com',
    }
  ],
  user: {
    token: {}
  },
  getAllUsers: jest.fn(),
  addPermission: jest.fn(),
  currentPage: {}
};
const setup = () => shallow(<Users {...props} />);

describe('Users Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the addPermission request', () => {
    const wrapper = setup();
    const checkbox = wrapper.find('input');
    checkbox.simulate(
      'change',
      { target: { checked: true, id: props.users[0]._id } }
    );
    expect(props.addPermission)
      .toHaveBeenCalledWith(props.users[0]._id, 2, true);
  });
  describe('handlePageClick()', () => {
    it('should get the next all users', () => {
      const wrapper = setup();
      wrapper.instance().handlePageClick({
        selected: 3
      });
      expect(props.getAllUsers).toHaveBeenCalledWith(4);
    });
  });
});

