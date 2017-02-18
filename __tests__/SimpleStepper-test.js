import 'react-native';
import React from 'react';
import SimpleStepper from '../SimpleStepper';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <SimpleStepper />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
