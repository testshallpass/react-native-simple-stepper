import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextStyle,
  ViewStyle,
  ImageStyle,
  ColorValue,
  FlatList,
  ImageSourcePropType,
} from 'react-native';

export type SimpleStepperProps = {
  initialValue?: number;
  minimumValue?: number;
  maximumValue?: number;
  stepValue?: number;
  valueChanged?: (value: number) => void;
  decrementImage?: ImageSourcePropType;
  incrementImage?: ImageSourcePropType;
  activeOpacity?: number;
  disabledOpacity?: number;
  disabled?: boolean;
  renderDecrementStep?: (
    value: number,
    onDecrement: () => void,
  ) => React.JSX.Element;
  renderIncrementStep?: (
    value: number,
    onIncrement: () => void,
  ) => React.JSX.Element;
  renderIncrementImage?: (opacity: number) => React.JSX.Element;
  renderDecrementImage?: (opacity: number) => React.JSX.Element;
  wraps?: boolean;
  onMin?: (value: number) => void;
  onMax?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  showText?: boolean;
  renderText?: (value: number) => React.JSX.Element;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  separatorStyle?: ViewStyle;
  incrementStepStyle?: ViewStyle;
  decrementStepStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  incrementImageStyle?: ImageStyle;
  decrementImageStyle?: ImageStyle;
  textPosition?: 'left' | 'center' | 'right';
  disableIncrementImageTintColor?: boolean;
  disableDecrementImageTintColor?: boolean;
  useColor?: boolean;
  color?: ColorValue;
  textDecimalPlaces?: number;
  containerTestID?: string;
  separatorTestID?: string;
  itemTestID?: string;
  incrementImageTestID?: string;
  decrementImageTestID?: string;
  incrementButtonTestID?: string;
  decrementButtonTestID?: string;
  textTestID?: string;
  horizontal?: boolean;
};

interface SimpleStepperListItem {
  item: React.JSX.Element;
  index: number;
}

const SimpleStepper: React.FunctionComponent<SimpleStepperProps> = ({
  initialValue = 0,
  minimumValue = 0,
  maximumValue = 10,
  stepValue = 1,
  valueChanged = () => {},
  decrementImage = require('./assets/decrement.png'),
  incrementImage = require('./assets/increment.png'),
  activeOpacity = 0.4,
  disabledOpacity = 0.5,
  disabled = false,
  renderDecrementStep = undefined,
  renderIncrementStep = undefined,
  renderIncrementImage = undefined,
  renderDecrementImage = undefined,
  wraps = false,
  onMin = () => {},
  onMax = () => {},
  onIncrement = () => {},
  onDecrement = () => {},
  showText = false,
  renderText = undefined,
  textStyle = {
    fontSize: 24,
  },
  containerStyle = {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
  },
  separatorStyle = {
    backgroundColor: 'black',
    width: StyleSheet.hairlineWidth,
  },
  incrementStepStyle = undefined,
  decrementStepStyle = undefined,
  itemStyle = {
    padding: 10,
  },
  incrementImageStyle = {
    height: 30,
    width: 30,
  },
  decrementImageStyle = {
    height: 30,
    width: 30,
  },
  textPosition = 'center',
  disableIncrementImageTintColor = false,
  disableDecrementImageTintColor = false,
  useColor = false,
  color = undefined,
  textDecimalPlaces = 2,
  containerTestID = 'container',
  separatorTestID = 'separator',
  itemTestID = 'item',
  incrementImageTestID = 'incrementImage',
  decrementImageTestID = 'decrementImage',
  incrementButtonTestID = 'incrementButton',
  decrementButtonTestID = 'decrementButton',
  textTestID = 'text',
  horizontal = true,
}) => {
  const [value, setValue] = React.useState<number>(initialValue);

  function _decrementAction(): void {
    const nextValue = value - stepValue;
    const actualValue = _processValue(nextValue);
    onDecrement(actualValue);
    setValue(actualValue);
    valueChanged(actualValue);
  }

  function _incrementAction(): void {
    const nextValue = value + stepValue;
    const actualValue = _processValue(nextValue);
    onIncrement(actualValue);
    setValue(actualValue);
    valueChanged(actualValue);
  }

  function _processValue(actualValue: number): number {
    if (actualValue > maximumValue) {
      return wraps ? minimumValue : maximumValue;
    } else if (actualValue === maximumValue) {
      return maximumValue;
    } else if (actualValue < minimumValue) {
      return wraps ? maximumValue : minimumValue;
    } else if (actualValue === minimumValue) {
      return minimumValue;
    }
    return actualValue;
  }

  function hasReachedMax(): boolean {
    if (stepValue < 0) {
      return value <= minimumValue;
    }
    return value >= maximumValue;
  }

  function hasReachedMin(): boolean {
    if (stepValue < 0) {
      return value >= maximumValue;
    }
    return value <= minimumValue;
  }

  if (hasReachedMin()) {
    onMin(value);
  }
  if (hasReachedMax()) {
    onMax(value);
  }

  function _renderText(): React.JSX.Element {
    if (renderText) {
      return renderText(value);
    }
    let displayValue = value;
    if (!Number.isInteger(value)) {
      displayValue = Number(value.toFixed(textDecimalPlaces));
    }
    return (
      <Text
        testID={textTestID}
        style={[textStyle, { color: useColor ? color : textStyle.color }]}
        disabled={disabled}
      >
        {displayValue}
      </Text>
    );
  }

  function _renderIncrementImage(isDisabled: boolean): React.JSX.Element {
    const opacity = isDisabled ? disabledOpacity : 1;
    if (renderIncrementImage) {
      return renderIncrementImage(opacity);
    }
    const _incrementImageStyle = Object.assign({}, incrementImageStyle);
    _incrementImageStyle.opacity = opacity;
    if (disableIncrementImageTintColor) {
      _incrementImageStyle.tintColor = undefined;
    } else if (useColor) {
      _incrementImageStyle.tintColor = color;
    }
    return (
      <Image
        testID={incrementImageTestID}
        style={_incrementImageStyle}
        source={incrementImage}
      />
    );
  }

  function _renderDecrementImage(isDisabled: boolean): React.JSX.Element {
    const opacity = isDisabled ? disabledOpacity : 1;
    if (renderDecrementImage) {
      return renderDecrementImage(opacity);
    }
    const _decrementImageStyle = Object.assign({}, decrementImageStyle);
    _decrementImageStyle.opacity = opacity;
    if (disableDecrementImageTintColor) {
      _decrementImageStyle.tintColor = undefined;
    } else if (useColor) {
      _decrementImageStyle.tintColor = color;
    }
    return (
      <Image
        testID={decrementImageTestID}
        style={_decrementImageStyle}
        source={decrementImage}
      />
    );
  }

  function _renderIncrement(): React.JSX.Element {
    if (renderIncrementStep) {
      return renderIncrementStep(value, _incrementAction);
    }
    const isDisabled = disabled || (!wraps && hasReachedMax());
    return (
      <TouchableOpacity
        testID={incrementButtonTestID}
        style={incrementStepStyle}
        activeOpacity={activeOpacity}
        onPress={_incrementAction}
        disabled={isDisabled}
      >
        {_renderIncrementImage(isDisabled)}
      </TouchableOpacity>
    );
  }

  function _renderDecrement(): React.JSX.Element {
    if (renderDecrementStep) {
      return renderDecrementStep(value, _decrementAction);
    }
    const isDisabled = disabled || (!wraps && hasReachedMin());
    return (
      <TouchableOpacity
        testID={decrementButtonTestID}
        style={decrementStepStyle}
        activeOpacity={activeOpacity}
        onPress={_decrementAction}
        disabled={isDisabled}
      >
        {_renderDecrementImage(isDisabled)}
      </TouchableOpacity>
    );
  }

  function _renderItem(obj: SimpleStepperListItem): React.JSX.Element {
    return (
      <View testID={`${itemTestID}-${obj.index}`} style={itemStyle}>
        {obj.item}
      </View>
    );
  }

  function _renderSeparator(): React.JSX.Element {
    const _separatorStyle = Object.assign({}, separatorStyle);
    if (useColor && color) {
      _separatorStyle.backgroundColor = color;
    }
    if (!horizontal) {
      _separatorStyle.height = StyleSheet.hairlineWidth;
      _separatorStyle.width = undefined;
    }
    return <View testID={separatorTestID} style={_separatorStyle} />;
  }

  function _getData(): React.JSX.Element[] {
    if (!showText) {
      return [_renderDecrement(), _renderIncrement()];
    }
    switch (textPosition) {
      case 'left':
        return [_renderText(), _renderDecrement(), _renderIncrement()];
      case 'center':
        return [_renderDecrement(), _renderText(), _renderIncrement()];
      case 'right':
        return [_renderDecrement(), _renderIncrement(), _renderText()];
    }
  }

  const data = _getData();
  return (
    <FlatList
      style={[
        containerStyle,
        { borderColor: useColor ? color : containerStyle.borderColor },
      ]}
      testID={containerTestID}
      data={data}
      keyExtractor={(_item, index) => `${index}`}
      initialNumToRender={data.length}
      renderItem={_renderItem}
      ItemSeparatorComponent={_renderSeparator}
      horizontal={horizontal}
      scrollEnabled={false}
    />
  );
};

export default SimpleStepper;
