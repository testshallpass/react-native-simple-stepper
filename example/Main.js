import SimpleStepper from 'react-native-simple-stepper'
import React, { Component, Proptypes } from 'react'
import { StyleSheet, Text, ListView, View } from 'react-native'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: []
    }
  }
  componentWillMount() {
    const data = [
      { tintColor: 'blue', value: .99, minimumValue: 0, maximumValue: 15, initialValue: .99, stepValue: .99, tintOnIncrementImage: true, tintOnDecrementImage: true, incrementImage: '', decrementImage: ''},
      { tintColor: 'peru', value: .99, minimumValue: 0, maximumValue: 15, initialValue: .99, stepValue: .99, tintOnIncrementImage: true, tintOnDecrementImage: true, incrementImage: '', decrementImage: '' },
      { tintColor: '#cc3232', value: 50, minimumValue: -100, maximumValue: 100, initialValue: 50, stepValue: 25, tintOnIncrementImage: true, tintOnDecrementImage: true, incrementImage: '', decrementImage: '' },
      { tintColor: 'purple', value: 0, minimumValue: 0, maximumValue: 35, initialValue: 0, stepValue: 5, tintOnIncrementImage: false, tintOnDecrementImage: false, incrementImage: 'https://facebook.github.io/react/img/logo_og.png', decrementImage: 'https://facebook.github.io/react/img/logo_og.png' },
    ]
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      data: data
    })
  }
  valueChanged(value: number, rowID: number) {
    var data = this.state.data
    data[rowID].value = value.toFixed(2)
    this.setState({
      dataSource: ds.cloneWithRows(data),
      data: data
    })
  }
  renderRow(rowData: object, sectionID: number, rowID: number) {
    return (
      <View style={styles.row}>
        <SimpleStepper
          tintColor={rowData.tintColor}
          valueChanged={(value) => this.valueChanged(value, rowID)}
          tintOnIncrementImage={rowData.tintOnIncrementImage}
          tintOnDecrementImage={rowData.tintOnDecrementImage}
          minimumValue={rowData.minimumValue}
          maximumValue={rowData.maximumValue}
          initialValue={rowData.initialValue}
          stepValue={rowData.stepValue} />
          <View style={styles.column}>
            <Text style={styles.text}>{'min: '}{rowData.minimumValue}</Text>
            <Text style={styles.text}>{'max: '}{rowData.maximumValue}</Text>
            <Text style={styles.text}>{'initial: '}{rowData.initialValue}</Text>
          </View>
          <Text style={[styles.text, {color: rowData.tintColor, fontSize: 30, padding: 4, position: 'absolute', right: 8}]}>{rowData.value}</Text>
      </View>
    )
  }
  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        initialListSize={this.state.data.length}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 22
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    paddingLeft: 8
  },
  text: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray'
  }
});
