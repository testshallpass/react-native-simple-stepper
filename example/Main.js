
import SimpleStepper from './SimpleStepper'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
    this.handleValueChanged = this.handleValueChanged.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Simple Stepper
        </Text>
        <SimpleStepper valueChanged={this.handleValueChanged} />
        <Text style={styles.text}>
          Value is: {this.state.value}
        </Text>
        <Text style={styles.text}>
          minimumValue is: 0
        </Text>
        <Text style={styles.text}>
          maximumValue is: 10
        </Text>
        <Text style={styles.text}>
          initialValue is: 0
        </Text>
        <Text style={styles.text}>
          stepValue is: 1
        </Text>
      </View>
    );
  }
  handleValueChanged(value) {
    this.setState({
      value: value
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 8,
  },
});
