import { createReducer } from 'typesafe-redux-helpers';

import { Track } from '../../types/music';

import { ADD_TRACK_GRADIENT, MUSIC_ACTIONS } from './actions';
import { TrackState } from './player.types';

const initialState: TrackState = {
    currentTrack: {} as Track,
    queue: [],
    trackGradient: {},
    artistId: undefined,
};

export const trackReducer = createReducer<TrackState>(initialState)
    .handleAction(MUSIC_ACTIONS.PLAY.COMPLETED, (state, action) => ({
        ...state,
        currentTrack: action.payload.track,
        queue: action.payload.queue,
        artistId: action.payload.artist?.id,
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
    .handleAction(ADD_TRACK_GRADIENT, (state, action) => ({
        ...state,
        trackGradient: { ...state.trackGradient, [action.payload.track]: action.payload.gradient },
    }));
