import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, TouchableHighlight, Image, View} from 'react-native'

export default class SimpleStepper extends Component {
  static propTypes = {
    initialValue: PropTypes.number,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    stepValue: PropTypes.number,
    backgroundColor: PropTypes.string,
    tintColor: PropTypes.string,
    underlayColor: PropTypes.string,
    valueChanged: PropTypes.func,
    tintOnIncrementImage: PropTypes.bool,
    tintOnDecrementImage: PropTypes.bool,
    incrementImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    decrementImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }
  static defaultProps = {
    initialValue: 0,
    minimumValue: 0,
    maximumValue: 10,
    stepValue: 1,
    backgroundColor: 'transparent',
    tintColor: 'blue',
    underlayColor: 'lightgray',
    valueChanged: null,
    decrementImage: require('./assets/decrement.png'),
    incrementImage: require('./assets/increment.png'),
    tintOnIncrementImage: true,
    tintOnDecrementImage: true,
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue,
      decrementOpacity: 1,
      incrementOpacity: 1,
      hasReachedMin: false,
      hasReachedMax: false
    }
    this.decrementAction = this.decrementAction.bind(this)
    this.incrementAction = this.incrementAction.bind(this)
    this.validateInitialValue = this.validateInitialValue.bind(this)
  }
  componentWillMount() {
    this.validateInitialValue(this.props.initialValue)
  }
  decrementAction() {
    var value = this.state.value
    var stepValue = this.props.stepValue
    value -= stepValue
    this.validateInitialValue(value)
  }
  incrementAction() {
    var value = this.state.value
    var stepValue = this.props.stepValue
    value += stepValue
    this.validateInitialValue(value)
  }
  validateInitialValue(value) {
    var maximumValue = this.props.maximumValue
    var minimumValue = this.props.minimumValue
    if (value >= maximumValue) {
      value = maximumValue // prevent overflow value
      this.setState({
        value: maximumValue,
        hasReachedMax: true,
        hasReachedMin: false,
        incrementOpacity: 0.5,
        decrementOpacity: 1
      })
    } else if (value <= minimumValue) {
      value = minimumValue // prevent overflow value
      this.setState({
        value: minimumValue,
        hasReachedMin: true,
        hasReachedMax: false,
        decrementOpacity: 0.5,
        incrementOpacity: 1
      })
    } else {
      this.setState({
        value: value,
        hasReachedMin: false,
        hasReachedMax: false,
        incrementOpacity: 1,
        decrementOpacity: 1
      })
    }
    if (this.props.valueChanged) {
      this.props.valueChanged(value)
    }
  }
  render() {
    var tintIncrementStyle
    var tintDecrementStyle
    if (this.props.tintOnIncrementImage) {
      tintIncrementStyle = {tintColor: this.props.tintColor}
    }
    if (this.props.tintOnDecrementImage) {
      tintDecrementStyle = {tintColor: this.props.tintColor}
    }
    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor, borderColor: this.props.tintColor}]}>
        <TouchableHighlight style={[styles.stepButton, {opacity: this.state.decrementOpacity}]} underlayColor={this.props.underlayColor} onPress={this.decrementAction} disabled={this.state.hasReachedMin}>
          <Image style={[tintDecrementStyle, styles.imageStyle]} source={this.props.decrementImage} resizeMode="contain" />
        </TouchableHighlight>
        <View style={[styles.divider, {backgroundColor: this.props.tintColor}]} />
        <TouchableHighlight style={[styles.stepButton, {opacity: this.state.incrementOpacity}]} underlayColor={this.props.underlayColor} onPress={this.incrementAction} disabled={this.state.hasReachedMax}>
          <Image style={[tintIncrementStyle, styles.imageStyle]} source={this.props.incrementImage} resizeMode="contain" />
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: 94,
    height: 29,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    overflow: 'hidden'
  },
  stepButton: {
    alignItems: 'center',
    width: 46,
    height: 28,
    paddingTop: 2
  },
  divider: {
    height: 28,
    width: 0.5,
  },
  image: {
    width: 24,
    height: 24,
    paddingTop: 1
  }
})
