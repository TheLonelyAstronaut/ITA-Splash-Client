import { createSelector, Selector } from 'reselect';

import { Track } from '../../types/music';
import { ApplicationState } from '../store/application-state.types';

import { TrackState } from './player.types';

export const getRootTrackState: Selector<ApplicationState, TrackState> = createSelector(
    (state) => state.track,
    (track) => track
);

export const getCurrentQueue: Selector<ApplicationState, Track[]> = createSelector(
    getRootTrackState,
    (trackState) => trackState.queue
);

export const getCurrentTrack: Selector<ApplicationState, Track> = createSelector(
    getRootTrackState,
    (trackState) => trackState.currentTrack
);

export const getTrackGradient = (id: string, resolver: string[]): Selector<ApplicationState, string[]> =>
    createSelector(getRootTrackState, (trackState) =>
        trackState.trackGradient[id] ? trackState.trackGradient[id] : resolver
    );
