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
    valueChanged: null,
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
    renderDecrement: null,
    renderIncrement: null,
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
    const { initialValue, minimumValue, maximumValue, disabled, stepValue, wraps } = this.props;
    this.validateValue(initialValue, minimumValue, maximumValue, disabled, stepValue, wraps);
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue, stepValue, minimumValue, maximumValue, disabled } = this.props;
    if (nextProps.initialValue !== initialValue) {
      this.validateValue(nextProps.initialValue, nextProps.minimumValue, nextProps.maximumValue, nextProps.disabled, nextProps.stepValue, nextProps.wraps);
    } else if (nextProps.disabled !== disabled || nextProps.stepValue !== stepValue) {
      this.validateValue(this.state.value, nextProps.minimumValue, nextProps.maximumValue, nextProps.disabled, nextProps.stepValue, nextProps.wraps);
    } else if (nextProps.minimumValue !== minimumValue || nextProps.maximumValue !== maximumValue) {
      const isValidNextMin = nextProps.minimumValue < maximumValue;
      const isValidNextMax = nextProps.maximumValue > minimumValue;
      if (isValidNextMin && isValidNextMax) {
        this.validateValue(this.state.value, nextProps.minimumValue, nextProps.maximumValue, nextProps.disabled, nextProps.stepValue, nextProps.wraps);
      }
    }
  }
  decrementAction = () => {
    const { value, stepValue } = this.props;
    const nextValue = value - stepValue;
    this.validateValue(nextValue, this.props.minimumValue, this.props.maximumValue, this.props.disabled, stepValue, this.props.wraps);
  };
  incrementAction = () => {
    const { value, stepValue } = this.props;
    const nextValue = value + stepValue;
    this.validateValue(nextValue, this.props.minimumValue, this.props.maximumValue, this.props.disabled, stepValue, this.props.wraps);
  };
  validateValue = (value, min, max, disabled, step, wraps) => {
    let hasReachedMax = true;
    let hasReachedMin = true;
    switch (true) {
      case step >= 0:
        if (step === 0) {
          console.warn("Warning: Simple Stepper's step value is set to 0.");
        }
        hasReachedMax = value >= max;
        hasReachedMin = value <= min;
        break;
      case step < 0:
        // step value is negative
        // swap the max and min conditions.
        hasReachedMax = value <= min;
        hasReachedMin = value >= max;
        break;
    }
    if (wraps) {
      hasReachedMin = false;
      hasReachedMax = false;
    }
    if (value > max) {
      value = wraps ? min : max;
    } else if (value == max) {
      value = max;
    } else if (value < min) {
      value = wraps ? max : min;
    } else if (value == min) {
      value = min;
    }
    this.setState({
      hasReachedMin: hasReachedMin || disabled,
      hasReachedMax: hasReachedMax || disabled,
      decrementOpacity: hasReachedMin || disabled ? this.props.disabledOpacity : 1,
      incrementOpacity: hasReachedMax || disabled ? this.props.disabledOpacity : 1,
    });
    if (this.props.valueChanged) {
      this.props.valueChanged(value);
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
