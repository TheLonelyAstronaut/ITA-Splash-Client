import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { MUSIC_ACTIONS } from './actions';
import { TrackState } from './track.state';

const initialState: TrackState = {
    track: {
        id: '',
        url: '',
        artist: '',
        artwork: '',
        title: '',
    },
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
