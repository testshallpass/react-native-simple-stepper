import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import SimpleStepper from 'react-native-simple-stepper';
import { data } from './data';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }
  valueChanged(value, key) {
    var data = this.state.data.slice();
    data[key].value = value.toFixed(2);
    this.setState({
      data: data,
    });
  }
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.separator}>
        <View style={styles.content}>
          <Text
            style={[
              styles.value,
              {
                color: item.tintColor,
              },
            ]}
          >
            {item.value}
          </Text>
          <SimpleStepper
            tintColor={item.tintColor}
            valueChanged={value => this.valueChanged(value, item.key)}
            tintOnIncrementImage={item.tintOnIncrementImage}
            tintOnDecrementImage={item.tintOnDecrementImage}
            incrementImage={item.incrementImage}
            decrementImage={item.decrementImage}
            minimumValue={item.minimumValue}
            maximumValue={item.maximumValue}
            initialValue={item.initialValue}
            stepValue={item.stepValue}
            disabled={item.disabled}
            wraps={item.wraps}
          />
          {item.wraps &&
            <Text style={[styles.wraps, { color: item.tintColor }]}>
              {'wraps enabled'}
            </Text>}
          <View style={styles.row}>
            <Text style={styles.text}>{'initial: '}{item.initialValue}</Text>
            <Text style={styles.text}>{'min: '}{item.minimumValue}</Text>
            <Text style={styles.text}>{'max: '}{item.maximumValue}</Text>
            <Text style={styles.text}>{'step: '}{item.stepValue}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={item => `${item.key}`} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    color: '#222222',
    margin: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  wraps: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    borderBottomColor: '#222222',
    borderBottomWidth: 1,
  },
});
