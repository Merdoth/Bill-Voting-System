import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { UpdateUser } from
  '../../js/components/UpdateUser';

window.$ = require('jquery');

/* global jest */

const props = {
  user: {
    token: {}
  },
  getAUser: () => { },
  updateUser: jest.fn(),
  logout: {}
};

const setup = () => shallow(<UpdateUser {...props} />);

describe('UpdateUser Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should return user', () => {
    const wrapper = setup();
    wrapper.setState({
      fullName: 'Samuel Uyali',
      userName: 'Samuel',
      email: 'samuel.uyali@gmail.com',
    });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should update user to the state', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    const form = wrapper.find('form');
    form.simulate('submit', event);
    expect(props.updateUser).toHaveBeenCalled();
  });
});

describe('componentWillReceiveProps()', () => {
  it('should call componentWillReceiveProps()', () => {
    const wrapper = setup();
    wrapper.setProps({ userFound: { fullName: 'test' } });
    expect(wrapper.state('fullName')).toEqual('test');
  });
});

describe('onChange()', () => {
  it('should set fullName to state when input values changes', () => {
    const event = {
      target: { name: 'fullName', value: '' }
    };
    const wrapper = setup();
    const fullNameInput = wrapper.find('#fullName');

    event.target.value = 'Sarah Gigs';
    fullNameInput.simulate('change', event);

    expect(wrapper.instance().state.fullName).toBe('Sarah Gigs');
  });

  it('should set userName state when input values changes', () => {
    const event = {
      target: { name: 'userName', value: '' }
    };
    const wrapper = setup();
    const userNameInput = wrapper.find('#userName');

    event.target.value = 'Sarah';
    userNameInput.simulate('change', event);

    expect(wrapper.instance().state.userName).toBe('Sarah');
  });

  it('should set email state when input values changes', () => {
    const event = {
      target: { name: 'email', value: '' }
    };
    const wrapper = setup();
    const emailInput = wrapper.find('#email');

    event.target.value = 'sarah.gigs@gmail.com';
    emailInput.simulate('change', event);

    expect(wrapper.instance().state.email).toBe('sarah.gigs@gmail.com');
  });
});
