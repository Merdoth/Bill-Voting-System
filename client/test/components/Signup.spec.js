import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Signup } from
  '../../js/components/Signup';

window.$ = require('jquery');

const props = {
  userSignupRequest: jest.fn(),
};

const setup = () => shallow(<Signup {...props} />);

describe('SigninForm Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSubmit()', () => {
    it('should signup a user', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const form = wrapper.find('form');
      form.simulate('submit', event);
      expect(props.userSignupRequest).toHaveBeenCalled();
    });
  });
});
