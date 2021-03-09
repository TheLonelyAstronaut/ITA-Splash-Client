let splashScreenControlCallback: (() => void) | null = null;

export const closeSplashScreen = (): void => {
    if (splashScreenControlCallback) {
        splashScreenControlCallback();
    }
};

export const setSplashScreenControlCallback = (splashScreenCallback: () => void): void => {
    splashScreenControlCallback = splashScreenCallback;
};
