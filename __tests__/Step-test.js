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
    test('onPress', () => {
      const onPress = () => {};
      const wrapper = shallow(<Step />);
      wrapper.setProps({
        onPress,
      });
      expect(wrapper.prop('onPress')).toEqual(onPress);
      expect(wrapper.props().onPress).toBeDefined();
    });
  });
});
