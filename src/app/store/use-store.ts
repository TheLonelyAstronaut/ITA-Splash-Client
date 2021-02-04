import { useEffect, useRef, useState } from 'react';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { ApplicationState } from './application-state.types';
import { createStore } from './store';

export class HideSplashScreenError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public error: any) {
        super(`Error hiding SplashScreen: \n${error.stack || error}`);
    }
}

export const useStore = (): { store: Store; persistor: Persistor } | undefined => {
    const [, setIsReady] = useState(false);
    const store = useRef<{ store: Store; persistor: Persistor }>();

    useEffect(() => {
        (async () => {
            store.current = await createStore();
            setIsReady(true);

            try {
                const token = (store.current?.store.getState() as ApplicationState).authentication.token;
                client.setAuthToken(token ? token : '');
            } catch (err) {
                Logger.error(new HideSplashScreenError(err));
            }
        })();
    }, []);

    return store.current;
};
