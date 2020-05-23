import React from 'react';
import ImageView from '../src/ImageView';
import renderer from 'react-test-renderer';

describe('ImageView', () => {
  describe('renders', () => {
    test('snapshot', () => {
      const wrapper = renderer.create(<ImageView />).toJSON();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
