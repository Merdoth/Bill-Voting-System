import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { EditBill } from
  '../../js/components/EditBill';


window.$ = require('jquery');

/* global jest */
const props = {
  match: {
    params: () => { }
  },
  user: {
    token: {}
  },
  currentBill: {},
  getAllBills: () => { },
  updateBill: jest.fn()
};
const setup = () => shallow(<EditBill {...props} />);

describe('EditBill Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should update bill to the state', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    wrapper.setState({
      image: {}
    });
    const form = wrapper.find('form');
    form.simulate('submit', event);
    expect(props.updateBill).toHaveBeenCalled();
  });
});
describe('onChange()', () => {
  it('should set title to state when input values changes', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'title',
        value: 'The big men in Nigeria'
      }
    };
    const wrapper = setup();
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.title).toBe('The big men in Nigeria');
  });
  it('should set billProgress to state when input values changes', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'billProgress',
        value: 'Senate Voted'
      }
    };
    const wrapper = setup();
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.billProgress).toBe('Senate Voted');
  });
});
