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
      red: 0,
      purple: 0
    }
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.text, {fontSize: 22, marginTop: 22}]}>{'Simple Stepper'}</Text>
        <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SimpleStepper valueChanged={(value) => this.valueChangedBlue(value)} />
          <Text style={[styles.text, {fontSize: 32, color: 'blue', padding: 4}]}>{this.state.blue}</Text>
          <Text style={styles.text}>{' min 0, max 10,\n initialValue is 0\n stepValue is 1'}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
          <SimpleStepper valueChanged={(value) => this.valueChangedPeru(value)} tintColor={'peru'} maximumValue={15} initialValue={.99} stepValue={.99}/>
          <Text style={[styles.text, {fontSize: 32, color: 'peru'}]}>{this.state.peru}</Text>
          <Text style={styles.text}>{'min is 0, max is 15,\n initialValue is .99\n stepValue is .99'} </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
          <SimpleStepper valueChanged={(value) => this.valueChangedRed(value)} tintColor={'#cc3232'} minimumValue={-100} maximumValue={100} initialValue={50} stepValue={25} />
          <Text style={[styles.text, {fontSize: 32, color: '#cc3232'}]}>{this.state.red}</Text>
          <Text style={styles.text}>{'min is -100, max is 100,\n initialValue is 50\n stepValue is 25'} </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
          <SimpleStepper
            tintColor={'purple'}
            valueChanged={(value) => this.valueChangedPurple(value)}
            tintOnIncrementImage={false}
            tintOnDecrementImage={false}
            incrementImage={'https://facebook.github.io/react/img/logo_og.png'}
            decrementImage={'https://facebook.github.io/react/img/logo_og.png'}
           />
           <Text style={[styles.text, {fontSize: 32, color: 'purple'}]}>{this.state.purple}</Text>
           <Text style={styles.text}>{'min 0, max 10,\n initialValue is 0\n stepValue is 1'}</Text>
          </View>
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
      peru: ' $' + value.toFixed(2)
    })
  }
  valueChangedRed(value) {
    this.setState({
      red: value
    })
  }
  valueChangedPurple(value) {
    this.setState({
      purple: value
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
