import React from 'react';
import ImageView from '../src/ImageView';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('ImageView', () => {
  describe('renders', () => {
    test('snapshot', () => {
      const wrapper = shallow(<ImageView />);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
  });
});
