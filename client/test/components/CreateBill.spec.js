import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { CreateBill } from
  '../../js/components/CreateBill';

const props = {
  user: {
    token: {}
  },
  createBillRequest: jest.fn(),
};

/* global jest */
const setup = () => shallow(<CreateBill {...props} />);

describe('CreateBill Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onSubmit()', () => {
  it('should add recipes to the state', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = setup();
    const form = wrapper.find('form');
    form.simulate('submit', event);
    expect(props.createBillRequest).toHaveBeenCalled();
  });
});

describe('onChange()', () => {
  it('should set title to state when input values changes', () => {
    const event = {
      target: { name: 'title', value: '' }
    };
    const wrapper = setup();
    const titleInput = wrapper.find('#title');

    event.target.value = 'Seyi Law in senate';
    titleInput.simulate('change', event);

    expect(wrapper.instance().state.title).toBe('Seyi Law in senate');
  });

  it('should set description state when input values changes', () => {
    const event = {
      target: { name: 'description', value: '' }
    };
    const wrapper = setup();
    const descriptionInput = wrapper.find('#description');

    event.target.value = 'This is how nigeria senate shows its madness';
    descriptionInput.simulate('change', event);

    expect(wrapper.instance().state.description)
      .toBe('This is how nigeria senate shows its madness');
  });
});
