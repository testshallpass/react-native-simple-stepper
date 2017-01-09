import SimpleStepper from 'react-native-simple-stepper'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blue: 0,
      peru: 0,
      red: 0
    }
    this.valueChangedBlue = this.valueChangedBlue.bind(this)
    this.valueChangedPeru = this.valueChangedPeru.bind(this)
    this.valueChangedRed = this.valueChangedRed.bind(this)
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.text, {fontSize: 22}]}>{'Simple Stepper'}</Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={[styles.text, {fontSize: 32, color: 'blue'}]}>{this.state.blue}</Text>
          <SimpleStepper valueChanged={this.valueChangedBlue} />
          <Text style={styles.text}> {'\n'}{'min 0, max 10, initialValue is 0 and stepValue is 1'}{'\n'} </Text>
          <Text style={[styles.text, {fontSize: 32, color: 'peru'}]}>{this.state.peru}</Text>
          <SimpleStepper valueChanged={this.valueChangedPeru} tintColor={'peru'} maximumValue={15} initialValue={.99} stepValue={.99}/>
          <Text style={styles.text}> {'\n'}{'min is 0, max is 15, initialValue is .99 and stepValue is .99'}{'\n'} </Text>
          <Text style={[styles.text, {fontSize: 32, color: '#cc3232'}]}>{this.state.red}</Text>
          <SimpleStepper valueChanged={this.valueChangedRed} tintColor={'#cc3232'} minimumValue={-100} maximumValue={100} initialValue={50} stepValue={25} />
          <Text style={styles.text}> {'\n'}{'min is -100, max is 100, initialValue is 50 and stepValue is 25'}{'\n'} </Text>
        </View>
      </ScrollView>
    );
  }
  valueChangedBlue(value) {
    this.setState({
      blue: value
    })
  }
  valueChangedPeru(value) {
    this.setState({
      peru: value.toFixed(2)
    })
  }
  valueChangedRed(value) {
    this.setState({
      red: value
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
    marginTop: 22
  },
  text: {
    fontSize: 13,
    textAlign: 'center'
  },
});
