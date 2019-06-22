import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

export default class Step extends Component {
  static propTypes = {
    activeOpacity: PropTypes.number,
    style: PropTypes.object,
    onPress: PropTypes.func,
    renderImage: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    activeOpacity: 1,
    style: {
      padding: 8,
    },
    onPress: () => {},
    renderImage: () => {
      return null;
    },
    disabled: false,
  };

  render() {
    const { activeOpacity, style, onPress, disabled, renderImage } = this.props;
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={onPress} disabled={disabled}>
        {renderImage()}
      </TouchableOpacity>
    );
  }
}
