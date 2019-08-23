import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

export default class List extends Component {
  render() {
    const { items, renderItem } = this.props;
    return (
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => {
          return <View style={{ backgroundColor: 'black', height: 1 }} />;
        }}
      />
    );
  }
}
