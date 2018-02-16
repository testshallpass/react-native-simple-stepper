import { Image } from 'react-native';
import React from 'react';
import SimpleStepper from '../SimpleStepper';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
const reactNativeLogo = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

test('renders correctly', () => {
  const wrapper = shallow(<SimpleStepper />);
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('test incrementAction', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.instance().incrementAction();
  expect(wrapper.state().value).toBe(1);
});
test('test decrementAction', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.instance().decrementAction();
  expect(wrapper.state().value).toBe(0);
  expect(wrapper.state().hasReachedMin).toBe(true);
});
test('test incrementAction with wraps', () => {
  const wrapper = shallow(<SimpleStepper wraps={true} initialValue={10} />);
  wrapper.instance().incrementAction();
  expect(wrapper.state().value).toBe(0);
});
test('test decrementAction with wraps', () => {
  const wrapper = shallow(<SimpleStepper wraps={true} />);
  wrapper.instance().decrementAction();
  expect(wrapper.state().value).toBe(10);
});
test('state values to match expected', () => {
  const wrapper = shallow(<SimpleStepper />);
  expect(wrapper.state().value).toEqual(0);
  expect(wrapper.state().decrementOpacity).toBe(0.5);
  expect(wrapper.state().incrementOpacity).toBe(1);
  expect(wrapper.state().hasReachedMin).toBe(true);
  expect(wrapper.state().hasReachedMax).toBe(false);
  expect(wrapper.state().stepValue).toEqual(1);
});
test('validate max value to be true', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.instance().validateValue(10, 0, 10, false, 1);
  expect(wrapper.state().value).toBe(10);
  expect(wrapper.state().hasReachedMax).toBe(true);
});
test('tintColor to be blue', () => {
  const wrapper = shallow(<SimpleStepper tintColor={'blue'} />);
  const tintStyle = wrapper.instance().tintStyle(true);
  expect(tintStyle).toEqual({ tintColor: 'blue' });
});
test('tintColor to be null', () => {
  const wrapper = shallow(<SimpleStepper tintColor={'blue'} />);
  const tintStyle = wrapper.instance().tintStyle(false);
  expect(tintStyle).toBeNull();
});
test('increment type imageSrc to be uri object', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc(reactNativeLogo, 'increment');
  expect(imageSrc).toEqual({
    uri: reactNativeLogo,
  });
});
test('increment type imageSrc to be local asset number', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc('', 'increment');
  expect(imageSrc).toEqual(1);
});
test('increment type imageSrc to be null', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc(null, 'increment');
  expect(imageSrc).toBeNull();
});
test('decrement type imageSrc to be local asset number', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc('', 'decrement');
  expect(imageSrc).toEqual(1);
});
test('decrement type imageSrc to be undefined', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc(undefined, 'decrement');
  expect(imageSrc).toBeUndefined();
});
test('unknown type imageSrc to be empty string', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc('', 'unknown');
  expect(imageSrc).toEqual('');
});
test('unknown type imageSrc to be {uri: \' \'}', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageSrc = wrapper.instance().imageSrc(' ', 'unknown');
  expect(imageSrc).toEqual({uri: ' '});
});
test('imageStyle to be with non-empty src string', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageStyle = wrapper.instance().imageStyle(' ', 36, 36);
  expect(imageStyle).toEqual({ width: 36, height: 36 });
});
test('imageStyle to be null', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageStyle = wrapper.instance().imageStyle(null, 36, 36);
  expect(imageStyle).toBeNull();
});
test('imageStyle to be null with empty string', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageStyle = wrapper.instance().imageStyle('', 36, 36);
  expect(imageStyle).toBeNull();
});
test('imageStyle to be style object', () => {
  const wrapper = shallow(<SimpleStepper />);
  const imageStyle = wrapper.instance().imageStyle(reactNativeLogo, 69, 69);
  expect(imageStyle).toEqual({ width: 69, height: 69 });
});
test('renderImage to be Image', () => {
  const wrapper = shallow(<SimpleStepper />);
  const renderImage = wrapper.instance().renderImage('eeeee', {}, {}, 1, 1);
  expect(renderImage).toEqual(<Image source={1} style={[{}, {}, { opacity: 1 }]} />);
});
test('renderImage to be Mock Function', () => {
  const wrapper = shallow(<SimpleStepper />);
  const renderImage = wrapper.instance().renderImage(jest.fn, {}, {}, 1, 1);
  expect(jest.isMockFunction(renderImage)).toEqual(true);
});
test('validateValue to warn with step equal to 0', () => {
  const wrapper = shallow(<SimpleStepper valueChanged={jest.fn()} />);
  const validateValue = wrapper.instance().validateValue(10, 1, 11, false, 0, false);
  expect(wrapper.instance().state.stepValue).toEqual(0);
});
test('stepValue equal to -1 with wraps', () => {
  const wrapper = shallow(<SimpleStepper />);
  const validateValue = wrapper.instance().validateValue(0, -5, 5, false, -1, true);
  expect(wrapper.instance().state.stepValue).toEqual(-1);
});
test('stepValue equal to -1 without wrap', () => {
  const wrapper = shallow(<SimpleStepper />);
  const validateValue = wrapper.instance().validateValue(6, -5, 5, false, -1, false);
  expect(wrapper.instance().state.stepValue).toEqual(-1);
});
test('test initialValue and stepValue prop change', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    initialValue: 1,
    stepValue: 2,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test disabled prop change', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    disabled: true,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test min and max prop change', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    minimumValue: 5,
    maximumValue: 30,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test min and max prop change less and greater', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    minimumValue: 11,
    maximumValue: -1,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test max prop chang less than min', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    maximumValue: -1,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test min prop change greater than max', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    minimumValue: 11,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test initialValue, disabled, min and max prop change', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    initialValue: 0,
    disabled: false,
    minimumValue: 0,
    maximumValue: 10,
  });
  expect(wrapper.instance()).toBeDefined();
});
test('test initialValue, disabled, min and max prop change with max less than min', () => {
  const wrapper = shallow(<SimpleStepper />);
  wrapper.setProps({
    initialValue: 0,
    disabled: false,
    minimumValue: 9,
    maximumValue: -1,
  });
  expect(wrapper.instance()).toBeDefined();
});