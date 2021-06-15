import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import SimpleStepper from './src/SimpleStepper';
import {STEPPERS} from './constants';

const StepperHolder = ({
  stepper = {},
  value = 0,
  onValueChanged = () => {},
}) => {
  const {props} = stepper;
  return (
    <View style={styles.holder}>
      <View style={styles.stepper}>
        <SimpleStepper
          {...props}
          valueChanged={newValue => onValueChanged(newValue)}
        />
      </View>
      {!props.showText && (
        <Text style={styles.value}>{`value is ${value}`}</Text>
      )}
    </View>
  );
};

const App = () => {
  const [stepper, setStepper] = useState(STEPPERS[0]);
  const [value, setValue] = useState(stepper.value);

  const _renderItem = ({item, index}) => {
    const {name, description} = item;
    let nameStyle = styles.name;
    if (stepper.name === item.name) {
      nameStyle = [styles.name, {fontWeight: '800'}];
    }
    return (
      <Pressable style={styles.button} onPress={() => setStepper(item)}>
        <Text style={nameStyle}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </Pressable>
    );
  };

  const _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepperHolder
        stepper={stepper}
        value={value}
        onValueChanged={newValue => setValue(newValue)}
      />
      <FlatList
        data={STEPPERS}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={_renderSeparator}
        ListFooterComponent={_renderSeparator}
        ItemSeparatorComponent={_renderSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  holder: {
    margin: 10,
  },
  stepper: {
    alignSelf: 'center',
  },
  button: {
    margin: 8,
  },
  name: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  value: {
    textAlign: 'center',
    fontSize: 18,
  },
  separator: {
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
  },
});

export default App;
