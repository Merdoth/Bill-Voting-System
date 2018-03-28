import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SideBar } from
  '../../js/components/SideBar';

const logout = jest.fn();
const event = {
  preventDefault: jest.fn(),
};
const setup = permission => shallow(<SideBar logout={logout} permission={permission} />);

describe('SideBar Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup(3);
    expect(wrapper).toMatchSnapshot();
  });

  describe('logout()', () => {
    it('should logout a user', () => {
      [1, 2, 3].forEach((permission) => {
        const wrapper = setup(permission);
        const button = wrapper.find('#logout');
        button.simulate('click', event);
        expect(logout).toHaveBeenCalled();
      });
    });
  });
});
