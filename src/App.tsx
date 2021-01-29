import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootRouterComponent } from './app/routing/root-router.component';
import { useStore } from './app/store/use-store';
import { ConnectedThemeProvider } from './app/ui/themes/components/connected-theme-provider.component';
import FlashMessage from 'react-native-flash-message';

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
            <FlashMessage position="bottom" />
        </PersistGate>
    );
};

export default App;
