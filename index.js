/**
 * @format
 */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { name as appName } from './app.json';
import App from './src/app.component';
import { Logger } from './src/app/utils/logger';
import { notifications } from './src/app/utils/notification-service';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

notifications.addBackgroundMessageHandler(async (message) => {
    Logger.log(message);
});

AppRegistry.registerComponent(appName, () => App);
// eslint-disable-next-line no-undef
TrackPlayer.registerPlaybackService(() => require('./src/app/player/background-service'));
