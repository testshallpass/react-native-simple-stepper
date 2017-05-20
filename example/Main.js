import SimpleStepper from "./SimpleStepper";
import React, { Component, Proptypes } from "react";
import {
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      data: [],
      disabled: true
    };
  }
  componentWillMount() {
    const data = [
      {
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
        disabled: false
      },
      {
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
        disabled: false
      },
      {
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
        disabled: false
      },
      {
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
        disabled: false
      }
    ];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      data: data
    });
  }
  changeInitialValue(rowID, rowData) {
    var data = this.state.data;
    data[rowID].initialValue = Math.floor(Math.random() * rowData.maximumValue + 1);
    this.refreshData(data)
  }
  changeStepValue(rowID, rowData) {
    var data = this.state.data;
    data[rowID].stepValue = Math.floor(Math.random() * rowData.maximumValue + 1);
    this.refreshData(data)
  }
  changeMinValue(rowID, rowData) {
    var data = this.state.data;
    const newMinValue =  Math.floor(Math.random() * rowData.maximumValue + 1);
    if (newMinValue < rowData.maximumValue) {
      data[rowID].minimumValue = newMinValue
      this.refreshData(data)
    }
  }
  changeMaxValue(rowID, rowData) {
    var data = this.state.data;
    const newMaxValue = Math.floor(Math.random() * rowData.maximumValue + 1);
    console.log(newMaxValue);
    if (newMaxValue > rowData.minimumValue) {
      data[rowID].maximumValue = newMaxValue
      this.refreshData(data)     
    }
  }
  toggleStepper(rowID, rowData) {
    var data = this.state.data;
    data[rowID].disabled = !data[rowID].disabled
    this.refreshData(data)
  }
  valueChanged(value, rowID) {
    var data = this.state.data;
    data[rowID].value = value.toFixed(2);
    this.refreshData(data)
  }
  refreshData(data) {
    this.setState({
      dataSource: ds.cloneWithRows(data),
      data: data
    });   
  }
  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
      <View style={styles.row}>
        <SimpleStepper
          tintColor={rowData.tintColor}
          valueChanged={value => this.valueChanged(value, rowID)}
          tintOnIncrementImage={rowData.tintOnIncrementImage}
          tintOnDecrementImage={rowData.tintOnDecrementImage}
          incrementImage={rowData.incrementImage}
          decrementImage={rowData.decrementImage}
          minimumValue={rowData.minimumValue}
          maximumValue={rowData.maximumValue}
          initialValue={rowData.initialValue}
          stepValue={rowData.stepValue}
          disabled={rowData.disabled}
        />
        <View style={styles.column}>
          <Text style={styles.text}>{"min: "}{rowData.minimumValue}</Text>
          <Text style={styles.text}>{"max: "}{rowData.maximumValue}</Text>
          <Text style={styles.text}>{"initial: "}{rowData.initialValue}</Text>
          <Text style={styles.text}>{"step: "}{rowData.stepValue}</Text>
        </View>
        <Text
          style={[
            styles.text,
            {
              color: rowData.tintColor,
              fontSize: 30,
              padding: 8,
              position: "absolute",
              right: 0
            }
          ]}
        >
          {rowData.value}
        </Text>
      </View>
        {this.renderActions(rowID, rowData)}
      </View>
    );
  }
  renderActions(rowID, rowData) {
    return (
      <ScrollView style={{flexDirection: 'row'}} horizontal={true}>
        <TouchableOpacity onPress={() => this.changeInitialValue(rowID, rowData)}>
          <Text style={[styles.buttonText, {borderColor: rowData.tintColor}]}>
            {"Randomize initialValue"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeStepValue(rowID, rowData)}>
          <Text style={[styles.buttonText, {borderColor: rowData.tintColor}]}>
            {"Randomize stepValue"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggleStepper(rowID, rowData)}>
          <Text style={[styles.buttonText, {borderColor: rowData.tintColor, alignSelf: 'center'}]}>
            {(rowData.disabled) ? 'Enable' : 'Disable'}
          </Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => this.changeMinValue(rowID, rowData)}>
          <Text style={[styles.buttonText, {borderColor: rowData.tintColor}]}>
            {"Randomize minValue"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeMaxValue(rowID, rowData)}>
          <Text style={[styles.buttonText, {borderColor: rowData.tintColor}]}>
            {"Randomize maxValue"}
          </Text>
        </TouchableOpacity>               
      </ScrollView>
    );
  }
  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        initialListSize={this.state.data.length}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) =>
          this.renderRow(rowData, sectionID, rowID)}
        renderSeparator={(sectionID, rowID) => (
          <View key={`${sectionID}-${rowID}`} style={styles.separator} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    height: 1,
    backgroundColor: "#8B9B9C"
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
