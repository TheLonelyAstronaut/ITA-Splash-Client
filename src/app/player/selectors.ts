import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../store/application-state';

import { Track, TrackState } from './player.state';

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

export const getWasTriggeredByUser: Selector<ApplicationState, boolean> = createSelector(
    getRootTrackState,
    (trackState) => trackState.triggeredByUser
);
