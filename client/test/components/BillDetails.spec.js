import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { BillDetails } from '../../js/components/BillDetail';

window.$ = require('jquery');

/* global jest */
const props = {
  history: {
    push: () => { }
  },
  match: {
    params: () => { }
  },
  allBills: [
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
  currentBill: {},
  getABill: () => jest.fn(),
  deleteBill: jest.fn(),
  upvoteBill: jest.fn(),
  downvoteBill: jest.fn(),
  addOpinion: jest.fn(),
  getOpinion: () => jest.fn(),
  getAllUsers: () => jest.fn(),
  opinions: [],
};

const setup = () => shallow(<BillDetails {...props} />);

describe('BillDetails Component snapshot', () => {
  it('it should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSubmit()', () => {
    it('should add opinion to state', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const form = wrapper.find('form');
      form.simulate('submit', event);
      expect(props.addOpinion).toHaveBeenCalled();
    });
  });

  describe('handleDelete()', () => {
    it('should delete a bill', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const button = wrapper.find('#delete');
      button.simulate('click', event);
    });
  });


  describe('handleUpVote()', () => {
    it('should add upvote to a bill', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const button = wrapper.find('#upvote');
      button.simulate('click', event);
      expect(props.upvoteBill).toHaveBeenCalled();
    });
  });

  describe('handledownVote()', () => {
    it('should add downvote to a bill', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const wrapper = setup();
      const button = wrapper.find('#downvote');
      button.simulate('click', event);
      expect(props.downvoteBill).toHaveBeenCalled();
    });
  });

  describe('componentDidMount()', () => {
    it('should call componentDidMount()', () => {
      const wrapper = setup();
      wrapper.setProps({ bill: {}, opinions: [], users: [] });
      expect(wrapper.state('bill')).toEqual(undefined);
    });
  });

  describe('onChange()', () => {
    it('should set opinion to state when input values changes', () => {
      const event = {
        target: { name: 'opinion', value: '' }
      };
      const wrapper = setup();
      const opinionInput = wrapper.find('#icon_prefix');

      event.target.value = 'These guys are just jokers';
      opinionInput.simulate('change', event);

      expect(wrapper.instance().state.opinion)
        .toBe('These guys are just jokers');
    });
  });
});

