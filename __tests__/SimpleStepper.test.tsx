import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import '@testing-library/jest-native/extend-expect';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react-native';
import SimpleStepper from '../SimpleStepper';

afterEach(cleanup);

test('it renders', () => {
  const component = render(<SimpleStepper />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();
});

test('increment by 1 and decrement by 1', async () => {
  let actualValue = 0;
  render(<SimpleStepper valueChanged={value => (actualValue = value)} />);

  const decrementButton = await screen.findByTestId('decrementButton');
  expect(decrementButton).toBeDefined();

  const incrementButton = await screen.findByTestId('incrementButton');
  expect(incrementButton).toBeDefined();

  fireEvent.press(incrementButton);
  expect(actualValue).toBe(1);

  fireEvent.press(decrementButton);
  expect(actualValue).toBe(0);
});

test('increment by 1 until hit maximum value of 3', async () => {
  let actualValue = 0;
  const max = 3;
  render(
    <SimpleStepper
      maximumValue={max}
      valueChanged={value => (actualValue = value)}
    />,
  );

  const incrementButton = await screen.findByTestId('incrementButton');
  expect(incrementButton).toBeDefined();

  for (let index = 1; index <= max; index++) {
    fireEvent.press(incrementButton);
    expect(actualValue).toBe(index);
  }
  expect(actualValue).toBe(max);

  const decrementButton = await screen.findByTestId('incrementButton');
  expect(decrementButton).toBeDefined();

  for (let index = 2; index < 0; index--) {
    fireEvent.press(decrementButton);
    expect(actualValue).toBe(index);
  }
});

test('it wraps', async () => {
  let actualValue = 0;
  const max = 3;
  render(
    <SimpleStepper
      wraps
      maximumValue={max}
      valueChanged={value => (actualValue = value)}
    />,
  );

  const incrementButton = await screen.findByTestId('incrementButton');
  expect(incrementButton).toBeDefined();

  let expected = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0];

  for (let index = 0; index < expected.length; index++) {
    const value = expected[index];
    fireEvent.press(incrementButton);
    expect(actualValue).toBe(value);
  }

  expect(actualValue).toBe(0);

  const decrementButton = await screen.findByTestId('decrementButton');
  expect(decrementButton).toBeDefined();

  expected = [3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0];

  for (let index = 0; index < expected.length; index++) {
    const value = expected[index];
    fireEvent.press(decrementButton);
    expect(actualValue).toBe(value);
  }
});

test('show center text', () => {
  const component = render(<SimpleStepper showText />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();

  const text = screen.getByText('0');
  expect(text).toBeDefined();
});

test('useColor and color', async () => {
  render(<SimpleStepper showText useColor color={'red'} />);

  const text = screen.getByText('0');
  expect(text).toBeDefined();
  expect(text).toHaveStyle({
    marginHorizontal: 8,
    fontSize: 24,
    color: 'red',
  });

  const container = await screen.findByTestId('container');
  expect(container).toBeDefined();
  expect(container).toHaveStyle({
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: 'red',
  });

  const separator = await screen.findByTestId('separator');
  expect(separator).toBeDefined();
  expect(separator).toHaveStyle({
    width: 0.5,
    backgroundColor: 'red',
    height: '100%',
  });
});

test('render text', () => {
  const component = render(
    <SimpleStepper showText renderText={value => <Text>{value}</Text>} />,
  );
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();

  const text = screen.getByText('0');
  expect(text).toBeDefined();
});

test('show decimal text', () => {
  render(<SimpleStepper showText initialValue={0.1337} />);
  const text = screen.getByText('0.13');
  expect(text).toBeDefined();
});

test('negative step value', async () => {
  let actualValue = 0;
  render(
    <SimpleStepper
      stepValue={-1}
      valueChanged={value => (actualValue = value)}
    />,
  );

  const decrementButton = await screen.findByTestId('decrementButton');
  expect(decrementButton).toBeDefined();

  const incrementButton = await screen.findByTestId('incrementButton');
  expect(incrementButton).toBeDefined();

  fireEvent.press(incrementButton);
  expect(actualValue).toBe(0);

  fireEvent.press(decrementButton);
  expect(actualValue).toBe(1);
});

test('disable tint color', async () => {
  render(
    <SimpleStepper
      incrementImageStyle={{height: 30, width: 30, tintColor: 'blue'}}
      decrementImageStyle={{height: 30, width: 30, tintColor: 'blue'}}
      disableIncrementImageTintColor
      disableDecrementImageTintColor
    />,
  );
  const decrementImage = await screen.findByTestId('decrementImage');
  expect(decrementImage).toBeDefined();
  expect(decrementImage).toHaveStyle({
    height: 30,
    width: 30,
    tintColor: undefined,
  });

  const incrementImage = await screen.findByTestId('incrementImage');
  expect(incrementImage).toBeDefined();
  expect(incrementImage).toHaveStyle({
    height: 30,
    width: 30,
    tintColor: undefined,
  });
});

test('render increment and decrement', () => {
  const reactNativeFavicon = {
    uri: 'https://reactnative.dev/docs/assets/favicon.png',
  };
  const component = render(
    <SimpleStepper
      renderIncrementImage={opacity => (
        <Image source={reactNativeFavicon} style={{opacity}} />
      )}
      renderDecrementImage={opacity => (
        <Image source={reactNativeFavicon} style={{opacity}} />
      )}
    />,
  );
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();
});

test('render increment step and decrement step', async () => {
  const component = render(
    <SimpleStepper
      maximumValue={3}
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
    />,
  );
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();

  const decrementButton = await screen.findByTestId('decrementBtn');
  expect(decrementButton).toBeDefined();
  fireEvent.press(decrementButton);

  const incrementButton = await screen.findByTestId('incrementBtn');
  expect(incrementButton).toBeDefined();

  for (let index = 0; index < 4; index++) {
    fireEvent.press(incrementButton);
  }
});

test('show left text', () => {
  const component = render(<SimpleStepper showText textPosition={'left'} />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();

  const text = screen.getByText('0');
  expect(text).toBeDefined();
});

test('show right text', () => {
  const component = render(<SimpleStepper showText textPosition={'right'} />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();

  const text = screen.getByText('0');
  expect(text).toBeDefined();
});
