import SimpleStepper from "react-native-simple-stepper";
import React, { Component, Proptypes } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";

export default class Main extends Component {
  constructor(props) {
    super(props);
    const data = [
      {
        key: 0,
        tintColor: "#358CDC",
        value: 0,
        minimumValue: -1000,
        maximumValue: 1000,
        initialValue: 0.05,
        stepValue: 1,
        tintOnIncrementImage: true,
        tintOnDecrementImage: true,
        incrementImage: undefined,
        decrementImage: undefined,
        disabled: false,
        renderIncrement: data => this.renderIncrement(data),
        renderDecrement: data => this.renderDecrement(data)
      },
      {
        key: 1,
        tintColor: "#32A54A",
        value: 0.99,
        minimumValue: 0,
        maximumValue: 15,
        initialValue: 0.99,
        stepValue: 0.99,
        tintOnIncrementImage: true,
        tintOnDecrementImage: true,
        incrementImage: undefined,
        decrementImage: undefined,
        disabled: false,
        renderIncrement: null,
        renderDecrement: null
      },
      {
        key: 2,
        tintColor: "#cc3232",
        value: 50,
        minimumValue: -100,
        maximumValue: 100,
        initialValue: 50,
        stepValue: 25,
        tintOnIncrementImage: true,
        tintOnDecrementImage: true,
        incrementImage: undefined,
        decrementImage: undefined,
        disabled: false,
        renderIncrement: null,
        renderDecrement: null
      },
      {
        key: 3,
        tintColor: "#4F3D9E",
        value: 0,
        minimumValue: -70,
        maximumValue: 70,
        initialValue: 30,
        stepValue: 10,
        tintOnIncrementImage: false,
        tintOnDecrementImage: false,
        incrementImage: "https://facebook.github.io/react/img/logo_og.png",
        decrementImage: "https://facebook.github.io/react/img/logo_og.png",
        disabled: false,
        renderIncrement: null,
        renderDecrement: null
      }
    ];
    this.state = {
      data: data
    };
  }
  getRandomNumber(min, max) {
    const random = Math.floor(Math.random() * max + min);
    return random;
  }
  updateStepperForValue(value, item) {
    var data = this.state.data.slice();
    data[item.key][value] = this.getRandomNumber(
      item.minimumValue,
      item.maximumValue
    );
    this.refreshData(data);
  }
  changeMinValue(item) {
    var data = this.state.data.slice();
    const newMinValue = this.getRandomNumber(-10000, item.maximumValue);
    if (newMinValue < item.maximumValue) {
      data[item.key].minimumValue = newMinValue;
      this.refreshData(data);
    }
  }
  changeMaxValue(item) {
    var data = this.state.data.slice();
    const newMaxValue = this.getRandomNumber(item.minimumValue, 10000);
    if (newMaxValue > item.minimumValue) {
      data[item.key].maximumValue = newMaxValue;
      this.refreshData(data);
    }
  }
  toggleStepper(item) {
    var data = this.state.data.slice();
    data[item.key].disabled = !data[item.key].disabled;
    this.refreshData(data);
  }
  valueChanged(value, key) {
    var data = this.state.data.slice();
    data[key].value = value.toFixed(2);
    this.refreshData(data);
  }
  refreshData = data => {
    this.setState({
      data: data
    });
  };
  renderIncrement(data) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>{"plus"}</Text>
        <Text>{" one"}</Text>
      </View>
    );
  }
  renderDecrement(data) {
    return <Text>{"minus"}</Text>;
  }
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.separator}>
        <View style={styles.row}>
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
            renderIncrement={item.renderIncrement}
            renderDecrement={item.renderDecrement}
          />
          <View style={styles.column}>
            <Text style={styles.text}>{"min: "}{item.minimumValue}</Text>
            <Text style={styles.text}>{"max: "}{item.maximumValue}</Text>
            <Text style={styles.text}>{"initial: "}{item.initialValue}</Text>
            <Text style={styles.text}>{"step: "}{item.stepValue}</Text>
          </View>
          <Text
            style={[
              styles.text,
              {
                color: item.tintColor,
                fontSize: 30,
                padding: 8,
                position: "absolute",
                right: 0
              }
            ]}
          >
            {item.value}
          </Text>
        </View>
        {this.renderActions(index, item)}
      </View>
    );
  };
  renderActions(key, item) {
    return (
      <ScrollView horizontal={true}>
        <TouchableOpacity
          onPress={() => this.updateStepperForValue("initialValue", item)}
        >
          <Text style={[styles.buttonText, { borderColor: item.tintColor }]}>
            {"Randomize initialValue"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.updateStepperForValue("stepValue", item)}
        >
          <Text style={[styles.buttonText, { borderColor: item.tintColor }]}>
            {"Randomize stepValue"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggleStepper(item)}>
          <Text
            style={[
              styles.buttonText,
              { borderColor: item.tintColor, alignSelf: "center" }
            ]}
          >
            {item.disabled ? "Enable" : "Disable"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeMinValue(item)}>
          <Text style={[styles.buttonText, { borderColor: item.tintColor }]}>
            {"Randomize minValue"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeMaxValue(item)}>
          <Text style={[styles.buttonText, { borderColor: item.tintColor }]}>
            {"Randomize maxValue"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center"
  },
  column: {
    flexDirection: "column",
    paddingLeft: 8
  },
  text: {
    fontSize: 16,
    color: "#222222"
  },
  separator: {
    borderBottomColor: "#8B9B9C",
    borderBottomWidth: 1
  },
  buttonText: {
    fontSize: 12,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black"
  }
});
