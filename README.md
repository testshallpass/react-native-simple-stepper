# react-native-simple-stepper

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-simple-stepper.svg)](https://www.npmjs.com/package/react-native-simple-stepper)
[![npm version](http://img.shields.io/npm/dm/react-native-simple-stepper.svg)](https://www.npmjs.com/package/react-native-simple-stepper)
[![Build Status](https://travis-ci.org/testshallpass/react-native-simple-stepper.svg?branch=master)](https://travis-ci.org/testshallpass/react-native-simple-stepper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/testshallpass/react-native-simple-stepper/master/LICENSE)

![screenshot](https://raw.github.com/testshallpass/react-native-simple-stepper/master/screenshots/red.png) ![screenshot](https://raw.github.com/testshallpass/react-native-simple-stepper/master/screenshots/blue.png) ![screenshot](https://raw.github.com/testshallpass/react-native-simple-stepper/master/screenshots/green.png) ![screenshot](https://raw.github.com/testshallpass/react-native-simple-stepper/master/screenshots/custom.png)

A super simple react-native implementation of the [UIStepper](https://developer.apple.com/reference/uikit/uistepper) control from iOS.

## Installation
```npm i react-native-simple-stepper --save```

## Usage
```javascript
import SimpleStepper from 'react-native-simple-stepper'
//...
render() {
  return (
    <SimpleStepper valueChanged={(value) => this.valueChanged(value)} />
  )
}
valueChanged(value) {
  // If you want to set the value to a certain decimal point you can like so:
  const displayValue = value.toFixed(2)
  this.setState({
     displayValue: displayValue
  })
  // ...
}
//...
```
## Demo
![screenshot](https://raw.github.com/testshallpass/react-native-simple-stepper/master/screenshots/demo.gif)

## Props
| Name | Type | Description | Default |
| --- | :---: | --- | --- |
| ```initialValue``` | Number  | initial value | 0
| ```minimumValue``` | Number  | minimum value | 0
| ```maximumValue``` | Number  | maximum value | 10
| ```stepValue``` | Number  | step value (i.e. increment by 10) | 1
| ```backgroundColor``` | String  | background color | transparent
| ```tintColor``` | String  | color for border, divider and images | blue
| ```iconColor``` | String  | color for image if not specified defaults to tintColor | tintColor
| ```padding``` | Number | stepper padding | 4
| ```valueChanged``` | Function  | Fires when the value changes and the value will be passed down for processing like display or calculations | null
| ```incrementImage``` | String or Number  | network or local image | require('./assets/increment.png')
| ```decrementImage``` | String or Number  | network or local image | require('./assets/decrement.png')
| ```tintOnIncrementImage``` | Boolean  | whether or not you want tintColor applied to increment image | true
| ```tintOnDecrementImage``` | Boolean  | whether or not you want tintColor applied to decrement image | true
| ```imageHeight``` | Number  | network image height | 36
| ```imageWidth``` | Number  | network image width | 36
| ```activeOpacity``` | Number  | touch opacity | 0.4
| ```disabledOpacity``` | Number  | when step button is disabled | 0.5
| ```disabled``` | Boolean  | stepper disable state | false
| ```wraps``` | Boolean  | whether or not it wraps. [more info](https://developer.apple.com/documentation/uikit/uistepper/1624068-wraps) | false
| ```renderIncrement``` | Function  | render increment component(s) | null
| ```renderDecrement``` | Function  | render decrement component(s) | null
| ```onIncrement``` | Function  | called when the value of the stepper increases. Passes the new value as a paramter | null
| ```onDecrement``` | Function  | called when the value of the stepper decreses. Passes the new value as a paramter  | null
