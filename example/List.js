import React, { Component } from 'react';
import { FlatList } from 'react-native';

export default class List extends Component {
  render() {
    const { items, renderItem } = this.props;
    return <FlatList data={items} renderItem={renderItem} keyExtractor={item => `${item.id}`} />;
  }
}
