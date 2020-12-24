export const COLOR = {
  blue: '#358CDC',
  green: '#32A54A',
  red: '#cc3232',
  purple: '#4F3D9E',
};

export const ITEMS = [
  {
    name: 'Default Stepper',
    description: 'Stepper that has default styles and values.',
    value: 0,
    props: {},
  },
  {
    name: 'Wraps Stepper',
    description: 'Stepper with wraps enabled in which it cycles around as dictated by minimum and maximum values.',
    value: 0,
    props: {
      wraps: true,
    },
  },
  {
    name: 'Decimal Stepper',
    description: 'Stepper that has initial and step values set to decimal numbers.',
    value: 0.99,
    props: {
      initialValue: 0.99,
      stepValue: 0.99,
    },
  },
  {
    name: 'Image Stepper',
    description: 'Stepper that has images as step buttons.',
    value: 0,
    props: {
      incrementImage: 'https://reactnative.dev/docs/assets/favicon.png',
      decrementImage: 'https://reactnative.dev/docs/assets/favicon.png',
    },
  },
  {
    name: 'Action Stepper',
    description: 'Stepper invokes functions: onMin, onMax, onIncrement and onDecrement.',
    value: 0,
    props: {
      onMin: (value) => {
        console.log('[onMin] value: ', value);
      },
      onMax: (value) => {
        console.log('[onMax] value: ', value);
      },
      onIncrement: (value) => {
        console.log('[onIncrement] value: ', value);
      },
      onDecrement: (value) => {
        console.log('[onDecrement] value: ', value);
      },
    },
  },
  {
    name: 'Blue Stepper',
    description: 'Stepper that has blue styles.',
    value: 0,
    props: {
      showText: false,
      containerStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: COLOR.blue,
      },
      separatorStyle: {
        width: 0.5,
        backgroundColor: COLOR.blue,
        height: '100%',
      },
      incrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.blue,
      },
      decrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.blue,
      },
    },
  },
  {
    name: 'Text Position: Green stepper',
    description: 'Stepper that uses text position center (default) with green styles.',
    value: 0,
    props: {
      showText: true,
      textStyle: {
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOR.green,
      },
      containerStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: COLOR.green,
      },
      separatorStyle: {
        width: 0.5,
        backgroundColor: COLOR.green,
        height: '100%',
      },
      incrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.green,
      },
      decrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.green,
      },
    },
  },
  {
    name: 'Text Position: Red Stepper',
    description: 'Stepper that uses text position right with red styles.',
    value: 0,
    props: {
      showText: true,
      textPosition: 'right',
      textStyle: {
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOR.red,
      },
      containerStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: COLOR.red,
      },
      separatorStyle: {
        width: 0.5,
        backgroundColor: COLOR.red,
        height: '100%',
      },
      incrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.red,
      },
      decrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.red,
      },
    },
  },
  {
    name: 'Text Position: Purple Stepper',
    description: 'Stepper that uses text position left with purple styles.',
    value: 0,
    props: {
      showText: true,
      textPosition: 'left',
      textStyle: {
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOR.purple,
      },
      containerStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: COLOR.purple,
      },
      separatorStyle: {
        width: 0.5,
        backgroundColor: COLOR.purple,
        height: '100%',
      },
      incrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.purple,
      },
      decrementImageStyle: {
        height: 26,
        width: 26,
        tintColor: COLOR.purple,
      },
    },
  },
];
