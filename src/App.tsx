import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootRouterComponent } from './app/routing/root-router.component';
import { useStore } from './app/store/use-store';
import { ConnectedThemeProvider } from './app/ui/themes/components/connected-theme-provider.component';

LogBox.ignoreAllLogs(true);

export const App: React.FC = () => {
    const store = useStore();

    if (!store) {
        return null;
    }

    return (
        <PersistGate persistor={store.persistor}>
            <Provider store={store.store}>
                <ConnectedThemeProvider>
                    <RootRouterComponent />
                </ConnectedThemeProvider>
            </Provider>
        </PersistGate>
    );
};

export default App;
