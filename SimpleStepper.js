import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
const STEP = {
  increment: 'increment',
  decrement: 'decrement',
};
const TEXT_POSITION = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const ImageView = ({
  style = {
    height: 36,
    width: 36,
  },
  source = {},
  opacity = 1,
}) => {
  return <Image style={[style, {opacity}]} source={source} />;
};

const Step = ({
  activeOpacity = 1,
  style = {
    padding: 8,
  },
  onPress = () => {},
  renderImage = undefined,
  disabled = false,
  imageStyle = {
    height: 36,
    width: 36,
  },
  imageOpacity = 1,
  imageSource = undefined,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={style}
      onPress={onPress}
      disabled={disabled}>
      {renderImage ? (
        renderImage()
      ) : (
        <ImageView
          style={imageStyle}
          opacity={imageOpacity}
          source={imageSource}
        />
      )}
    </TouchableOpacity>
  );
};

const SimpleStepper = ({
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
  renderDecrementImage = undefined,
  renderIncrementImage = undefined,
  renderDecrementStep = undefined,
  renderIncrementStep = undefined,
  wraps = false,
  onMin = () => {},
  onMax = () => {},
  onIncrement = () => {},
  onDecrement = () => {},
  showText = false,
  renderText = undefined,
  textStyle = {
    padding: 4,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  containerStyle = {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: 'blue',
  },
  separatorStyle = {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'blue',
    height: '100%',
  },
  incrementStepStyle = {
    padding: 4,
  },
  decrementStepStyle = {
    padding: 4,
  },
  incrementImageStyle = {
    height: 26,
    width: 26,
  },
  decrementImageStyle = {
    height: 26,
    width: 26,
  },
  textPosition = TEXT_POSITION.center,
}) => {
  const [value, setValue] = useState(initialValue);
  const prevInitialValue = useRef(initialValue);
  const prevDisabled = useRef(disabled);
  const prevStepValue = useRef(stepValue);
  const prevMinValue = useRef(minimumValue);
  const prevMaxValue = useRef(maximumValue);

  useEffect(() => {
    if (initialValue !== prevInitialValue.current) {
      _validateValue(initialValue, value !== prevInitialValue.current);
    } else if (
      disabled !== prevDisabled.current ||
      stepValue !== prevStepValue.current
    ) {
      _validateValue(value);
    } else if (
      minimumValue !== prevMinValue.current ||
      maximumValue !== prevMaxValue.current
    ) {
      const isOkay = minimumValue < maximumValue;
      if (isOkay) {
        _validateValue(value);
      }
    }
  }, [initialValue, disabled, stepValue, minimumValue, maximumValue, value]);

  const _decrementAction = () => {
    const nextValue = value - stepValue;
    _validateValue(nextValue, true, onDecrement);
  };

  const _incrementAction = () => {
    const nextValue = value + stepValue;
    _validateValue(nextValue, true, onIncrement);
  };

  const _validateValue = (
    newValue = 0,
    changed = false,
    onAction = () => {},
  ) => {
    const {hasReachedMin, hasReachedMax} = _getHasMinMax(newValue);
    if (newValue > maximumValue) {
      newValue = wraps ? minimumValue : maximumValue;
    } else if (newValue === maximumValue) {
      newValue = maximumValue;
    } else if (newValue < minimumValue) {
      newValue = wraps ? maximumValue : minimumValue;
    } else if (newValue === minimumValue) {
      newValue = minimumValue;
    }
    onAction(newValue);
    if (hasReachedMin) {
      onMin(newValue);
    }
    if (hasReachedMax) {
      onMax(newValue);
    }
    if (changed) {
      valueChanged(newValue);
      setValue(newValue);
    }
  };

  const _getHasMinMax = (newValue = 0) => {
    let hasReachedMax = true;
    let hasReachedMin = true;
    switch (true) {
      case wraps:
        hasReachedMin = false;
        hasReachedMax = false;
        break;
      case stepValue >= 0:
        hasReachedMax = newValue >= maximumValue;
        hasReachedMin = newValue <= minimumValue;
        break;
      case stepValue < 0:
        // step value is negative
        // swap the max and min conditions.
        hasReachedMax = newValue <= minimumValue;
        hasReachedMin = newValue >= maximumValue;
        break;
    }
    return {
      hasReachedMax,
      hasReachedMin,
    };
  };

  const _getImageSource = (type, source) => {
    if (typeof source === 'string') {
      if (source.length === 0) {
        if (type === STEP.decrement) {
          return require('./assets/decrement.png');
        } else if (type === STEP.increment) {
          return require('./assets/increment.png');
        }
      } else {
        return {uri: source};
      }
    }
    return source;
  };

  const _getImageViewProps = (type, opacity) => {
    let style = {
      height: 36,
      width: 36,
    };
    let imageSource = null;
    switch (type) {
      case STEP.increment:
        style = incrementImageStyle;
        imageSource = incrementImage;
        break;
      case STEP.decrement:
        style = decrementImageStyle;
        imageSource = decrementImage;
        break;
    }
    return {
      style,
      opacity,
      source: _getImageSource(type, imageSource),
    };
  };

  const _renderText = (newValue) => {
    if (renderText) {
      return renderText(newValue);
    }
    return <Text style={textStyle}>{newValue}</Text>;
  };

  const {hasReachedMin, hasReachedMax} = _getHasMinMax(value);
  const decrementOpacity = hasReachedMin || disabled ? disabledOpacity : 1;
  const incrementOpacity = hasReachedMax || disabled ? disabledOpacity : 1;
  const decrementImageProps = _getImageViewProps(
    STEP.decrement,
    decrementOpacity,
  );
  const incrementImageProps = _getImageViewProps(
    STEP.increment,
    incrementOpacity,
  );
  const isLeft = showText && textPosition === TEXT_POSITION.left;
  const isCenter = showText && textPosition === TEXT_POSITION.center;
  const isRight = showText && textPosition === TEXT_POSITION.right;
  return (
    <View>
      <View style={containerStyle}>
        {isLeft && _renderText(value, renderText, textStyle)}
        {isLeft && <View style={separatorStyle} />}
        {renderDecrementStep ? (
          renderDecrementStep()
        ) : (
          <Step
            style={decrementStepStyle}
            activeOpacity={activeOpacity}
            onPress={_decrementAction}
            disabled={hasReachedMin || disabled}
            renderImage={renderIncrementImage}
            imageStyle={decrementImageProps.style}
            imageOpacity={decrementImageProps.opacity}
            imageSource={decrementImageProps.source}
          />
        )}
        {isCenter && <View style={separatorStyle} />}
        {isCenter && _renderText(value)}
        <View style={separatorStyle} />
        {renderIncrementStep ? (
          renderIncrementStep()
        ) : (
          <Step
            style={incrementStepStyle}
            activeOpacity={activeOpacity}
            onPress={_incrementAction}
            disabled={hasReachedMax || disabled}
            renderImage={renderDecrementImage}
            imageStyle={incrementImageProps.style}
            imageOpacity={incrementImageProps.opacity}
            imageSource={incrementImageProps.source}
          />
        )}
        {isRight && <View style={separatorStyle} />}
        {isRight && _renderText(value)}
      </View>
    </View>
  );
};

export default SimpleStepper;
