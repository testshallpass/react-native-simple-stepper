import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { SimpleStepper } from './src/index';
import List from './List';
import items from './steppers.json';
const NAME = {
  basic: 'basic',
  text: 'text',
  style: 'style',
};

export default class App extends Component {
  _renderItem = ({ item, index }) => {
    const { name } = item;
    console.log(item);
    return (
      <View>
        {name == NAME.basic && this._renderBasic(item)}
        {name == NAME.text && this._renderText(item)}
      </View>
    );
  };
  _renderBasic = item => {
    const { props } = item;
    const { minimumValue, maximumValue, initialValue, stepValue, disabled, wraps, incrementImage, decrementImage } = props;
    const keys = Object.keys(props);
    return (
      <View key={item.id} style={styles.content}>
        <SimpleStepper
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          initialValue={initialValue}
          stepValue={stepValue}
          disabled={disabled}
          wraps={wraps}
          incrementImage={incrementImage}
          decrementImage={decrementImage}
        />
        {keys.map(key => {
          return <Text key={key} style={styles.key}>{`${key}: ${props[key]}`}</Text>;
        })}
      </View>
    );
  };
  _renderText = item => {
    const { props } = item;
    const { minimumValue, maximumValue, initialValue, stepValue, disabled, wraps, showText, textPosition } = props;
    const keys = Object.keys(props);
    return (
      <View key={item.id} style={styles.content}>
        <SimpleStepper
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          initialValue={initialValue}
          stepValue={stepValue}
          disabled={disabled}
          wraps={wraps}
          showText={showText}
          textPosition={textPosition}
        />
        {keys.map(key => {
          return <Text key={key} style={styles.key}>{`${key}: ${props[key]}`}</Text>;
        })}
      </View>
    );
  };
  _renderStyle = ({ item, index }) => {};
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <List items={items} renderItem={this._renderItem} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  key: {
    fontSize: 14,
    color: '#222222',
  },
  content: {
    padding: 8,
  },
});
