
import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, TouchableHighlight, Image, View} from 'react-native';

export default class SimpleStepper extends Component {
  static propTypes = {
    initialValue: React.PropTypes.number,
    minimumValue: React.PropTypes.number,
    maximumValue: React.PropTypes.number,
    stepValue: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    tintColor: React.PropTypes.string,
    underlayColor: React.PropTypes.string
  }
  static defaultProps = {
    initialValue: 0,
    minimumValue: 0,
    maximumValue: 10,
    stepValue: 1,
    backgroundColor: 'transparent',
    tintColor: 'blue',
    underlayColor: 'lightgray'
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
    this.validateValue = this.validateValue.bind(this)
  }
  componentWillMount() {
    this.validateValue(this.props.initialValue)
  }
  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor, borderColor: this.props.tintColor}]}>
        <TouchableHighlight style={[styles.stepButton, {opacity: this.state.decrementOpacity}]} underlayColor={this.props.underlayColor} onPress={this.decrementAction} disabled={this.state.hasReachedMin}>
          <Image style={{tintColor: this.props.tintColor}} source={require('./assets/decrement.png')} />
        </TouchableHighlight>
        <View style={[styles.divider, {backgroundColor: this.props.tintColor}]} />
        <TouchableHighlight style={[styles.stepButton, {opacity: this.state.incrementOpacity}]} underlayColor={this.props.underlayColor} onPress={this.incrementAction} disabled={this.state.hasReachedMax}>
          <Image style={{tintColor: this.props.tintColor}} source={require('./assets/increment.png')} />
        </TouchableHighlight>
      </View>
    )
  }
  decrementAction() {
    var value = this.state.value
    var stepValue = this.props.stepValue
    value -= stepValue
    this.validateValue(value)
  }
  incrementAction() {
    var value = this.state.value
    var stepValue = this.props.stepValue
    value += stepValue
    this.validateValue(value)
  }
  validateValue(value) {
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
    paddingTop: 2,
  },
  divider: {
    height: 28,
    width: 0.5,
  },
})
