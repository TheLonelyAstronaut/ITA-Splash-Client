import AsyncStorage from '@react-native-community/async-storage';
import { createMigrate, persistReducer } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import { createReducer } from 'typesafe-redux-helpers';

import { LOGIN, LOGOUT, REGISTER } from './actions';
import { AuthenticationState } from './authentication.types';

const initialState: AuthenticationState = {
    error: undefined,
    isFetching: false,
    username: undefined,
    token: undefined,
    email: undefined,
};

const unpersistedReducer = createReducer<AuthenticationState>(initialState)
    .handleAction(LOGIN.STARTED, (state, action) => ({
        error: undefined,
        isFetching: true,
        token: undefined,
        email: action.payload.email,
        username: undefined,
    }))
    .handleAction(
        LOGIN.COMPLETED,
        (state, action) => ({
            error: undefined,
            isFetching: false,
            token: action.payload.data.token,
            email: action.payload.data.email,
            username: action.payload.data.username,
        }),
        (state, action) => ({
            error: action.payload as Error,
            isFetching: false,
            token: undefined,
            email: state.email,
            username: state.username,
        })
    )
    .handleAction(LOGOUT.COMPLETED, () => ({
        error: undefined,
        isFetching: false,
        token: undefined,
        email: undefined,
        username: undefined,
    }))
    .handleAction(
        REGISTER.COMPLETED,
        (state, action) => ({
            error: undefined,
            isFetching: false,
            token: action.payload.data.token,
            email: action.payload.data.email,
            username: action.payload.data.username,
        }),
        (state, action) => ({
            error: action.payload as Error,
            isFetching: false,
            token: undefined,
            email: state.email,
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
        email: undefined,
    }),
};

export const authenticationReducer = persistReducer(
    {
        key: 'authentication',
        version: 1,
        whitelist: ['token'],
        storage: AsyncStorage,
        debug: true,
        migrate: createMigrate(migrations, { debug: true }),
    },
    unpersistedReducer
);
