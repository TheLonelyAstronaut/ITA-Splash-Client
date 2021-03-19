import { createReducer } from 'typesafe-redux-helpers';

import { Album, Artist } from '../../types/music';
import ExtendedMap from '../utils/extended-map';

import { LOAD_ALBUM, LOAD_ARTIST } from './actions';
import { ExtendedError } from './sagas';

export interface MusicStackState {
    isFetching: ExtendedMap<string, boolean>;
    error: ExtendedMap<string, ExtendedError | undefined>;
    data: {
        artists: ExtendedMap<number, Artist>;
        albums: ExtendedMap<number, Album>;
    };
}

export const initialState: MusicStackState = {
    isFetching: new ExtendedMap<string, boolean>(),
    error: new ExtendedMap<string, ExtendedError | undefined>(),
    data: {
        albums: new ExtendedMap<number, Album>(),
        artists: new ExtendedMap<number, Artist>(),
    },
};

export const musicStackStateReducer = createReducer<MusicStackState>(initialState)
    .handleAction(LOAD_ARTIST.STARTED, (state, action) => ({
        ...state,
        isFetching: state.isFetching.insert(action.payload.key, true).copy(),
        error: state.error.insert(action.payload.key, undefined).copy(),
    }))
    .handleAction(
        LOAD_ARTIST.COMPLETED,
        (state, action) => ({
            isFetching: state.isFetching.insert(action.payload.key, false).copy(),
            error: state.error.insert(action.payload.key, undefined).copy(),
            data: {
                artists: state.data.artists.insert(action.payload.artist.id, action.payload.artist).copy(),
                albums: state.data.albums,
            },
        }),
        (state, action) => ({
            ...state,
            isFetching: state.isFetching.insert((action.payload as ExtendedError).key, false).copy(),
            error: state.error.insert((action.payload as ExtendedError).key, undefined).copy(),
        })
    )
    .handleAction(
        LOAD_ALBUM.COMPLETED,
        (state, action) => ({
            isFetching: state.isFetching.insert(action.payload.key, false).copy(),
            error: state.error.insert(action.payload.key, undefined).copy(),
            data: {
                albums: state.data.albums.insert(action.payload.album.id, action.payload.album).copy(),
                artists: state.data.artists,
            },
        }),
        (state, action) => ({
            ...state,
            isFetching: state.isFetching.insert((action.payload as ExtendedError).key, false).copy(),
            error: state.error.insert((action.payload as ExtendedError).key, undefined).copy(),
        })
    );
