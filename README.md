## react-native-simple-stepper

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-simple-stepper.svg)](https://www.npmjs.com/package/react-native-simple-stepper)
[![npm version](http://img.shields.io/npm/dm/react-native-simple-stepper.svg)](https://www.npmjs.com/package/react-native-simple-stepper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/devBrian/react-native-simple-stepper/master/LICENSE)

![screenshot](https://raw.github.com/devBrian/react-native-simple-stepper/master/screenshots/stepper.png)

A super simple react-native implementation of the classic UIStepper from iOS. Check out the props below for customization.

### Installation
---
```bash
npm i react-native-simple-stepper --save
```

### Demo
---
![screenshot](https://raw.github.com/devBrian/react-native-simple-stepper/master/screenshots/demo.gif)

### Props
---
| Name | Type | Description | Default
| ------------ | ------------- | ------------ |------------ |------------ |
| ```initialValue``` | Number  | initial value | 0
| ```minimumValue``` | Number  | minimum value | 0
| ```maximumValue``` | Number  | maximum value | 10
| ```stepValue``` | Number  | step value (i.e. increment by 10) | 1
| ```backgroundColor``` | String  | background color | transparent
| ```tintColor``` | String  | color for border, divider and images | blue
| ```underlayColor``` | String  | tap color | lightgray
| ```valueChanged``` | Function  | Fires when value changes and it will be passed down | null
