import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import SimpleStepper from '../SimpleStepper';

describe('SimpleStepper', () => {
  afterEach(cleanup);

  test('it renders', () => {
    const component = render(<SimpleStepper />);

    const container = component.getByTestId('container');
    expect(container).toBeOnTheScreen();
    expect(container).toHaveStyle({
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderRadius: 8,
    });

    for (let index = 0; index < 2; index++) {
      const item = component.getByTestId(`item-${index}`);
      expect(item).toBeOnTheScreen();
      expect(item).toHaveStyle({ padding: 10 });
    }

    const decrementButton = component.getByTestId('decrementButton');
    expect(decrementButton).toBeOnTheScreen();
    expect(decrementButton).toBeDisabled();

    const incrementButton = component.getByTestId('incrementButton');
    expect(incrementButton).toBeOnTheScreen();
    expect(incrementButton).toBeEnabled();

    const decrementImage = component.getByTestId('decrementImage');
    expect(decrementImage).toBeOnTheScreen();
    expect(decrementImage).toHaveStyle({
      height: 30,
      width: 30,
      opacity: 0.5,
      tintColor: undefined,
    });

    const incrementImage = component.getByTestId('incrementImage');
    expect(incrementImage).toBeOnTheScreen();
    expect(incrementImage).toHaveStyle({
      height: 30,
      width: 30,
      opacity: 1,
      tintColor: undefined,
    });

    const separator = component.getByTestId('separator');
    expect(separator).toBeOnTheScreen();
    expect(separator).toHaveStyle({
      backgroundColor: 'black',
      width: StyleSheet.hairlineWidth,
    });

    expect(component.queryByTestId('text')).not.toBeOnTheScreen();
    expect(component.queryByTestId('item-2')).not.toBeOnTheScreen();
  });

  test('increment by 1 and decrement by 1', () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    let actualValue = 0;
    const component = render(
      <SimpleStepper
        valueChanged={value => (actualValue = value)}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    const incrementButton = component.getByTestId('incrementButton');
    expect(incrementButton).toBeOnTheScreen();
    expect(incrementButton).toBeEnabled();

    fireEvent.press(incrementButton);
    expect(actualValue).toBe(1);
    expect(onIncrement).toHaveBeenCalled();
    expect(onDecrement).not.toHaveBeenCalled();

    onIncrement.mockReset();

    const decrementButton = component.getByTestId('decrementButton');
    expect(decrementButton).toBeOnTheScreen();
    expect(decrementButton).toBeEnabled();

    fireEvent.press(decrementButton);
    expect(actualValue).toBe(0);
    expect(onDecrement).toHaveBeenCalled();
    expect(onIncrement).not.toHaveBeenCalled();
  });

  test('increment by 1 until hit maximum value of 3', () => {
    const onIncrement = jest.fn();
    const onMax = jest.fn();
    let actualValue = 0;
    const max = 3;
    const component = render(
      <SimpleStepper
        maximumValue={max}
        valueChanged={value => (actualValue = value)}
        onIncrement={onIncrement}
        onMax={onMax}
      />,
    );
    const incrementButton = component.getByTestId('incrementButton');
    expect(incrementButton).toBeOnTheScreen();
    expect(incrementButton).toBeEnabled();

    for (let index = 1; index <= max; index++) {
      fireEvent.press(incrementButton);
      expect(actualValue).toBe(index);
    }
    expect(actualValue).toBe(max);
    expect(onMax).toHaveBeenCalled();
    expect(onIncrement).toHaveBeenCalledTimes(max);
    expect(incrementButton).toBeDisabled();
  });

  test('it wraps', () => {
    const onMax = jest.fn();
    const onMin = jest.fn();
    const max = 10;
    const min = 0;
    let actualValue = 0;
    const component = render(
      <SimpleStepper
        wraps
        valueChanged={value => (actualValue = value)}
        onMax={onMax}
        onMin={onMin}
      />,
    );
    expect(actualValue).toBe(min);
    expect(onMin).toHaveBeenCalled();

    const decrementButton = component.getByTestId('decrementButton');
    expect(decrementButton).toBeOnTheScreen();
    expect(decrementButton).toBeEnabled();

    fireEvent.press(decrementButton);
    expect(actualValue).toBe(max);
    expect(onMax).toHaveBeenCalled();
    expect(onMin).toHaveBeenCalledTimes(1);

    fireEvent.press(decrementButton);
    expect(actualValue).toBe(max - 1);
    expect(onMax).toHaveBeenCalledTimes(1);
    expect(onMin).toHaveBeenCalledTimes(1);

    const incrementButton = component.getByTestId('incrementButton');
    expect(incrementButton).toBeOnTheScreen();
    expect(incrementButton).toBeEnabled();

    fireEvent.press(incrementButton);
    expect(actualValue).toBe(max);
    expect(onMax).toHaveBeenCalledTimes(2);

    fireEvent.press(incrementButton);
    expect(actualValue).toBe(min);
    expect(onMin).toHaveBeenCalledTimes(2);
    expect(onMax).toHaveBeenCalledTimes(2);
  });

  test('horizontal false', () => {
    const component = render(<SimpleStepper horizontal={false} />);
    const separator = component.getByTestId('separator');
    expect(separator).toBeOnTheScreen();
    expect(separator).toHaveStyle({
      backgroundColor: 'black',
      height: StyleSheet.hairlineWidth,
      width: undefined,
    });
  });

  test('useColor and red color', async () => {
    const color = 'red';
    const component = render(<SimpleStepper showText useColor color={color} />);

    const container = component.getByTestId('container');
    expect(container).toBeOnTheScreen();
    expect(container).toHaveStyle({ borderColor: color });

    const decrementImage = component.getByTestId('decrementImage');
    expect(decrementImage).toBeOnTheScreen();
    expect(decrementImage).toHaveStyle({ tintColor: color });

    const incrementImage = component.getByTestId('incrementImage');
    expect(incrementImage).toBeOnTheScreen();
    expect(incrementImage).toHaveStyle({ tintColor: color });

    const text = component.getByTestId('text');
    expect(text).toBeOnTheScreen();
    expect(text).toHaveStyle({ color });

    const separators = await component.findAllByTestId('separator');
    expect(separators.length == 2).toBeTruthy();
    separators.forEach(separator => {
      expect(separator).toBeOnTheScreen();
      expect(separator).toHaveStyle({
        backgroundColor: color,
      });
    });
  });

  test('render text', () => {
    const initialValue = 1337;
    const component = render(
      <SimpleStepper
        showText
        initialValue={1337}
        renderText={value => <Text testID={`${initialValue}`}>{value}</Text>}
      />,
    );
    expect(component.queryByTestId('text')).not.toBeOnTheScreen();
    expect(component.getByTestId(`${initialValue}`)).toBeOnTheScreen();
    expect(component.getByText(`${initialValue}`)).toBeOnTheScreen();
  });

  test('decimal text value', () => {
    const min = 0;
    const max = 10;
    const stepValue = 0.1337;
    const initialValue = 0.1337;
    let actualValue = 0;
    const component = render(
      <SimpleStepper
        showText
        initialValue={initialValue}
        stepValue={stepValue}
        valueChanged={value => (actualValue = value)}
      />,
    );
    let text = component.getByText(`${initialValue.toFixed(2)}`);
    expect(text).toBeOnTheScreen();

    const incrementButton = component.getByTestId('incrementButton');
    expect(incrementButton).toBeOnTheScreen();
    expect(incrementButton).toBeEnabled();

    for (let index = initialValue; index < max; index += stepValue) {
      fireEvent.press(incrementButton);
      let value = index + stepValue;
      if (value > max) {
        value = max;
      }
      expect(actualValue).toBe(value);
      const displayValue = Number.isInteger(value) ? value : value.toFixed(2);
      text = component.getByText(`${Number(displayValue)}`);
      expect(text).toBeOnTheScreen();
    }

    const decrementButton = component.getByTestId('decrementButton');
    expect(decrementButton).toBeOnTheScreen();
    expect(decrementButton).toBeEnabled();

    for (let index = max; index > min; index -= stepValue) {
      fireEvent.press(decrementButton);
      let value = index - stepValue;
      if (value < min) {
        value = min;
      }
      expect(actualValue).toBe(value);
      const displayValue = Number.isInteger(value) ? value : value.toFixed(2);
      text = component.getByText(`${Number(displayValue)}`);
      expect(text).toBeOnTheScreen();
    }
  });

  test('negative step value', () => {
    const max = 10;
    let actualValue = 0;
    const stepValue = -1;
    const component = render(
      <SimpleStepper
        stepValue={stepValue}
        valueChanged={value => (actualValue = value)}
      />,
    );
    const incrementButton = component.getByTestId('incrementButton');
    expect(incrementButton).toBeOnTheScreen();
    expect(incrementButton).toBeDisabled();

    const decrementButton = component.getByTestId('decrementButton');
    expect(decrementButton).toBeOnTheScreen();
    expect(decrementButton).toBeEnabled();

    for (let index = 0; index < max; index++) {
      fireEvent.press(decrementButton);
      expect(actualValue).toBe(index - stepValue);
    }
    expect(decrementButton).toBeDisabled();
    expect(incrementButton).toBeEnabled();

    for (let index = max; index > 0; index--) {
      fireEvent.press(incrementButton);
      expect(actualValue).toBe(index + stepValue);
    }
    expect(decrementButton).toBeEnabled();
    expect(incrementButton).toBeDisabled();
  });

  test('disable tint color', () => {
    const imageStyle = { height: 30, width: 30, tintColor: 'blue' };
    const component = render(
      <SimpleStepper
        incrementImageStyle={{ ...imageStyle }}
        decrementImageStyle={{ ...imageStyle }}
        disableIncrementImageTintColor
        disableDecrementImageTintColor
      />,
    );
    const expected = { height: 30, width: 30, tintColor: undefined };
    const decrementImage = component.getByTestId('decrementImage');
    expect(decrementImage).toBeOnTheScreen();
    expect(decrementImage).toHaveStyle(expected);

    const incrementImage = component.getByTestId('incrementImage');
    expect(incrementImage).toBeOnTheScreen();
    expect(incrementImage).toHaveStyle(expected);
  });

  test('render increment and decrement image', () => {
    const source = {
      uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png',
    };
    const component = render(
      <SimpleStepper
        renderIncrementImage={opacity => (
          <Image
            testID={'myIncrementImage'}
            source={source}
            style={{ opacity }}
          />
        )}
        renderDecrementImage={opacity => (
          <Image
            testID={'myDecrementImage'}
            source={source}
            style={{ opacity }}
          />
        )}
      />,
    );
    expect(component.queryByTestId('decrementImage')).not.toBeOnTheScreen();
    const decrementImage = component.getByTestId('myDecrementImage');
    expect(decrementImage).toBeOnTheScreen();
    expect(decrementImage).toHaveStyle({ opacity: 0.5, tintColor: undefined });
    expect(decrementImage).toHaveProp('source', source);

    expect(component.queryByTestId('incrementImage')).not.toBeOnTheScreen();
    const incrementImage = component.getByTestId('myIncrementImage');
    expect(incrementImage).toBeOnTheScreen();
    expect(incrementImage).toHaveStyle({ opacity: 1, tintColor: undefined });
    expect(incrementImage).toHaveProp('source', source);
  });

  test('render increment and decrement step', () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const component = render(
      <SimpleStepper
        renderIncrementStep={(value, onIncrement) => (
          <TouchableOpacity testID={'incrementBtn'} onPress={onIncrement}>
            <Text>{value}</Text>
          </TouchableOpacity>
        )}
        renderDecrementStep={(value, onDecrement) => (
          <TouchableOpacity testID={'decrementBtn'} onPress={onDecrement}>
            <Text>{value}</Text>
          </TouchableOpacity>
        )}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    expect(component.queryByTestId('decrementButton')).not.toBeOnTheScreen();
    const decrementBtn = component.getByTestId('decrementBtn');
    expect(decrementBtn).toBeOnTheScreen();
    expect(decrementBtn).toBeEnabled();

    fireEvent.press(decrementBtn);
    expect(onDecrement).toHaveBeenCalled();

    expect(component.queryByTestId('incrementButton')).not.toBeOnTheScreen();
    const incrementBtn = component.getByTestId('incrementBtn');
    expect(incrementBtn).toBeOnTheScreen();
    expect(incrementBtn).toBeEnabled();

    fireEvent.press(incrementBtn);
    expect(onIncrement).toHaveBeenCalled();
  });

  test('show left text', () => {
    const component = render(<SimpleStepper showText textPosition={'left'} />);
    const text = component.getByTestId('text');
    expect(text).toBeOnTheScreen();
    expect(text).toBeEnabled();
    expect(text).toHaveStyle({ fontSize: 24 });
  });

  test('show center text', () => {
    const component = render(<SimpleStepper showText />);
    const text = component.getByTestId('text');
    expect(text).toBeOnTheScreen();
    expect(text).toBeEnabled();
    expect(text).toHaveStyle({ fontSize: 24 });
  });

  test('show right text', () => {
    const component = render(<SimpleStepper showText textPosition={'right'} />);
    const text = component.getByTestId('text');
    expect(text).toBeOnTheScreen();
    expect(text).toBeEnabled();
    expect(text).toHaveStyle({ fontSize: 24 });
  });
});
