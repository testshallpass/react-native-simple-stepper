import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Step from './Step';
const STEP = {
  increment: 'increment',
  decrement: 'decrement',
};
const TEXT_POSITION = {
  left: 'left',
  center: 'center',
  right: 'right',
};

export default class SimpleStepper extends Component {
  static propTypes = {
    initialValue: PropTypes.number,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    stepValue: PropTypes.number,
    valueChanged: PropTypes.func,
    activeOpacity: PropTypes.number,
    disabledOpacity: PropTypes.number,
    incrementImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    decrementImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    renderDecrementImage: PropTypes.func,
    renderIncrementImage: PropTypes.func,
    renderDecrementStep: PropTypes.func,
    renderIncrementStep: PropTypes.func,
    wraps: PropTypes.bool,
    onMin: PropTypes.func,
    onMax: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    showText: PropTypes.bool,
    renderText: PropTypes.func,
    textStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    separatorStyle: PropTypes.object,
    incrementStepStyle: PropTypes.object,
    decrementStepStyle: PropTypes.object,
    incrementImageStyle: PropTypes.object,
    decrementImageStyle: PropTypes.object,
    textPosition: PropTypes.oneOfType([TEXT_POSITION.left, TEXT_POSITION.center, TEXT_POSITION.right]),
  };
  static defaultProps = {
    initialValue: 0,
    minimumValue: 0,
    maximumValue: 10,
    stepValue: 1,
    valueChanged: () => {},
    decrementImage: require('./assets/decrement.png'),
    incrementImage: require('./assets/increment.png'),
    activeOpacity: 0.4,
    disabledOpacity: 0.5,
    disabled: false,
    renderDecrementImage: undefined,
    renderIncrementImage: undefined,
    renderDecrementStep: undefined,
    renderIncrementStep: undefined,
    wraps: false,
    onMin: () => {},
    onMax: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
    showText: false,
    renderText: undefined,
    textStyle: {
      padding: 8,
      fontSize: 20,
      fontWeight: 'bold',
      color: 'blue',
    },
    containerStyle: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      borderWidth: 2,
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center',
      borderColor: 'blue',
    },
    separatorStyle: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: 'blue',
      height: '100%',
    },
    incrementStepStyle: {
      padding: 8,
    },
    decrementStepStyle: {
      padding: 8,
    },
    incrementImageStyle: {
      height: 36,
      width: 36,
    },
    decrementImageStyle: {
      height: 36,
      width: 36,
    },
    textPosition: TEXT_POSITION.center,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
    this.validateValue(props.initialValue, props);
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue, stepValue, minimumValue, maximumValue, disabled } = this.props;
    const { value } = this.state;
    if (nextProps.initialValue !== initialValue) {
      this.validateValue(nextProps.initialValue, nextProps, nextProps.value !== nextProps.initialValue);
    } else if (nextProps.disabled !== disabled || nextProps.stepValue !== stepValue) {
      this.validateValue(value, nextProps);
    } else if (nextProps.minimumValue !== minimumValue || nextProps.maximumValue !== maximumValue) {
      const isOkay = nextProps.minimumValue < nextProps.maximumValue;
      if (isOkay) {
        this.validateValue(value, nextProps);
      }
    }
  }
  setValue = value => {
    this.validateValue(value, this.props, this.state.value !== value);
  };
  decrementAction = () => {
    const { stepValue, onDecrement } = this.props;
    const { value } = this.state;
    const nextValue = value - stepValue;
    this.validateValue(nextValue, this.props, true, onDecrement);
  };
  incrementAction = () => {
    const { stepValue, onIncrement } = this.props;
    const { value } = this.state;
    const nextValue = value + stepValue;
    this.validateValue(nextValue, this.props, true, onIncrement);
  };
  validateValue = (value, props, changed = false, onAction = () => {}) => {
    const { minimumValue, maximumValue, wraps, valueChanged, onMin, onMax } = props;
    const { hasReachedMin, hasReachedMax } = this._getHasMinMax(value);
    if (value > maximumValue) {
      value = wraps ? minimumValue : maximumValue;
    } else if (value == maximumValue) {
      value = maximumValue;
    } else if (value < minimumValue) {
      value = wraps ? maximumValue : minimumValue;
    } else if (value == minimumValue) {
      value = minimumValue;
    }
    onAction(value);
    if (hasReachedMin) {
      onMin(value);
    }
    if (hasReachedMax) {
      onMax(value);
    }
    if (changed) {
      valueChanged(value);
      this.setState({ value });
    }
  };
  _getHasMinMax = value => {
    const { minimumValue, maximumValue, stepValue, wraps } = this.props;
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
        // step value is negative
        // swap the max and min conditions.
        hasReachedMax = value <= minimumValue;
        hasReachedMin = value >= maximumValue;
        break;
    }
    return {
      hasReachedMax,
      hasReachedMin,
    };
  };
  _getImageSource = (type, source) => {
    if (typeof source == 'string') {
      if (source.length == 0) {
        if (type == STEP.decrement) {
          return require('./assets/decrement.png');
        } else if (type == STEP.increment) {
          return require('./assets/increment.png');
        }
      } else {
        return { uri: source };
      }
    }
    return source;
  };
  _getImageViewProps = (type, opacity) => {
    let style = {
      height: 36,
      width: 36,
    };
    let imageSource = null;
    switch (type) {
      case STEP.increment:
        const { incrementImageStyle, incrementImage } = this.props;
        style = incrementImageStyle;
        imageSource = incrementImage;
        break;
      case STEP.decrement:
        const { decrementImageStyle, decrementImage } = this.props;
        style = decrementImageStyle;
        imageSource = decrementImage;
        break;
    }
    return {
      style,
      opacity,
      source: this._getImageSource(type, imageSource),
    };
  };
  _renderText = (value, renderText, textStyle) => {
    if (renderText) {
      return renderText(value);
    }
    return <Text style={textStyle}>{value}</Text>;
  };
  render() {
    const {
      activeOpacity,
      disabled,
      disabledOpacity,
      showText,
      renderText,
      containerStyle,
      separatorStyle,
      textStyle,
      incrementStepStyle,
      decrementStepStyle,
      renderIncrementImage,
      renderDecrementImage,
      renderDecrementStep,
      renderIncrementStep,
      textPosition,
    } = this.props;
    const { value } = this.state;
    const { hasReachedMin, hasReachedMax } = this._getHasMinMax(value);
    const decrementOpacity = hasReachedMin || disabled ? disabledOpacity : 1;
    const incrementOpacity = hasReachedMax || disabled ? disabledOpacity : 1;
    const decrementImageProps = this._getImageViewProps(STEP.decrement, decrementOpacity);
    const incrementImageProps = this._getImageViewProps(STEP.increment, incrementOpacity);
    const isLeft = showText && textPosition == TEXT_POSITION.left;
    const isCenter = showText && textPosition == TEXT_POSITION.center;
    const isRight = showText && textPosition == TEXT_POSITION.right;
    return (
      <View>
        <View style={containerStyle}>
          {isLeft && this._renderText(value, renderText, textStyle)}
          {isLeft && <View style={separatorStyle} />}
          {renderDecrementStep
            ? renderDecrementStep(this.props)
            : <Step
                style={decrementStepStyle}
                activeOpacity={activeOpacity}
                onPress={this.decrementAction}
                disabled={hasReachedMin || disabled}
                renderImage={renderIncrementImage}
                imageStyle={decrementImageProps.style}
                imageOpacity={decrementImageProps.opacity}
                imageSource={decrementImageProps.source}
              />}
          {isCenter && <View style={separatorStyle} />}
          {isCenter && this._renderText(value, renderText, textStyle)}
          <View style={separatorStyle} />
          {renderIncrementStep
            ? renderIncrementStep(this.props)
            : <Step
                style={incrementStepStyle}
                activeOpacity={activeOpacity}
                onPress={this.incrementAction}
                disabled={hasReachedMax || disabled}
                renderImage={renderDecrementImage}
                imageStyle={incrementImageProps.style}
                imageOpacity={incrementImageProps.opacity}
                imageSource={incrementImageProps.source}
              />}
          {isRight && <View style={separatorStyle} />}
          {isRight && this._renderText(value, renderText, textStyle)}
        </View>
      </View>
    );
  }
}
