/**
 * @format
 */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { name as appName } from './app.json';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
// eslint-disable-next-line no-undef
TrackPlayer.registerPlaybackService(() => require('./src/app/player/background-service'));
