export const COLOR = {
  blue: '#358CDC',
  green: '#32A54A',
  red: '#cc3232',
  purple: '#4F3D9E',
};

export const STEPPERS = [
  {
    name: 'Default',
    description: 'Default styles and values',
    value: 0,
    props: {
      showText: false,
    },
  },
  {
    name: 'Wraps enabled',
    description: 'Cycles around as dictated by minimum and maximum values',
    value: 0,
    props: {
      wraps: true,
    },
  },
  {
    name: 'Decimal values',
    description: 'initial and step values are decimal numbers',
    value: 0.99,
    props: {
      initialValue: 0.99,
      stepValue: 0.99,
    },
  },
  {
    name: 'Image Steps',
    description: 'Step buttons are remote images',
    value: 0,
    props: {
      incrementImage: 'https://reactnative.dev/docs/assets/favicon.png',
      decrementImage: 'https://reactnative.dev/docs/assets/favicon.png',
      incrementImageStyle: {
        height: 30,
        width: 30,
      },
      decrementImageStyle: {
        height: 30,
        width: 30,
      },
    },
  },
  {
    name: 'Actions',
    description: 'Functions: onMin, onMax, onIncrement and onDecrement',
    value: 0,
    props: {
      onMin: value => {
        console.log('[onMin] value: ', value);
      },
      onMax: value => {
        console.log('[onMax] value: ', value);
      },
      onIncrement: value => {
        console.log('[onIncrement] value: ', value);
      },
      onDecrement: value => {
        console.log('[onDecrement] value: ', value);
      },
    },
  },
  {
    name: 'Blue styles',
    description: 'Custom styles using a blue color',
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
    name: 'Text Position: center (default)',
    description: 'showText enabled with green custom styles',
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
    name: 'Text Position: right',
    description: 'showText enabled with red custom styles',
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
    name: 'Text Position: left',
    description: 'showText enabled with purple custom styles',
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
