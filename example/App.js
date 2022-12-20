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

const App = () => {
  const [stepper, setStepper] = useState(STEPPERS[0]);
  const [value, setValue] = useState(stepper.value);

  const _renderItem = ({item}) => {
    const {name, description} = item;
    const isSelected = stepper.name === item.name;
    let nameStyle = styles.name;
    let buttonStyle = styles.button;
    if (isSelected) {
      nameStyle = [styles.name, {fontWeight: '800'}];
      buttonStyle = [styles.button, {backgroundColor: 'whitesmoke'}];
    }
    return (
      <Pressable style={buttonStyle} onPress={() => setStepper(item)}>
        <Text style={nameStyle}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holder}>
        <View style={styles.stepper}>
          <SimpleStepper
            {...stepper.props}
            valueChanged={newValue => setValue(newValue)}
          />
        </View>
        <Text style={styles.value}>{`value is ${value}`}</Text>
      </View>
      <FlatList
        data={STEPPERS}
        extraData={stepper}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    padding: 8,
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
