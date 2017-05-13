import SimpleStepper from "react-native-simple-stepper";
import React, { Component, Proptypes } from "react";
import {
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  Alert,
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
      data: []
    };
  }
  componentWillMount() {
    const data = [
      {
        tintColor: "#358CDC",
        value: 0,
        minimumValue: -100,
        maximumValue: 1000,
        initialValue: 0.05,
        stepValue: 1,
        tintOnIncrementImage: true,
        tintOnDecrementImage: true,
        incrementImage: "",
        decrementImage: ""
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
        incrementImage: "",
        decrementImage: ""
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
        incrementImage: "",
        decrementImage: ""
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
        decrementImage: "https://facebook.github.io/react/img/logo_og.png"
      }
    ];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      data: data
    });
  }
  changeInitialValue() {
    var data = this.state.data;
    data[0].initialValue = 1000;
    this.setState({
      dataSource: ds.cloneWithRows(data),
      data: data
    });
  }
  changeStepValue() {
    var data = this.state.data;
    data[0].stepValue = 100;
    this.setState({
      dataSource: ds.cloneWithRows(data),
      data: data
    });
  }
  valueChanged(value, rowID) {
    var data = this.state.data;
    data[rowID].value = value.toFixed(2);
    this.setState({
      dataSource: ds.cloneWithRows(data),
      data: data
    });
  }
  renderRow(rowData, sectionID, rowID) {
    return (
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
              padding: 4,
              position: "absolute",
              right: 8
            }
          ]}
        >
          {rowData.value}
        </Text>
      </View>
    );
  }
  renderFooter() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.changeInitialValue()}>
          <Text
            style={{
              fontSize: 18,
              alignSelf: "center",
              margin: 8,
              padding: 12,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "black"
            }}
          >
            {"Change Initial Value"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeStepValue()}>
          <Text
            style={{
              fontSize: 18,
              alignSelf: "center",
              margin: 8,
              padding: 12,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "black"
            }}
          >
            {"Change Step Value"}
          </Text>
        </TouchableOpacity>
      </View>
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
        renderFooter={() => this.renderFooter()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
