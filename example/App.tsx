import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import SimpleStepper from './src/SimpleStepper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StepperItem {
  name: string;
  description: string;
  stepper: React.JSX.Element;
}

interface StepperExample {
  item: StepperItem;
  index: number;
}

const steppers: StepperItem[] = [
  {
    name: 'Default stepper',
    description:
      'This stepper does not have any properties defined so defaults are used.',
    stepper: <SimpleStepper />,
  },
  {
    name: 'Vertical stepper',
    description:
      'This stepper has vertical layout because horizontal is set to false.',
    stepper: <SimpleStepper horizontal={false} />,
  },
  {
    name: 'Wraps stepper',
    description:
      'This stepper has wraps set to true so it can cycle around minimum (0) and maximum (10). It displays value with showText.',
    stepper: <SimpleStepper wraps showText />,
  },
  {
    name: 'Decimal stepper',
    description:
      'This stepper has initialValue and stepValue set to a decimal number (0.99). It displays value with showText.',
    stepper: <SimpleStepper initialValue={0.99} stepValue={0.99} showText />,
  },
  {
    name: 'Negative stepper',
    description:
      'This stepper has stepValue set to a negative number (-1). It displays value with showText.',
    stepper: <SimpleStepper stepValue={-1} showText />,
  },
  {
    name: 'Remote image stepper',
    description:
      'This stepper has incrementImage and decrementImage set to remote images.',
    stepper: (
      <SimpleStepper
        incrementImage={{
          uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png',
        }}
        decrementImage={{
          uri: 'https://prettier.io/icon.png',
        }}
      />
    ),
  },
  {
    name: 'Action stepper',
    description:
      'This stepper uses onMin, onMax, onIncrement, onDecrement and valueChanged functions to log values.',
    stepper: (
      <SimpleStepper
        onMin={(value: number) => {
          console.log('[onMin] value: ', value);
        }}
        onMax={(value: number) => {
          console.log('[onMax] value: ', value);
        }}
        onIncrement={(value: number) => {
          console.log('[onIncrement] value: ', value);
        }}
        onDecrement={(value: number) => {
          console.log('[onDecrement] value: ', value);
        }}
        valueChanged={(value: number) => {
          console.log('[valueChanged] value: ', value);
        }}
      />
    ),
  },
  {
    name: 'Red stepper',
    description:
      'This stepper uses color and useColor to make it red. It also displays value with showText.',
    stepper: <SimpleStepper color={'red'} useColor showText />,
  },
  {
    name: 'Green stepper',
    description:
      'This stepper sets textPosition to right (default is center). It also uses color and useColor to make it green. It displays value with showText.',
    stepper: (
      <SimpleStepper textPosition={'right'} color={'green'} useColor showText />
    ),
  },
  {
    name: 'Blue stepper',
    description:
      'This stepper sets textPosition to left (default is center). It also uses color and useColor to make it blue. It displays value with showText.',
    stepper: (
      <SimpleStepper textPosition={'left'} color={'blue'} useColor showText />
    ),
  },
];

export default function App(): React.JSX.Element {
  function _renderItem(example: StepperExample): React.JSX.Element {
    const { name, description, stepper } = example.item;
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{name}</Text>
        {stepper}
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }

  function _renderSeparator(): React.JSX.Element {
    return <View style={styles.separator} />;
  }

  function _renderHeader(): React.JSX.Element {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{'Stepper examples'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={steppers}
        initialNumToRender={steppers.length}
        renderItem={_renderItem}
        keyExtractor={(_item, index) => `${index}`}
        ItemSeparatorComponent={_renderSeparator}
        ListHeaderComponent={_renderHeader}
      />
    </SafeAreaView>
  );
}

const color = {
  black: 'black',
  whitesmoke: 'whitesmoke',
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    paddingVertical: 4,
  },
  header: {
    borderBottomColor: color.black,
    borderBottomWidth: 1,
    padding: 8,
  },
  item: {
    flexDirection: 'column',
    marginHorizontal: 8,
    padding: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 4,
  },
  safeAreaView: {
    backgroundColor: color.whitesmoke,
  },
  separator: {
    backgroundColor: color.black,
    height: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
