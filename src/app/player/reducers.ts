import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { MUSIC_ACTIONS } from './actions';
import { Track, TrackState } from './player.state';

const initialState: TrackState = {
    currentTrack: {} as Track,
    queue: [],
    triggeredByUser: true,
};

const unpersistedReducer = createReducer<TrackState>(initialState)
    .handleAction(MUSIC_ACTIONS.PLAY.COMPLETED, (state, action) => ({
        ...state,
        currentTrack: action.payload.track,
        queue: action.payload.queue,
    }))
    .handleAction(MUSIC_ACTIONS.SET_CURRENT_TRACK, (state, action) => ({
        ...state,
        currentTrack: action.payload,
    }))
    .handleAction(MUSIC_ACTIONS.ADD_TO_THE_QUEUE.COMPLETED, (state, action) => {
        const newQueue = [...state.queue];

        if (!action.payload.insertBeforeTrack) {
            newQueue.push(action.payload.track);
        } else {
            const insertBeforeIndex = newQueue.findIndex((track) => track.id === action.payload.insertBeforeTrack);
            newQueue.splice(insertBeforeIndex, 0, action.payload.track);
        }

        return {
            ...state,
            queue: newQueue,
        };
    })
    .handleAction(MUSIC_ACTIONS.SET_USER_TRIGGERED_FLAG, (state, action) => ({
        ...state,
        triggeredByUser: action.payload,
    }));

export const trackReducer = persistReducer(
    {
        key: 'track',
        version: 1,
        storage: AsyncStorage,
        blacklist: ['triggeredByUser'],
        debug: true,
    },
    unpersistedReducer
);
