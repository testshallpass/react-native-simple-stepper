import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

export default class ImageView extends Component {
  static propTypes = {
    render: PropTypes.func,
    style: PropTypes.object,
    tintStyle: PropTypes.object,
    opacity: PropTypes.number,
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  };

  static defaultProps = {
    render: undefined,
    style: {},
    tintStyle: {},
    opacity: 1,
    source: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { render, style, tintStyle, opacity, source } = this.props;
    if (render) {
      return render(this.props);
    }
    return <Image resizeMode={'contain'} style={[style, tintStyle, { opacity: opacity }]} source={source} />;
  }
}
