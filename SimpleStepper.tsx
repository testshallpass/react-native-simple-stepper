import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextStyle,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
  ColorValue,
} from 'react-native';

export type SimpleStepperProps = {
  initialValue?: number;
  minimumValue?: number;
  maximumValue?: number;
  stepValue?: number;
  valueChanged?: (value: number) => void;
  decrementImage?: ImageSourcePropType;
  incrementImage?: ImageSourcePropType;
  activeOpacity?: number;
  disabledOpacity?: number;
  disabled?: boolean;
  renderDecrementStep?: (value: number, onDecrement: () => void) => JSX.Element;
  renderIncrementStep?: (value: number, onIncrement: () => void) => JSX.Element;
  renderIncrementImage?: (opacity: number) => JSX.Element;
  renderDecrementImage?: (opacity: number) => JSX.Element;
  wraps?: boolean;
  onMin?: (value: number) => void;
  onMax?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  showText?: boolean;
  renderText?: (value: number) => JSX.Element;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  separatorStyle?: ViewStyle;
  incrementStepStyle?: ViewStyle;
  decrementStepStyle?: ViewStyle;
  incrementImageStyle?: ImageStyle;
  decrementImageStyle?: ImageStyle;
  textPosition?: 'left' | 'center' | 'right';
  disableIncrementImageTintColor?: boolean;
  disableDecrementImageTintColor?: boolean;
  useColor?: boolean;
  color?: ColorValue;
  textDecimalPlaces?: number;
};

const SimpleStepper: React.FC<SimpleStepperProps> = ({
  initialValue = 0,
  minimumValue = 0,
  maximumValue = 10,
  stepValue = 1,
  valueChanged = () => {},
  decrementImage = require('./assets/decrement.png'),
  incrementImage = require('./assets/increment.png'),
  activeOpacity = 0.4,
  disabledOpacity = 0.5,
  disabled = false,
  renderDecrementStep = undefined,
  renderIncrementStep = undefined,
  renderIncrementImage = undefined,
  renderDecrementImage = undefined,
  wraps = false,
  onMin = () => {},
  onMax = () => {},
  onIncrement = () => {},
  onDecrement = () => {},
  showText = false,
  renderText = undefined,
  textStyle = {
    marginHorizontal: 8,
    fontSize: 24,
  },
  containerStyle = {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  separatorStyle = {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
    height: '100%',
  },
  incrementStepStyle = {
    padding: 4,
  },
  decrementStepStyle = {
    padding: 4,
  },
  incrementImageStyle = {
    height: 30,
    width: 30,
  },
  decrementImageStyle = {
    height: 30,
    width: 30,
  },
  textPosition = 'center',
  disableIncrementImageTintColor = false,
  disableDecrementImageTintColor = false,
  useColor = false,
  color = 'blue',
  textDecimalPlaces = 2,
}) => {
  const [value, setValue] = useState(initialValue);

  const _decrementAction = () => {
    const nextValue = value - stepValue;
    const actualValue = _processValue(nextValue);
    onDecrement(actualValue);
    setValue(actualValue);
    valueChanged(actualValue);
  };

  const _incrementAction = () => {
    const nextValue = value + stepValue;
    const actualValue = _processValue(nextValue);
    onIncrement(actualValue);
    setValue(actualValue);
    valueChanged(actualValue);
  };

  const _processValue = (actualValue: number) => {
    if (actualValue > maximumValue) {
      return wraps ? minimumValue : maximumValue;
    } else if (actualValue === maximumValue) {
      return maximumValue;
    } else if (actualValue < minimumValue) {
      return wraps ? maximumValue : minimumValue;
    } else if (actualValue === minimumValue) {
      return minimumValue;
    }
    return actualValue;
  };

  const _getHasMinMax = () => {
    let hasReachedMax = true;
    let hasReachedMin = true;
    switch (true) {
      case wraps:
        hasReachedMin = false;
        hasReachedMax = false;
        break;
      case stepValue >= 0:
        hasReachedMax = value >= maximumValue;
        hasReachedMin = value <= minimumValue;
        break;
      case stepValue < 0:
        hasReachedMax = value <= minimumValue;
        hasReachedMin = value >= maximumValue;
        break;
    }
    return {
      hasReachedMax,
      hasReachedMin,
    };
  };

  const _renderText = () => {
    if (renderText) {
      return renderText(value);
    }
    let _textStyle = textStyle;
    if (useColor && color) {
      _textStyle.color = color;
    }
    let displayValue = value;
    if (!Number.isInteger(value)) {
      displayValue = Number(value.toFixed(textDecimalPlaces));
    }
    return <Text style={textStyle}>{displayValue}</Text>;
  };

  const _renderIncrementImage = (opacity: number) => {
    if (renderIncrementImage) {
      return renderIncrementImage(opacity);
    }
    const _incrementImageStyle = incrementImageStyle;
    if (useColor && color && !disableIncrementImageTintColor) {
      _incrementImageStyle.tintColor = color;
    }
    if (disableIncrementImageTintColor && _incrementImageStyle.tintColor) {
      _incrementImageStyle.tintColor = undefined;
    }
    return (
      <Image
        testID={'incrementImage'}
        style={[_incrementImageStyle, {opacity}]}
        source={incrementImage}
      />
    );
  };

  const _renderDecrementImage = (opacity: number) => {
    if (renderDecrementImage) {
      return renderDecrementImage(opacity);
    }
    const _decrementImageStyle = decrementImageStyle;
    if (useColor && color && !disableDecrementImageTintColor) {
      _decrementImageStyle.tintColor = color;
    }
    if (disableDecrementImageTintColor && _decrementImageStyle.tintColor) {
      _decrementImageStyle.tintColor = undefined;
    }
    return (
      <Image
        testID={'decrementImage'}
        style={[_decrementImageStyle, {opacity}]}
        source={decrementImage}
      />
    );
  };

  const {hasReachedMin, hasReachedMax} = _getHasMinMax();
  const decrementOpacity = hasReachedMin || disabled ? disabledOpacity : 1;
  const incrementOpacity = hasReachedMax || disabled ? disabledOpacity : 1;
  const isLeft = showText && textPosition === 'left';
  const isCenter = showText && textPosition === 'center';
  const isRight = showText && textPosition === 'right';

  if (hasReachedMin) {
    onMin(value);
  }
  if (hasReachedMax) {
    onMax(value);
  }

  let _containerStyle = containerStyle;
  let _separatorStyle = separatorStyle;
  if (useColor && color) {
    _containerStyle.borderColor = color;
    _separatorStyle.backgroundColor = color;
  }

  return (
    <View>
      <View testID={'container'} style={_containerStyle}>
        {isLeft && _renderText()}
        {isLeft && <View testID={'separator'} style={_separatorStyle} />}
        {renderDecrementStep ? (
          renderDecrementStep(value, _decrementAction)
        ) : (
          <TouchableOpacity
            testID={'decrementButton'}
            style={decrementStepStyle}
            activeOpacity={activeOpacity}
            onPress={_decrementAction}
            disabled={hasReachedMin || disabled}>
            {_renderDecrementImage(decrementOpacity)}
          </TouchableOpacity>
        )}
        {isCenter && <View testID={'separator'} style={_separatorStyle} />}
        {isCenter && _renderText()}
        <View style={_separatorStyle} />
        {renderIncrementStep ? (
          renderIncrementStep(value, _incrementAction)
        ) : (
          <TouchableOpacity
            testID={'incrementButton'}
            style={incrementStepStyle}
            activeOpacity={activeOpacity}
            onPress={_incrementAction}
            disabled={hasReachedMax || disabled}>
            {_renderIncrementImage(incrementOpacity)}
          </TouchableOpacity>
        )}
        {isRight && <View testID={'separator'} style={_separatorStyle} />}
        {isRight && _renderText()}
      </View>
    </View>
  );
};

export default SimpleStepper;
