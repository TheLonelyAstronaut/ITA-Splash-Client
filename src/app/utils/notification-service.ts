import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

class NotificationService {
    requestPermissions = async (): Promise<boolean> => {
        const authStatus = await messaging().requestPermission();
        return (
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
    };

    addForegroundMessageHandler = (listener: (message: RemoteMessage) => unknown): (() => void) => {
        return messaging().onMessage(listener);
    };

    addBackgroundMessageHandler = (listener: (message: RemoteMessage) => Promise<unknown>): void => {
        messaging().setBackgroundMessageHandler(listener);
    };
}

export const notifications = new NotificationService();
