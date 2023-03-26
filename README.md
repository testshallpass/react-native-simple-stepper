# react-native-simple-stepper

[![Platform](https://img.shields.io/badge/-react--native-grey.svg?style=for-the-badge&logo=react)](https://reactnative.dev)
[![npm version](https://img.shields.io/npm/v/react-native-simple-stepper.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/react-native-simple-stepper)
[![npm version](https://img.shields.io/npm/dm/react-native-simple-stepper.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/react-native-simple-stepper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.github.com/testshallpass/react-native-simple-stepper/master/LICENSE)
[![CI](https://github.com/testshallpass/react-native-simple-stepper/actions/workflows/ci.yml/badge.svg)](https://github.com/testshallpass/react-native-simple-stepper/actions/workflows/ci.yml)

A parity version of the iOS [UIStepper](https://developer.apple.com/reference/uikit/uistepper).

![screenshot](./screenshots/stepper.png)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Text Position](#text-position)
- [Props](SimpleStepper.tsx)
- [More Examples](./example/App.tsx)

## Installation

|                                                  |
| ------------------------------------------------ |
| `yarn add react-native-simple-stepper`           |
| `npm install react-native-simple-stepper --save` |

## Usage

```javascript
import SimpleStepper from 'react-native-simple-stepper';

function Example() {
  return <SimpleStepper valueChanged={value => console.log(value)} />;
}

export default Example;
```

## Text Position

|                 left                  |            center (default)             |                 right                  |
| :-----------------------------------: | :-------------------------------------: | :------------------------------------: |
| ![screenshot](./screenshots/left.png) | ![screenshot](./screenshots/center.png) | ![screenshot](./screenshots/right.png) |

```javascript
import SimpleStepper from 'react-native-simple-stepper';

function TextPositionExample() {
  return <SimpleStepper showText={true} textPosition={'right'} />;
}

export default TextPositionExample;
```
