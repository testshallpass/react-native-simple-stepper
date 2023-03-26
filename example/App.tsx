import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import SimpleStepper from './src/SimpleStepper';

const reactNativeFavicon = {
  uri: 'https://reactnative.dev/docs/assets/favicon.png',
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
    name: 'Remote stepper',
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
        onMax={(value: any) => {
          console.log('[onMax] value: ', value);
        }}
        onIncrement={(value: any) => {
          console.log('[onIncrement] value: ', value);
        }}
        onDecrement={(value: any) => {
          console.log('[onDecrement] value: ', value);
        }}
      />
    ),
  },
  {
    name: 'Red stepper',
    description:
      'textPosition is center by default. useColor and showText are enabled. color set to red.',
    stepper: <SimpleStepper useColor showText color={'red'} />,
  },
  {
    name: 'Green stepper',
    description:
      'textPosition set to right. useColor and showText are enabled. color set to green.',
    stepper: (
      <SimpleStepper useColor showText textPosition={'right'} color={'green'} />
    ),
  },
  {
    name: 'Blue stepper',
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
    stepper: JSX.Element;
  };
  index: number;
};

function App(): JSX.Element {
  const _renderItem = (example: StepperExample) => {
    const {name, description, stepper} = example.item;
    return (
      <Pressable style={styles.button}>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {stepper}
      </Pressable>
    );
  };

  const _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const _renderHeader = () => {
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
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={_renderSeparator}
        ListHeaderComponent={_renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
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
  },
  description: {
    fontSize: 14,
  },
  separator: {
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
  },
  header: {
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
