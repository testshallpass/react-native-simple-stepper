
import Main from './Main'
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet
} from 'react-native'

class SimpleStepper extends Component {
  render() {
    return (
      <Main />
    )
  }
}

const styles = StyleSheet.create({
  // ...
})

AppRegistry.registerComponent('SimpleStepper', () => SimpleStepper)
