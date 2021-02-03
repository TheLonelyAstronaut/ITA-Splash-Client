import AsyncStorage from '@react-native-community/async-storage';
import { createMigrate, persistReducer } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import { createReducer } from 'typesafe-redux-helpers';

import { LOGIN } from './actions';
import { Authentication } from './authentication';

const initialState: Authentication = {
    error: undefined,
    isFetching: false,
    username: undefined,
    token: undefined,
};

const unpersistedReducer = createReducer<Authentication>(initialState)
    .handleAction(LOGIN.STARTED, (state, action) => ({
        error: undefined,
        isFetching: true,
        token: undefined,
        username: action.payload.username,
    }))
    .handleAction(
        LOGIN.COMPLETED,
        (state, action) => ({
            error: undefined,
            isFetching: false,
            token: action.payload.token,
            username: action.payload.username,
        }),
        (state, action) => ({
            error: action.payload as Error,
            isFetching: false,
            token: undefined,
            username: state.username,
        })
    );

const migrations: MigrationManifest = {
    2: (state: PersistedState) => ({
        // types don't quite work without using `!` here :'(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...state!,
        // token was a string previously instead of an object, clear existing auth
        token: undefined,
        username: undefined,
    }),
};

export const authenticationReducer = persistReducer(
    {
        key: 'authentication',
        version: 1,
        whitelist: ['token', 'username'],
        storage: AsyncStorage,
        debug: true,
        migrate: createMigrate(migrations, { debug: true }),
    },
    unpersistedReducer
);
