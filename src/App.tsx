import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootRouterComponent } from './app/routing/root-router.component';
import { useStore } from './app/store/useStore';

export const App: React.FC = () => {
    const store = useStore();

    if (!store) {
        return null;
    }

    return (
        <PersistGate persistor={store.persistor}>
            <Provider store={store.store}>
                <RootRouterComponent />
            </Provider>
        </PersistGate>
    );
};

export default App;
