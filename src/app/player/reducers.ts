import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { MUSIC_ACTIONS } from './actions';
import { Track, TrackState } from './player.state';

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
    }))
    .handleAction(MUSIC_ACTIONS.ADD_TO_THE_QUEUE.COMPLETED, (state, action) => {
        const newQueue = [...state.queue];

        newQueue.forEach((item, index) => {
            if (item.id === state.currentTrack.id) {
                newQueue.splice(index, 0, action.payload);
            }
        });

        return {
            ...state,
            queue: newQueue,
        };
    });

export const trackReducer = persistReducer(
    {
        key: 'track',
        version: 1,
        storage: AsyncStorage,
        debug: true,
    },
    unpersistedReducer
);
