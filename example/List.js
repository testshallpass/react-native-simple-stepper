import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

export default class List extends Component {
  render() {
    const { items, renderItem, extraData } = this.props;
    return (
      <FlatList
        data={items}
        renderItem={renderItem}
        extraData={extraData}
        keyExtractor={item => `${item.key}`}
        ItemSeparatorComponent={() => {
          return <View style={{ backgroundColor: 'black', height: 1 }} />;
        }}
      />
    );
  }
}
