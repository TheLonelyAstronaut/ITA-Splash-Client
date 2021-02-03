import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../store/application-state';

import { TrackState } from './player';
import { Track } from '../../types/music';

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
