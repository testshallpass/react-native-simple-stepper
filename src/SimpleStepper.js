import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Step from './Step';
import ImageView from './ImageView';

export default class SimpleStepper extends Component {
  static propTypes = {
    value: PropTypes.number,
    initialValue: PropTypes.number,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    stepValue: PropTypes.number,
    backgroundColor: PropTypes.string,
    tintColor: PropTypes.string,
    underlayColor: PropTypes.string,
    padding: PropTypes.number,
    valueChanged: PropTypes.func,
    tintOnIncrementImage: PropTypes.bool,
    tintOnDecrementImage: PropTypes.bool,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    activeOpacity: PropTypes.number,
    disabledOpacity: PropTypes.number,
    incrementImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    decrementImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    renderDecrement: PropTypes.func,
    renderIncrement: PropTypes.func,
    wraps: PropTypes.bool,
  };
  static defaultProps = {
    value: 0,
    initialValue: 0,
    minimumValue: 0,
    maximumValue: 10,
    stepValue: 1,
    backgroundColor: 'transparent',
    tintColor: 'blue',
    valueChanged: () => {},
    decrementImage: require('./assets/decrement.png'),
    incrementImage: require('./assets/increment.png'),
    tintOnIncrementImage: true,
    tintOnDecrementImage: true,
    padding: 8,
    imageHeight: 36,
    imageWidth: 36,
    activeOpacity: 0.4,
    disabledOpacity: 0.5,
    disabled: false,
    renderDecrement: undefined,
    renderIncrement: undefined,
    wraps: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      decrementOpacity: 1,
      incrementOpacity: 1,
      hasReachedMin: false,
      hasReachedMax: false,
    };
    this.tintIncrementStyle = this.tintStyle(props.tintOnIncrementImage, props.tintColor);
    this.tintDecrementStyle = this.tintStyle(props.tintOnDecrementImage, props.tintColor);
    this.decrementImageSrc = this.imageSrc(props.decrementImage, 'decrement');
    this.incrementImageSrc = this.imageSrc(props.incrementImage, 'increment');
    this.incrementStyle = this.imageStyle(props.imageWidth, props.imageHeight);
    this.decrementStyle = this.imageStyle(props.imageWidth, props.imageHeight);
  }
  componentDidMount() {
    const { initialValue, value } = this.props;
    // compare value and initialValue if different invoke valueChanged.
    this.validateValue(initialValue, this.props, value !== initialValue);
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue, stepValue, minimumValue, maximumValue, disabled } = this.props;
    if (nextProps.initialValue !== initialValue) {
      this.validateValue(nextProps.initialValue, nextProps, true);
    } else if (nextProps.disabled !== disabled || nextProps.stepValue !== stepValue) {
      this.validateValue(nextProps.value, nextProps);
    } else if (nextProps.minimumValue !== minimumValue || nextProps.maximumValue !== maximumValue) {
      const isValidNextMin = nextProps.minimumValue < maximumValue;
      const isValidNextMax = nextProps.maximumValue > minimumValue;
      if (isValidNextMin && isValidNextMax) {
        this.validateValue(nextProps.value, nextProps);
      }
    }
  }
  decrementAction = () => {
    const { value, stepValue } = this.props;
    const nextValue = value - stepValue;
    this.validateValue(nextValue, this.props, true);
  };
  incrementAction = () => {
    const { value, stepValue } = this.props;
    const nextValue = value + stepValue;
    this.validateValue(nextValue, this.props, true);
  };
  validateValue = (value, props, changed = false) => {
    const { minimumValue, maximumValue, disabled, stepValue, wraps, valueChanged, disabledOpacity } = props;
    let hasReachedMax = true;
    let hasReachedMin = true;
    switch (true) {
      case wraps: 
        hasReachedMin = false;
        hasReachedMax = false;
        break;
      case stepValue >= 0:
        if (stepValue === 0) {
          console.warn("Warning: Simple Stepper's stepValue is set to 0.");
        }
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
    if (value > maximumValue) {
      value = wraps ? minimumValue : maximumValue;
    } else if (value == maximumValue) {
      value = maximumValue;
    } else if (value < minimumValue) {
      value = wraps ? maximumValue : minimumValue;
    } else if (value == minimumValue) {
      value = minimumValue;
    }
    this.setState({
      hasReachedMin: hasReachedMin || disabled,
      hasReachedMax: hasReachedMax || disabled,
      decrementOpacity: hasReachedMin || disabled ? disabledOpacity : 1,
      incrementOpacity: hasReachedMax || disabled ? disabledOpacity : 1,
    });
    if (changed) {
      valueChanged(value);
    }
  };
  tintStyle(status, tintColor) {
    if (status) {
      return { tintColor: tintColor };
    }
    return null;
  }
  imageSrc(src, type) {
    if (typeof src == 'string') {
      if (src.length == 0) {
        if (type == 'decrement') {
          return require('./assets/decrement.png');
        } else if (type == 'increment') {
          return require('./assets/increment.png');
        }
      } else {
        return { uri: src };
      }
    }
    return src;
  }
  imageStyle(width, height) {
    return { width: width, height: height };
  }
  render() {
    const { padding, tintColor, backgroundColor, activeOpacity, disabled, renderDecrement, renderIncrement } = this.props;
    const { decrementOpacity, incrementOpacity, hasReachedMin, hasReachedMax } = this.state;
    return (
      <View style={[styles.row, { backgroundColor: backgroundColor, borderColor: tintColor }]}>
        <Step
          activeOpacity={activeOpacity}
          style={styles.leftStep}
          tintColor={tintColor}
          padding={padding}
          onPress={this.decrementAction}
          disabled={hasReachedMin || disabled}
          renderImage={() => {
            return (
              <ImageView
                render={renderDecrement}
                style={this.decrementStyle}
                tintStyle={this.tintDecrementStyle}
                opacity={decrementOpacity}
                source={this.decrementImageSrc}
              />
            );
          }}
        />
        <Step
          activeOpacity={activeOpacity}
          style={styles.rightStep}
          tintColor={tintColor}
          padding={padding}
          onPress={this.incrementAction}
          disabled={hasReachedMax || disabled}
          renderImage={() => {
            return (
              <ImageView
                render={renderIncrement}
                style={this.incrementStyle}
                tintStyle={this.tintIncrementStyle}
                opacity={incrementOpacity}
                source={this.incrementImageSrc}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  leftStep: {
    alignItems: 'center',
  },
  rightStep: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
});
