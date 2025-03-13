import { LogBox } from 'react-native';
const IGNORED_LOGS = [
  'RUNNING>>>>',
  'EventEmitter.removeListener',
  'Constants.platform.ios.model',
  'Possible Unhandled Promise Rejection (id: 1)',
  'Consider setting a background color',
  'Warning: Failed prop type: Invalid prop',
  "ReferenceError: Property 'error' doesn't exist",
  '[fuego-swr-keys-from-collection-path]',
  'Setting a timer for a long period of time',
  'ViewPropTypes will be removed from React Native',
  'AsyncStorage has been extracted from react-native',
  "exported from 'deprecated-react-native-prop-types'.",
  'Non-serializable values were found in the navigation state.',
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'Invalid prop ',
  "'zustand",
];

LogBox.ignoreLogs(IGNORED_LOGS);
LogBox.ignoreAllLogs(true);

// Workaround for Expo 45
if (__DEV__) {
  const withoutIgnored =
    (logger) =>
    (...args) => {
      const output = args.join(' ');

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}
