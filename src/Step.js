import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import ImageView from './ImageView';

export default class Step extends Component {
  static propTypes = {
    activeOpacity: PropTypes.number,
    style: PropTypes.object,
    onPress: PropTypes.func,
    renderImage: PropTypes.func,
    disabled: PropTypes.bool,
    imageStyle: PropTypes.object,
    imageOpacity: PropTypes.number,
    imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  };

  static defaultProps = {
    activeOpacity: 1,
    style: {
      padding: 8,
    },
    onPress: () => {},
    renderImage: undefined,
    disabled: false,
    imageStyle: {
      height: 36,
      width: 36,
    },
    imageOpacity: 1,
    imageSource: undefined,
  };

  render() {
    const { activeOpacity, style, onPress, disabled, renderImage, imageStyle, imageOpacity, imageSource } = this.props;
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={onPress} disabled={disabled}>
        {renderImage ? renderImage(this.props) : <ImageView style={imageStyle} opacity={imageOpacity} source={imageSource} />}
      </TouchableOpacity>
    );
  }
}
