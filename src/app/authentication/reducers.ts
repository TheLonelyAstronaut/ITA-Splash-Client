import AsyncStorage from '@react-native-community/async-storage';
import { createMigrate, persistReducer } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import { createReducer } from 'typesafe-redux-helpers';

import { ADD_PLAYLIST } from '../library/actions';
import { FOLLOW_OR_UNFOLLOW } from '../music-stack/actions';

import { LOGIN, LOGOUT, REGISTER } from './actions';
import { AuthenticationState, User } from './authentication.types';

const initialState: AuthenticationState = {
    error: undefined,
    isFetching: false,
    token: '',
    data: {} as User,
};

const unpersistedReducer = createReducer<AuthenticationState>(initialState)
    .handleAction(LOGIN.STARTED, (state) => ({
        error: undefined,
        isFetching: true,
        token: '',
        data: state.data,
    }))
    .handleAction(
        LOGIN.COMPLETED,
        (state, action) => ({
            error: undefined,
            isFetching: false,
            token: action.payload.token,
            data: action.payload.data,
        }),
        (state, action) => ({
            error: action.payload as Error,
            isFetching: false,
            token: '',
            data: {} as User,
        })
    )
    .handleAction(LOGOUT.COMPLETED, () => ({
        error: undefined,
        isFetching: false,
        token: '',
        data: {} as User,
    }))
    .handleAction(
        REGISTER.COMPLETED,
        (state, action) => ({
            error: undefined,
            isFetching: false,
            token: action.payload.token,
            data: action.payload.data,
        }),
        (state, action) => ({
            error: action.payload as Error,
            isFetching: false,
            token: '',
            data: {} as User,
        })
    )
    .handleAction(ADD_PLAYLIST.COMPLETED, (state, action) => {
        let newPlaylist = [...state.data.playlists];
        if (newPlaylist.findIndex((value) => value.id === action.payload.id) !== -1) {
            newPlaylist = state.data.playlists.map((value) => {
                if (value.id === action.payload.id) {
                    return action.payload;
                } else {
                    return value;
                }
            });
        } else {
            newPlaylist.push(action.payload);
        }
        return {
            error: undefined,
            isFetching: false,
            token: state.token,
            data: {
                ...state.data,
                playlists: newPlaylist,
            },
        };
    })
    .handleAction(FOLLOW_OR_UNFOLLOW.COMPLETED, (state, action) => ({
        ...state,
        data: {
            ...state.data,
            subscriptions: action.payload,
        },
    }));

const migrations: MigrationManifest = {
    2: (state: PersistedState) => ({
        // types don't quite work without using `!` here :'(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...state!,
        // token was a string previously instead of an object, clear existing auth
        token: '',
        username: undefined,
        email: undefined,
    }),
};

export const authenticationReducer = persistReducer(
    {
        key: 'authentication',
        version: 2,
        storage: AsyncStorage,
        debug: true,
        migrate: createMigrate(migrations, { debug: true }),
    },
    unpersistedReducer
);
