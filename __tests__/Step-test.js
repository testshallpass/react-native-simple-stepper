import React from 'react';
import Step from '../src/Step';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Step', () => {
  describe('renders', () => {
    test('snapshot', () => {
      const wrapper = shallow(<Step />);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
    test('defaultProps onPress', () => {
      expect(Step.defaultProps.onPress).toBeDefined();
    });
    test('defaultProps renderImage', () => {
      expect(Step.defaultProps.renderImage).toBeUndefined();
    });
    test('renderImage to be defined', () => {
      const wrapper = shallow(<Step renderImage={() => {}} />);
      expect(wrapper).toBeDefined();
    });
    test('onPress to be defined', () => {
      const wrapper = shallow(<Step onPress={() => {}} />);
      expect(wrapper).toBeDefined();
    });
  });
});
