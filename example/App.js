import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { SimpleStepper } from './src/index';
import List from './List';
import { TYPE, ITEMS } from './data';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ITEMS,
    };
  }
  _onValueChanged = (value, item) => {
    if (!item.props.showText) {
      let data = this.state.items.slice();
      if (`${value}`.length > 4) {
        data[item.key].value = value.toFixed(2);
      } else {
        data[item.key].value = value;
      }
      this.setState({
        items: data
      });
    }
  }
  _renderItem = ({ item }) => {
    const { type } = item;
    return (
      <View>
        {type == TYPE.basic && this._renderBasic(item)}
        {type == TYPE.action && this._renderAction(item)}
        {type == TYPE.style && this._renderStyle(item)}
      </View>
    );
  };
  _renderAction = item => {
    const { value, props } = item;
    const { onMin, onMax, onIncrement, onDecrement } = props;
    return (
      <View style={styles.content}>
        <View style={styles.stepper}>
          <SimpleStepper
            onMin={onMin}
            onMax={onMax}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            valueChanged={value => this._onValueChanged(value, item)}
          />
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  };
  _renderBasic = item => {
    const { value, props } = item;
    const { minimumValue, maximumValue, initialValue, stepValue, disabled, wraps, incrementImage, decrementImage } = props;
    return (
      <View style={styles.content}>
        <View style={styles.stepper}>
          <SimpleStepper
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            initialValue={initialValue}
            stepValue={stepValue}
            disabled={disabled}
            wraps={wraps}
            incrementImage={incrementImage}
            decrementImage={decrementImage}
            valueChanged={value => this._onValueChanged(value, item)}
          />
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  };
  _renderStyle = item => {
    const { value, props } = item;
    const { showText, textPosition, textStyle, containerStyle, separatorStyle, incrementImageStyle, decrementImageStyle } = props;
    return (
      <View style={styles.content}>
        <View style={styles.stepper}>
          <SimpleStepper
            showText={showText}
            textPosition={textPosition}
            textStyle={textStyle}
            containerStyle={containerStyle}
            separatorStyle={separatorStyle}
            incrementImageStyle={incrementImageStyle}
            decrementImageStyle={decrementImageStyle}
            valueChanged={value => this._onValueChanged(value, item)}
          />
          {!showText && <Text style={styles.value}>{value}</Text>}
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <List extraData={this.state} items={this.state.items} renderItem={this._renderItem} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF',
  },
  column: {
    padding: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
    padding: 8,
  },
  key: {
    fontSize: 14,
    color: '#222222',
  },
  content: {
    paddingVertical: 8,
    justifyContent: 'space-evenly',
  },
  stepper: {
    flexDirection: 'row',
    margin: 8
  }
});
