import { useEffect, useRef, useState } from 'react';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';

import { Logger } from '../utils/logger';

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
                // await SplashScreen.hideAsync();
            } catch (err) {
                Logger.error(new HideSplashScreenError(err));
            }
        })();
    }, []);

    return store.current;
};
