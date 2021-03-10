import analytics from '@react-native-firebase/analytics';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootRouterComponent } from './app/routing/components/root-router.component';
import { useStore } from './app/store/use-store';
import { SplashScreen } from './app/ui/splash-screen.component';
import { ConnectedThemeProvider } from './app/ui/themes/components/connected-theme-provider.component';

LogBox.ignoreAllLogs(true);

export const App: React.FC = () => {
    const store = useStore();

    useEffect(() => {
        analytics().logEvent('app_started');
    }, []);

    if (!store) {
        return null;
    }

    return (
        <PersistGate persistor={store.persistor}>
            <Provider store={store.store}>
                <ConnectedThemeProvider>
                    <RootRouterComponent />
                    <SplashScreen />
                </ConnectedThemeProvider>
            </Provider>
            <FlashMessage position={'top'} />
        </PersistGate>
    );
};

export default App;
