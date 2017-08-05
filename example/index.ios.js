import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Main from './Main';

class SimpleStepper extends Component {
  render() {
    return <Main />;
  }
}
AppRegistry.registerComponent('SimpleStepper', () => SimpleStepper);
