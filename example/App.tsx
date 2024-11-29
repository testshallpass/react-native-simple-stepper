import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import SimpleStepper from 'react-native-simple-stepper';

const reactNativeFavicon = {
  uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png',
};

const steppers = [
  {
    name: 'Default stepper',
    description: 'Default everything.',
    stepper: <SimpleStepper />,
  },
  {
    name: 'Wraps stepper',
    description:
      'It shall cycle around dictated by minimum (0) and maximum (10) values. showText enabled to help demonstrate it',
    stepper: <SimpleStepper wraps showText />,
  },
  {
    name: 'Decimal stepper',
    description: 'initialValue and stepValue set to 0.99.',
    stepper: <SimpleStepper showText initialValue={0.99} stepValue={0.99} />,
  },
  {
    name: 'Custom image stepper',
    description: 'incrementImage and decrementImage set to remote images.',
    stepper: (
      <SimpleStepper
        incrementImage={reactNativeFavicon}
        decrementImage={reactNativeFavicon}
        valueChanged={(value: number) => {
          console.log('[onValueChanged] value: ', value);
        }}
      />
    ),
  },
  {
    name: 'Action stepper',
    description:
      'onMin, onMax, onIncrement and onDecrement functions are used to log value.',
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
      />
    ),
  },
  {
    name: 'Red color stepper',
    description:
      'textPosition is center by default. useColor and showText are enabled. color set to red.',
    stepper: <SimpleStepper useColor showText color={'red'} />,
  },
  {
    name: 'Green color stepper',
    description:
      'textPosition set to right. useColor and showText are enabled. color set to green.',
    stepper: (
      <SimpleStepper useColor showText textPosition={'right'} color={'green'} />
    ),
  },
  {
    name: 'Blue color stepper',
    description:
      'textPosition set to left. useColor and showText are enabled. color set to blue.',
    stepper: (
      <SimpleStepper useColor showText textPosition={'left'} color={'blue'} />
    ),
  },
];

type StepperExample = {
  item: {
    name: string;
    description: string;
    stepper: React.JSX.Element;
  };
  index: number;
};

export default function App(): React.JSX.Element {

  function _renderItem(example: StepperExample): React.JSX.Element {
    const {name, description, stepper} = example.item;
    return (
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {stepper}
      </View>
    );
  };

  function _renderSeparator(): React.JSX.Element {
    return <View style={styles.separator} />;
  };

  function _renderHeader(): React.JSX.Element {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{'Stepper examples'}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    flex: 1,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
  separator: {
    backgroundColor: 'black',
    height: 1,
  },
  header: {
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
