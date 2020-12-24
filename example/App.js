import 'react-native-gesture-handler';
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
import {ITEMS} from './constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const HomeScreen = ({navigation}) => {
  const detailScreen = 'Detail';

  const _renderItem = ({item, index}) => {
    const {name} = item;
    const passParam = {itemId: index, otherParam: item};
    return (
      <Pressable
        style={styles.stepper}
        onPress={() => navigation.navigate(detailScreen, passParam)}>
        <Text style={styles.value}>{name}</Text>
      </Pressable>
    );
  };

  const _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ITEMS}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={_renderSeparator}
      />
    </SafeAreaView>
  );
};

const DetailScreen = ({route}) => {
  const [selected, setSelected] = useState(0);

  const _onValueChanged = (newValue = 0, index = 0) => {
    const item = ITEMS[index];
    const {props} = item;
    const {showText} = props;
    if (!showText) {
      if (`${newValue}`.length > 4) {
        newValue = newValue.toFixed(2);
      }
      setSelected(newValue);
    }
  };

  const {itemId, otherParam} = route.params;
  const {props, description} = otherParam;
  const {showText} = props;
  return (
    <View style={styles.content}>
      {!showText && <Text style={styles.selected}>{selected}</Text>}
      <SimpleStepper
        {...props}
        valueChanged={(newValue) => _onValueChanged(newValue, itemId)}
      />
      <Text style={styles.value}>{description}</Text>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Steppers'}>
        <Stack.Screen name={'Steppers'} component={HomeScreen} />
        <Stack.Screen name={'Detail'} component={DetailScreen} options={({ route }) => ({ title: route.params.otherParam.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 4,
  },
  stepper: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#202020',
    padding: 8,
  },
  selected: {
    fontSize: 50,
    color: '#202020',
    padding: 8,
  },
  separator: {
    backgroundColor: '#202020',
    height: StyleSheet.hairlineWidth,
  },
});

export default App;
