import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList, View} from 'react-native';
import {SimpleStepper} from 'react-native-simple-stepper';
import {TYPE, ITEMS} from './data';

const App = () => {
  const [items, setItems] = useState(ITEMS);

  const _onValueChanged = (value, item) => {
    if (!item.props.showText) {
      let data = items.slice();
      if (`${value}`.length > 4) {
        data[item.key].value = value.toFixed(2);
      } else {
        data[item.key].value = value;
      }
      setItems(data);
    }
  };

  const _renderItem = ({item}) => {
    const {type} = item;
    return (
      <View>
        {type === TYPE.basic && _renderBasic(item)}
        {type === TYPE.action && _renderAction(item)}
        {type === TYPE.style && _renderStyle(item)}
      </View>
    );
  };

  const _renderAction = (item) => {
    const {value, props} = item;
    const {onMin, onMax, onIncrement, onDecrement} = props;
    return (
      <View style={styles.content}>
        <View style={styles.stepper}>
          <SimpleStepper
            onMin={onMin}
            onMax={onMax}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            valueChanged={(val) => _onValueChanged(val, item)}
          />
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  };

  const _renderBasic = (item) => {
    const {value, props} = item;
    const {
      minimumValue,
      maximumValue,
      initialValue,
      stepValue,
      disabled,
      wraps,
      incrementImage,
      decrementImage,
    } = props;
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
            valueChanged={(val) => _onValueChanged(val, item)}
          />
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  };

  const _renderStyle = (item) => {
    const {value, props} = item;
    const {
      showText,
      textPosition,
      textStyle,
      containerStyle,
      separatorStyle,
      incrementImageStyle,
      decrementImageStyle,
    } = props;
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
            valueChanged={(val) => _onValueChanged(val, item)}
          />
          {!showText && <Text style={styles.value}>{value}</Text>}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={_renderItem}
        extraData={items}
        keyExtractor={(item) => `${item.key}`}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
      />
    </SafeAreaView>
  );
};

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
    margin: 8,
  },
  separator: {
    backgroundColor: 'black',
    height: 1,
  },
});

export default App;
