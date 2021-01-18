import { AnyAction, applyMiddleware, createStore as createReduxStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Persistor, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { Logger } from '../utils/logger';

import { ApplicationState } from './ApplicationState';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEV_TOOL_ACTION_CREATORS: { [name: string]: (...args: any[]) => AnyAction } = {
    //[SET_TERRITORY_AND_CURRENCY.actionType]: (territory: string, currency: string, autoSelected: boolean) =>
    //    SET_TERRITORY_AND_CURRENCY({ territory, currency, showModal: autoSelected })
};

export const createStore = async (): Promise<{ store: Store<ApplicationState>; persistor: Persistor }> => {
    const sagaMiddleware = createSagaMiddleware({
        onError(err) {
            Logger.error(err);
        },
    });

    const store: Store<ApplicationState> = createReduxStore(
        rootReducer,
        composeWithDevTools({ actionCreators: DEV_TOOL_ACTION_CREATORS })(applyMiddleware(sagaMiddleware))
    );

    const persistor: Persistor = await new Promise((resolve) => {
        const p = persistStore(store, null, () => resolve(p));
    });

    await sagaMiddleware.run(rootSaga).toPromise();

    return { store, persistor };
};
