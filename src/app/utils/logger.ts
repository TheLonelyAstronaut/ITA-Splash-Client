// import crashlytics from '@react-native-firebase/crashlytics';

export const Logger = {
    log: (message: unknown): void => {
        console.log(message);
        // crashlytics().log(message as string);
    },

    error: (error: Error): void => {
        console.error(error);
        // crashlytics().recordError(error);
    },
};
