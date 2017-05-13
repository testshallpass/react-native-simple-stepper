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
    decrementImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
    disabledOpacity: 0.5
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
    this.decrementAction = this.decrementAction.bind(this);
    this.incrementAction = this.incrementAction.bind(this);
    this.validateInitialValue = this.validateInitialValue.bind(this);
  }
  componentWillMount() {
    this.validateInitialValue(this.props.initialValue);
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue, stepValue } = this.props;
    if (
      nextProps.initialValue !== initialValue ||
      nextProps.stepValue !== stepValue
    ) {
      this.validateInitialValue(nextProps.initialValue);
    }
  }
  decrementAction() {
    var value = this.state.value;
    var stepValue = this.props.stepValue;
    value -= stepValue;
    this.validateInitialValue(value);
  }
  incrementAction() {
    var value = this.state.value;
    var stepValue = this.props.stepValue;
    value += stepValue;
    this.validateInitialValue(value);
  }
  validateInitialValue(value) {
    var maximumValue = this.props.maximumValue;
    var minimumValue = this.props.minimumValue;
    if (value >= maximumValue) {
      value = maximumValue; // prevent overflow value
      this.setState({
        value: maximumValue,
        hasReachedMax: true,
        hasReachedMin: false,
        decrementOpacity: 1,
        incrementOpacity: this.props.disabledOpacity
      });
    } else if (value <= minimumValue) {
      value = minimumValue; // prevent overflow value
      this.setState({
        value: minimumValue,
        hasReachedMin: true,
        hasReachedMax: false,
        decrementOpacity: this.props.disabledOpacity,
        incrementOpacity: 1
      });
    } else {
      if (this.state.hasReachedMax || this.state.hasReachedMin) {
        this.setState({
          value: value,
          hasReachedMin: false,
          hasReachedMax: false,
          decrementOpacity: 1,
          incrementOpacity: 1
        });
      } else {
        this.setState({
          value: value
        });
      }
    }
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
      activeOpacity
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
          disabled={hasReachedMin}
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
          disabled={hasReachedMax}
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
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  }
});
