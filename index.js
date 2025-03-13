import 'react-native-gesture-handler';

import { Text, TextInput } from 'react-native';
import { registerRootComponent } from 'expo';
import './globalFunctions';

import App from './App';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// import "./app/DismissWarnings";
registerRootComponent(App);
