import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SuperAdminSignup } from
  '../../js/components/SuperAdminSignup';

window.$ = require('jquery');

const props = {
  SuperAdminSignupRequest: jest.fn(),
};


const setup = () => shallow(<SuperAdminSignup {...props} />);

describe('SuperAdminSignup Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSubmit()', () => {
    it('should signup a super-admin', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const form = wrapper.find('form');
      form.simulate('submit', event);
      expect(props.SuperAdminSignupRequest).toHaveBeenCalled();
    });
  });
});
