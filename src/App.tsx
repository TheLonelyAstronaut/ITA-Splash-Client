import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootRouterComponent } from './app/routing/root-router.component';
import { useStore } from './app/store/use-store';
import { ConnectedThemeProvider } from './app/ui/connected-theme-provider.component';
import RNTrackPlayer, { Event } from 'react-native-track-player';

export const App: React.FC = () => {
    const store = useStore();

    React.useEffect(() => {
        if (store) {
            // Add listener to change store
            RNTrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {
                // store.store.dispatch()
            });
        }
    }, [store]);

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
