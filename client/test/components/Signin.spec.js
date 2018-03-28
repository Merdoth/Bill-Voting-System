import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Signin } from
  '../../js/components/Signin';

const props = {
  userLoginRequest: jest.fn()
};
const setup = () => shallow(<Signin {...props} />);

describe('SigninForm Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSubmit()', () => {
    it('should signin a user', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const form = wrapper.find('form');
      form.simulate('submit', event);
      expect(props.userLoginRequest).toHaveBeenCalled();
    });
  });
});
