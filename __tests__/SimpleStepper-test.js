import React from 'react';
import SimpleStepper from '../src/SimpleStepper';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
const reactNativeLogo = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
const STEP = {
  increment: 'increment',
  decrement: 'decrement',
  unknown: 'unknown',
};

describe('SimpleStepper', () => {
  describe('renders', () => {
    test('snapshot', () => {
      const wrapper = shallow(<SimpleStepper />);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
  });
  describe('componentDidMount', () => {});
  describe('componentDidReceiveProps', () => {
    test('test value is different', () => {
      const wrapper = shallow(<SimpleStepper />);
      wrapper.setProps({
        value: 100,
      });
      expect(wrapper.instance()).toBeDefined();
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
  });
  describe('decrementAction', () => {
    test('test value decrements', () => {
      this.value = 0;
      const wrapper = shallow(
        <SimpleStepper
          valueChanged={value => {
            this.value = value;
          }}
        />
      );
      wrapper.instance().decrementAction();
      expect(this.value).toBe(0);
    });
    test('test value decrements with wraps', () => {
      this.value = 0;
      const wrapper = shallow(
        <SimpleStepper
          wraps={true}
          valueChanged={value => {
            this.value = value;
          }}
        />
      );
      wrapper.instance().decrementAction();
      expect(this.value).toBe(10);
    });
  });
  describe('incrementAction', () => {
    test('test value increments', () => {
      this.value = 0;
      const wrapper = shallow(
        <SimpleStepper
          valueChanged={value => {
            this.value = value;
          }}
        />
      );
      wrapper.instance().incrementAction();
      expect(this.value).toBe(1);
    });
  });
  describe('validateValue', () => {
    test('test value equals maximumValue', () => {
      const wrapper = shallow(<SimpleStepper />);
      const props = { minimumValue: 0, maximumValue: 10, wraps: false, valueChanged: () => {}, onMin: () => {}, onMax: () => {} };
      wrapper.instance().validateValue(10, props, true);
      expect(wrapper.instance().state.value).toEqual(10);
    });
    test('test value greater than maximumValue', () => {
      const wrapper = shallow(<SimpleStepper />);
      const props = { minimumValue: 0, maximumValue: 10, wraps: false, valueChanged: () => {}, onMin: () => {}, onMax: () => {} };
      wrapper.instance().validateValue(11, props, true);
      expect(wrapper.instance().state.value).toEqual(10);
    });
    test('test value greater than maximumValue with wraps', () => {
      const wrapper = shallow(<SimpleStepper />);
      const props = { minimumValue: 0, maximumValue: 10, wraps: true, valueChanged: () => {}, onMin: () => {}, onMax: () => {} };
      wrapper.instance().validateValue(11, props, true);
      expect(wrapper.instance().state.value).toEqual(0);
    });
  });
  describe('setValue', () => {
    test('test setValue to be 6', () => {
      const wrapper = shallow(<SimpleStepper />);
      wrapper.instance().setValue(6);
      expect(wrapper.instance().state.value).toEqual(6);
    });
  });
  describe('_getHasMinMax', () => {
    test('test stepValue less than zero', () => {
      const wrapper = shallow(<SimpleStepper stepValue={-5} />);
      const { hasReachedMin, hasReachedMax } = wrapper.instance()._getHasMinMax(1);
      expect(hasReachedMin).toBeFalsy();
      expect(hasReachedMax).toBeFalsy();
    });
  });
  describe('_getImageSource', () => {
    test('test image source to be uri object', () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.increment, reactNativeLogo);
      expect(source).toEqual({
        uri: reactNativeLogo,
      });
    });
    test('increment type source to be local asset number', () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.increment, '');
      expect(source).toEqual({ testUri: '../../../src/assets/increment.png' });
    });
    test('increment type source to be null', () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.increment, null);
      expect(source).toBeNull();
    });
    test('decrement type source to be local asset number', () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.decrement, '');
      expect(source).toEqual({ testUri: '../../../src/assets/decrement.png' });
    });
    test('decrement type source to be undefined', () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.decrement, undefined);
      expect(source).toBeUndefined();
    });
    test('unknown type source to be empty string', () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.unknown, '');
      expect(source).toEqual('');
    });
    test("unknown type source to be {uri: ' '}", () => {
      const wrapper = shallow(<SimpleStepper />);
      const source = wrapper.instance()._getImageSource(STEP.unknown, ' ');
      expect(source).toEqual({ uri: ' ' });
    });
  });
  describe('_getImageViewProps', () => {
    test('test increment to be defined', () => {
      const wrapper = shallow(<SimpleStepper />);
      const imageProps = wrapper.instance()._getImageViewProps(STEP.increment, 1);
      expect(imageProps).toBeDefined();
      expect(imageProps.style).toEqual({ height: 36, width: 36 });
      expect(imageProps.opacity).toEqual(1);
      expect(imageProps.source).toBeDefined();
    });
    test('test decrement to be defined', () => {
      const wrapper = shallow(<SimpleStepper />);
      const imageProps = wrapper.instance()._getImageViewProps(STEP.decrement, 1);
      expect(imageProps).toBeDefined();
      expect(imageProps.style).toEqual({ height: 36, width: 36 });
      expect(imageProps.opacity).toEqual(1);
      expect(imageProps.source).toBeDefined();
    });
  });
  describe('_renderText', () => {
    test('test renderText to be function', () => {
      const wrapper = shallow(<SimpleStepper />);
      const func = wrapper.instance()._renderText('value', () => {}, {});
      expect(func).toBeUndefined();
    });
    test('test renderText to be defined', () => {
      const wrapper = shallow(<SimpleStepper />);
      const func = wrapper.instance()._renderText('value', null, {});
      expect(func).toBeDefined();
    });
  });
  describe('render', () => {
    test('renderDecrementStep and renderIncrementStep', () => {
      const wrapper = shallow(
        <SimpleStepper
          renderDecrementStep={() => {
            return null;
          }}
          renderIncrementStep={() => {
            return null;
          }}
        />
      );
      expect(wrapper).toBeDefined();
    });
  });
});
