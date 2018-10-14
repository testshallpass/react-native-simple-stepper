import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

export default class Step extends Component {
  static propTypes = {
    activeOpacity: PropTypes.number,
    style: PropTypes.number,
    onPress: PropTypes.func,
    tintColor: PropTypes.string,
    padding: PropTypes.number,
    renderImage: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    activeOpacity: 1,
    style: 0,
    onPress: undefined,
    tintColor: 'blue',
    padding: 0,
    renderImage: undefined,
    disabled: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { activeOpacity, style, tintColor, padding, onPress, disabled, renderImage } = this.props;
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={[style, { borderColor: tintColor, padding: padding }]} onPress={onPress} disabled={disabled}>
        {renderImage()}
      </TouchableOpacity>
    );
  }
}
