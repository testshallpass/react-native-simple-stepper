export const COLOR = {
  blue: '#358CDC',
  green: '#32A54A',
  red: '#cc3232',
  purple: '#4F3D9E',
};
export const TYPE = {
  action: 'action',
  basic: 'basic',
  style: 'style',
};

export const ITEMS = [
  {
    key: 0,
    type: TYPE.basic,
    value: 1,
    props: {
      minimumValue: 0,
      maximumValue: 10,
      initialValue: 1,
      stepValue: 1,
      disabled: false,
      wraps: true,
    },
  },
  {
    key: 1,
    type: TYPE.basic,
    value: 0.99,
    props: {
      minimumValue: 0,
      maximumValue: 15,
      initialValue: 0.99,
      stepValue: 0.99,
      disabled: false,
      wraps: false,
    },
  },
  {
    key: 2,
    type: TYPE.basic,
    value: 30,
    props: {
      minimumValue: -70,
      maximumValue: 70,
      initialValue: 30,
      stepValue: 10,
      incrementImage: 'https://reactnative.dev/docs/assets/favicon.png',
      decrementImage: 'https://reactnative.dev/docs/assets/favicon.png',
      disabled: false,
      wraps: false,
    },
  },
  {
    key: 3,
    type: TYPE.action,
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
    key: 4,
    type: TYPE.style,
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
        height: 36,
        width: 36,
        tintColor: COLOR.blue,
      },
      decrementImageStyle: {
        height: 36,
        width: 36,
        tintColor: COLOR.blue,
      },
    },
  },
  {
    key: 5,
    type: TYPE.style,
    value: 0,
    props: {
      showText: true,
      textStyle: {
        padding: 8,
        fontSize: 28,
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
        height: 36,
        width: 36,
        tintColor: COLOR.green,
      },
      decrementImageStyle: {
        height: 36,
        width: 36,
        tintColor: COLOR.green,
      },
    },
  },
  {
    key: 6,
    type: TYPE.style,
    value: 0,
    props: {
      showText: true,
      textPosition: 'right',
      textStyle: {
        padding: 8,
        fontSize: 28,
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
        height: 36,
        width: 36,
        tintColor: COLOR.red,
      },
      decrementImageStyle: {
        height: 36,
        width: 36,
        tintColor: COLOR.red,
      },
    },
  },
  {
    key: 7,
    type: TYPE.style,
    value: 0,
    props: {
      showText: true,
      textPosition: 'left',
      textStyle: {
        padding: 8,
        fontSize: 28,
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
        height: 36,
        width: 36,
        tintColor: COLOR.purple,
      },
      decrementImageStyle: {
        height: 36,
        width: 36,
        tintColor: COLOR.purple,
      },
    },
  },
];
