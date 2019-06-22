import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Step from './Step';
import ImageView from './ImageView';
const STEP = {
  increment: 'increment',
  decrement: 'decrement',
};

export default class SimpleStepper extends Component {
  static propTypes = {
    value: PropTypes.number,
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
    renderDecrement: PropTypes.func,
    renderIncrement: PropTypes.func,
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
  };
  static defaultProps = {
    value: 0,
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
    renderDecrement: undefined,
    renderIncrement: undefined,
    wraps: false,
    onMin: () => {},
    onMax: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
    showText: true,
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
  };
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
    };
  }
  componentDidMount() {
    const { initialValue, value } = this.props;
    // compare value and initialValue if different invoke valueChanged.
    this.validateValue(initialValue, this.props, value !== initialValue);
  }
  componentWillReceiveProps(nextProps) {
    const { value, initialValue, stepValue, minimumValue, maximumValue, disabled } = this.props;
    if (nextProps.initialValue !== initialValue) {
      this.validateValue(nextProps.initialValue, nextProps, nextProps.value !== nextProps.initialValue);
    } else if (nextProps.disabled !== disabled || nextProps.stepValue !== stepValue) {
      this.validateValue(nextProps.value, nextProps);
    } else if (nextProps.minimumValue !== minimumValue || nextProps.maximumValue !== maximumValue) {
      const isValidNextMin = nextProps.minimumValue < maximumValue;
      const isValidNextMax = nextProps.maximumValue > minimumValue;
      if (isValidNextMin && isValidNextMax) {
        this.validateValue(nextProps.value, nextProps);
      }
    } else if (nextProps.value !== value) {
      this.validateValue(nextProps.value, nextProps);
    }
  }
  decrementAction = () => {
    const { value, stepValue, onDecrement } = this.props;
    const nextValue = value - stepValue;
    this.validateValue(nextValue, this.props, true, onDecrement);
  };
  incrementAction = () => {
    const { value, stepValue, onIncrement } = this.props;
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
    if (hasReachedMin) {
      onMin(value);
    }
    if (hasReachedMax) {
      onMax(value);
    }
    onAction(value);
    if (changed) {
      this.setState({ changed });
      valueChanged(value);
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
  _renderImageView = (type, opacity) => {
    let style = {};
    let imageSource = null;
    switch (type) {
      case STEP.increment:
        const { renderIncrement, incrementImageStyle, incrementImage } = this.props;
        if (renderIncrement) {
          return renderIncrement(this.props);
        }
        style = incrementImageStyle;
        imageSource = incrementImage;
        break;
      case STEP.decrement:
        const { renderDecrement, decrementImageStyle, decrementImage } = this.props;
        if (renderDecrement) {
          return renderDecrement(this.props);
        }
        style = decrementImageStyle;
        imageSource = decrementImage;
        break;
    }
    return <ImageView style={style} opacity={opacity} source={this._getImageSource(type, imageSource)} />;
  };
  _renderText = (value, renderText, textStyle) => {
    if (renderText) {
      return renderText(value);
    }
    return <Text style={textStyle}>{value}</Text>;
  };
  render() {
    const {
      value,
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
    } = this.props;
    const { hasReachedMin, hasReachedMax } = this._getHasMinMax(value);
    const decrementOpacity = hasReachedMin || disabled ? disabledOpacity : 1;
    const incrementOpacity = hasReachedMax || disabled ? disabledOpacity : 1;
    return (
      <View style={containerStyle}>
        <Step
          style={decrementStepStyle}
          activeOpacity={activeOpacity}
          onPress={this.decrementAction}
          disabled={hasReachedMin || disabled}
          renderImage={() => this._renderImageView(STEP.decrement, decrementOpacity)}
        />
        {showText && <View style={separatorStyle} />}
        {showText && this._renderText(value, renderText, textStyle)}
        <View style={separatorStyle} />
        <Step
          style={incrementStepStyle}
          activeOpacity={activeOpacity}
          onPress={this.incrementAction}
          disabled={hasReachedMax || disabled}
          renderImage={() => this._renderImageView(STEP.increment, incrementOpacity)}
        />
      </View>
    );
  }
}
