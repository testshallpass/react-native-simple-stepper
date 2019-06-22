import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

export default class ImageView extends Component {
  static propTypes = {
    style: PropTypes.object,
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    opacity: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    source: {},
    opacity: 1,
  };

  render() {
    const { style, source, opacity } = this.props;
    return <Image style={[style, { opacity }]} source={source} />;
  }
}
