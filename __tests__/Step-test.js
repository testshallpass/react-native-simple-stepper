import React from 'react';
import Step from '../src/Step';
import renderer from 'react-test-renderer';

describe('Step', () => {
  describe('renders', () => {
    test('snapshot', () => {
      const wrapper = renderer.create(<Step />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });
    test('defaultProps onPress', () => {
      Step.defaultProps.onPress();
      expect(Step.defaultProps.onPress).toBeDefined();
    });
    test('defaultProps renderImage', () => {
      expect(Step.defaultProps.renderImage).toBeUndefined();
    });
    test('renderImage to be defined', () => {
      const wrapper = renderer.create(<Step renderImage={() => {}} />);
      expect(wrapper).toBeDefined();
    });
    test('onPress to be defined', () => {
      const wrapper = renderer.create(<Step onPress={() => {}} />);
      expect(wrapper).toBeDefined();
    });
  });
});
