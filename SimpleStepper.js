import React, { Component, PropTypes } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";

export default class SimpleStepper extends Component {
  static propTypes = {
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
    disabled: PropTypes.bool
  };
  static defaultProps = {
    initialValue: 0,
    minimumValue: 0,
    maximumValue: 10,
    stepValue: 1,
    backgroundColor: "transparent",
    tintColor: "blue",
    valueChanged: null,
    decrementImage: require("./assets/decrement.png"),
    incrementImage: require("./assets/increment.png"),
    tintOnIncrementImage: true,
    tintOnDecrementImage: true,
    padding: 4,
    imageHeight: 36,
    imageWidth: 36,
    activeOpacity: 0.4,
    disabledOpacity: 0.5,
    disabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
      decrementOpacity: 1,
      incrementOpacity: 1,
      hasReachedMin: false,
      hasReachedMax: false
    };
  }
  componentWillMount() {
    this.validateValue(this.props.initialValue, this.props.minimumValue, this.props.maximumValue, this.props.disabled);
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue, stepValue, minimumValue, maximumValue, disabled } = this.props;
    if (nextProps.initialValue !== initialValue) {
      this.validateValue(nextProps.initialValue, nextProps.minimumValue, nextProps.maximumValue, nextProps.disabled);
    } else if (nextProps.disabled !== disabled || nextProps.stepValue !== stepValue) {
      this.validateValue(this.state.value, nextProps.minimumValue, nextProps.maximumValue, nextProps.disabled);
    } else if (nextProps.minimumValue !== minimumValue || nextProps.maximumValue !== maximumValue) {
      const isValidNextMin = (nextProps.minimumValue < maximumValue)
      const isValidNextMax = (nextProps.maximumValue > minimumValue)
      if (isValidNextMin && isValidNextMax) {
        this.validateValue(this.state.value, nextProps.minimumValue, nextProps.maximumValue, nextProps.disabled);
      } else {
        if (isValidNextMin == false && isValidNextMax == false) {
          console.warn('Warning: Simple Stepper update failed because nextProps min value(' + nextProps.minimumValue + ') is higher than current max value('+ maximumValue + ').');
          console.warn('Warning: Simple Stepper update failed because nextProps max value(' + nextProps.maximumValue + ') is lower than current min value('+ minimumValue + ').');
        } else if (isValidNextMin == false) {
          console.warn('Warning: Simple Stepper update failed because nextProps min value(' + nextProps.minimumValue + ') is higher than current max value('+ maximumValue + ').');
        } else if (isValidNextMax == false) {
          console.warn('Warning: Simple Stepper update failed because nextProps max value(' + nextProps.maximumValue + ') is lower than current min value('+ minimumValue + ').');
        }
      }
    }
  }
  decrementAction = () => {
    var value = this.state.value;
    var stepValue = this.props.stepValue;
    value -= stepValue;
    this.validateValue(value, this.props.minimumValue, this.props.maximumValue, this.props.disabled);
  }
  incrementAction = () => {
    var value = this.state.value;
    var stepValue = this.props.stepValue;
    value += stepValue;
    this.validateValue(value, this.props.minimumValue, this.props.maximumValue, this.props.disabled);
  }
  validateValue = (value, min, max, disabled) => {
    const hasReachedMax = value >= max;
    const hasReachedMin = value <= min;
    if (value >= max) {
      value = max;
    } else if (value <= min) {
      value = min;
    }
    this.setState({
      value: value,
      hasReachedMin: hasReachedMin || disabled,
      hasReachedMax: hasReachedMax || disabled,
      decrementOpacity: hasReachedMin || disabled
        ? this.props.disabledOpacity
        : 1,
      incrementOpacity: hasReachedMax || disabled
        ? this.props.disabledOpacity
        : 1
    });
    if (this.props.valueChanged) {
      this.props.valueChanged(value);
    }
  }
  tintStyle(status) {
    if (status) {
      return { tintColor: this.props.tintColor };
    }
    return null;
  }
  imageIncrementSrc(src) {
    if (src.length == 0) {
      return require("./assets/increment.png");
    }
    if (typeof src == "string") {
      return { uri: src };
    }
    return src;
  }
  imageDecrementSrc(src) {
    if (src.length == 0) {
      return require("./assets/decrement.png");
    }
    if (typeof src == "string") {
      return { uri: src };
    }
    return src;
  }
  imageStyle(src, width, height) {
    if (typeof src == "string" && src.length > 0) {
      return { width: width, height: height };
    }
    return null;
  }
  render() {
    const {
      imageWidth,
      imageHeight,
      tintOnIncrementImage,
      tintOnDecrementImage,
      incrementImage,
      decrementImage,
      padding,
      tintColor,
      backgroundColor,
      activeOpacity,
      disabled
    } = this.props;
    var tintIncrementStyle = this.tintStyle(tintOnIncrementImage);
    var tintDecrementStyle = this.tintStyle(tintOnDecrementImage);
    var decrementImageSrc = this.imageDecrementSrc(decrementImage);
    var incrementImageSrc = this.imageIncrementSrc(incrementImage);
    var incrementStyle = this.imageStyle(
      incrementImage,
      imageWidth,
      imageHeight
    );
    var decrementStyle = this.imageStyle(
      decrementImage,
      imageWidth,
      imageHeight
    );
    const {
      decrementOpacity,
      incrementOpacity,
      hasReachedMin,
      hasReachedMax
    } = this.state;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: backgroundColor, borderColor: tintColor }
        ]}
      >
        <TouchableOpacity
          ref={ref => this.decrementButton = ref}
          activeOpacity={activeOpacity}
          style={[
            styles.leftButton,
            { borderColor: tintColor, padding: padding }
          ]}
          onPress={this.decrementAction}
          disabled={hasReachedMin || disabled}
        >
          <Image
            style={[
              decrementStyle,
              tintDecrementStyle,
              { opacity: decrementOpacity }
            ]}
            source={decrementImageSrc}
          />
        </TouchableOpacity>
        <TouchableOpacity
          ref={ref => this.incrementButton = ref}
          activeOpacity={activeOpacity}
          style={[
            styles.rightButton,
            { borderColor: tintColor, padding: padding }
          ]}
          onPress={this.incrementAction}
          disabled={hasReachedMax || disabled}
        >
          <Image
            style={[
              incrementStyle,
              tintIncrementStyle,
              { opacity: incrementOpacity }
            ]}
            source={incrementImageSrc}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3,
    overflow: "hidden",
    alignItems: "center"
  },
  leftButton: {
    alignItems: "center"
  },
  rightButton: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  }
});
