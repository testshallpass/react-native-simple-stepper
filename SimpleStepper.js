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
    disabled: PropTypes.bool,
    renderDecrement: PropTypes.func,
    renderIncrement: PropTypes.func,
    wraps: PropTypes.bool,
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
    disabled: false,
    renderDecrement: null,
    renderIncrement: null,
    wraps: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
      decrementOpacity: 1,
      incrementOpacity: 1,
      hasReachedMin: false,
      hasReachedMax: false,
      stepValue: props.stepValue
    };
  }
  componentWillMount() {
    this.validateValue(
      this.props.initialValue,
      this.props.minimumValue,
      this.props.maximumValue,
      this.props.disabled,
      this.props.stepValue
    );
  }
  componentWillReceiveProps(nextProps) {
    const {
      initialValue,
      stepValue,
      minimumValue,
      maximumValue,
      disabled,
      wraps
    } = this.props;
    if (nextProps.initialValue !== initialValue) {
      this.validateValue(
        nextProps.initialValue,
        nextProps.minimumValue,
        nextProps.maximumValue,
        nextProps.disabled,
        nextProps.stepValue,
        nextProps.wraps,
      );
    } else if (
      nextProps.disabled !== disabled || nextProps.stepValue !== stepValue
    ) {
      this.validateValue(
        this.state.value,
        nextProps.minimumValue,
        nextProps.maximumValue,
        nextProps.disabled,
        nextProps.stepValue,
        nextProps.wraps,
      );
    } else if (
      nextProps.minimumValue !== minimumValue ||
      nextProps.maximumValue !== maximumValue
    ) {
      const isValidNextMin = nextProps.minimumValue < maximumValue;
      const isValidNextMax = nextProps.maximumValue > minimumValue;
      if (isValidNextMin && isValidNextMax) {
        this.validateValue(
          this.state.value,
          nextProps.minimumValue,
          nextProps.maximumValue,
          nextProps.disabled,
          nextProps.stepValue,
          nextProps.wraps,
        );
      } else {
        if (isValidNextMin == false && isValidNextMax == false) {
          console.warn(
            "Warning: Simple Stepper update failed because nextProps min value(" +
              nextProps.minimumValue +
              ") is higher than current max value(" +
              maximumValue +
              ")."
          );
          console.warn(
            "Warning: Simple Stepper update failed because nextProps max value(" +
              nextProps.maximumValue +
              ") is lower than current min value(" +
              minimumValue +
              ")."
          );
        } else if (isValidNextMin == false) {
          console.warn(
            "Warning: Simple Stepper update failed because nextProps min value(" +
              nextProps.minimumValue +
              ") is higher than current max value(" +
              maximumValue +
              ")."
          );
        } else if (isValidNextMax == false) {
          console.warn(
            "Warning: Simple Stepper update failed because nextProps max value(" +
              nextProps.maximumValue +
              ") is lower than current min value(" +
              minimumValue +
              ")."
          );
        }
      }
    }
  }
  decrementAction = () => {
    var value = this.state.value;
    var stepValue = this.state.stepValue;
    value -= stepValue;
    this.validateValue(
      value,
      this.props.minimumValue,
      this.props.maximumValue,
      this.props.disabled,
      stepValue,
      this.props.wraps
    );
  };
  incrementAction = () => {
    var value = this.state.value;
    var stepValue = this.state.stepValue;
    value += stepValue;
    this.validateValue(
      value,
      this.props.minimumValue,
      this.props.maximumValue,
      this.props.disabled,
      stepValue,
      this.props.wraps
    );
  };
  validateValue = (value, min, max, disabled, step, wraps) => {
    if (step == 0) {
      console.warn("Warning: Simple Stepper step value is zero (0).");
    }
    var hasReachedMax = (wraps) ? false : value >= max;
    var hasReachedMin = (wraps) ? false : value <= min;
    if (step < 0) {
      // step value is negative so swap the max and min conditions.
      // FIXME: min and max values when step is negative and wraps is true.
      hasReachedMax = (wraps) ? false : value <= min;
      hasReachedMin = (wraps) ? false : value >= max;
    }
    if (value > max) {
      value = (wraps) ? min : max;
    } else if (value == max) {
      value = max
    } else if (value < min) {
      value = (wraps) ? max : min
    } else if (value == min) {
      value = min
    }
    this.setState({
      value: value,
      stepValue: step,
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
  };
  tintStyle(status) {
    if (status) {
      return { tintColor: this.props.tintColor };
    }
    return null;
  }
  imageSrc(src, type) {
    if (typeof src == "string") {
      if (src.length == 0) {
        if (type == "decrement") {
          return require("./assets/decrement.png");
        } else if (type == "increment") {
          return require("./assets/increment.png");
        }
      } else if (src.length > 0) {
        return { uri: src };
      }
    }
    return src;
  }
  imageStyle(src, width, height) {
    if (typeof src == "string") {
      if (src.length > 0) {
        return { width: width, height: height };
      }
    }
    return null;
  }
  renderImage(renderProp, style, tintStyle, opacity, src) {
    if (typeof renderProp == "function") {
      const data = {
        "style": style,
        "tintStyle": tintStyle,
        "opacity": opacity,
        "source": src
      }
      return renderProp(data)
    }
    return (
      <Image
        style={[
          style,
          tintStyle,
          { opacity: opacity }
        ]}
        source={src}
       />
    )
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
      disabled,
      renderDecrement,
      renderIncrement,
    } = this.props;
    const tintIncrementStyle = this.tintStyle(tintOnIncrementImage);
    const tintDecrementStyle = this.tintStyle(tintOnDecrementImage);
    const decrementImageSrc = this.imageSrc(decrementImage, "decrement");
    const incrementImageSrc = this.imageSrc(incrementImage, "increment");
    const incrementStyle = this.imageStyle(
      incrementImage,
      imageWidth,
      imageHeight
    );
    const decrementStyle = this.imageStyle(
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
        <View> 
          {this.renderImage(renderDecrement, decrementStyle, tintDecrementStyle, decrementOpacity, decrementImageSrc)}
        </View>
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
        <View> 
          {this.renderImage(renderIncrement, incrementStyle, tintIncrementStyle, incrementOpacity, incrementImageSrc)}
        </View>        
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
