import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { MUSIC_ACTIONS } from './actions';
import { Track } from './player.state';
import { TrackState } from './player.state';

const initialState: TrackState = {
    currentTrack: {} as Track,
    queue: [],
};

const unpersistedReducer = createReducer<TrackState>(initialState)
    .handleAction(MUSIC_ACTIONS.PLAY.COMPLETED, (state, action) => ({
        currentTrack: action.payload.track,
        queue: action.payload.queue,
    }))
    .handleAction(MUSIC_ACTIONS.SET_CURRENT_TRACK, (state, action) => ({
        ...state,
        currentTrack: action.payload,
    }));

export const trackReducer = persistReducer(
    {
        key: 'track',
        version: 1,
        storage: AsyncStorage,
        debug: true,
    },
    unpersistedReducer
);
