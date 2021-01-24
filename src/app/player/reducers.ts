import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { MUSIC_ACTIONS } from './actions';
import { Track } from './player.state';
import { TrackState } from './track.state';

const initialState: TrackState = {
    track: {} as Track,
};

const unpersistedReducer = createReducer<TrackState>(initialState).handleAction(
    MUSIC_ACTIONS.PLAY.TRIGGER,
    (state, action) => ({
        track: action.payload,
    })
);

export const trackReducer = persistReducer(
    {
        key: 'track',
        version: 1,
        storage: AsyncStorage,
        whitelist: ['track'],
        debug: true,
    },
    unpersistedReducer
);
