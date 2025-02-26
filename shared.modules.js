const Repack = require('@callstack/repack');

module.exports = {
  react: {
    ...Repack.Federated.SHARED_REACT,
    requiredVersion: '18.3.1',
  },
  'react-native': {
    ...Repack.Federated.SHARED_REACT_NATIVE,
    requiredVersion: '0.75.4',
  },
  'react-native-gesture-handler': {
    requiredVersion: '2.22.0',
    singleton: true,
    eager: true,
  },
  'react-native-reanimated': {
    requiredVersion: '3.16.7',
    singleton: true,
    eager: true,
  },
  'react-native-safe-area-context': {
    requiredVersion: '5.1.0',
    singleton: true,
    eager: true,
  },
  'react-native-screens': {
    requiredVersion: '4.5.0',
    singleton: true,
    eager: true,
  },
  '@react-navigation/native': {
    requiredVersion: '7.0.14',
    singleton: true,
    eager: true,
  },
  '@react-navigation/native-stack': {
    requiredVersion: '7.2.0',
    singleton: true,
    eager: true,
  },
  '@gorhom/bottom-sheet': {
    requiredVersion: '4.6.3',
    singleton: true,
    eager: true,
  },
  '@kichiyaki/react-native-barcode-generator': {
    requiredVersion: '0.6.7',
    singleton: true,
    eager: true,
  },
  'lottie-ios': {
    requiredVersion: '4.2.0',
    singleton: true,
    eager: true,
  },
  'lottie-react-native': {
    requiredVersion: '5.1.6',
    singleton: true,
    eager: true,
  },
  'react-native-date-picker': {
    requiredVersion: '4.3.5',
    singleton: true,
    eager: true,
  },
  'react-native-device-info': {
    requiredVersion: '10.12.0',
    singleton: true,
    eager: true,
  },
  'react-native-drop-shadow': {
    requiredVersion: '1.0.0',
    singleton: true,
    eager: true,
  },
  'react-native-fast-image': {
    requiredVersion: '8.6.3',
    singleton: true,
    eager: true,
  },
  'react-native-linear-gradient': {
    requiredVersion: '2.8.3',
    singleton: true,
    eager: true,
  },
  'react-native-modal': {
    requiredVersion: '13.0.1',
    singleton: true,
    eager: true,
  },
  'react-native-otp-verify': {
    requiredVersion: '1.1.8',
    singleton: true,
    eager: true,
  },
  'react-native-pager-view': {
    requiredVersion: '6.2.3',
    singleton: true,
    eager: true,
  },
  'react-native-svg': {
    requiredVersion: '14.1.0',
    singleton: true,
    eager: true,
  },
  'react-native-tab-view': {
    requiredVersion: '3.5.2',
    singleton: true,
    eager: true,
  },
  '@digitaltitransversal/tr_superapp_theme': {
    requiredVersion: '7.9.6',
    singleton: true,
    eager: true,
  },
  '@fluentui/react-context-selector': {
    requiredVersion: '9.1.57',
    singleton: true,
    eager: true,
  },
  '@fintechdigitalventure/spin-mobile-illustrations': {
    requiredVersion: '2.1.1',
    singleton: true,
    eager: true,
  },
};
