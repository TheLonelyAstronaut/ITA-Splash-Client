import { createAction } from 'typesafe-redux-helpers';

import { Artist, Track } from '../../types/music';

import { ControlActions } from './player.types';

export interface Control {
    action: ControlActions;
    trackID?: string;
    forceSkip?: boolean;
}

export interface AddToTheQueuePayload {
    track: Track;
    insertBeforeTrack: string | undefined;
}

export interface PlayActionTriggerPayload {
    track: Track;
    queue: Track[];
    currentQueue?: Track[];
}

export interface SetCurrentTrackPayload {
    track: Track[];
    skipPlaying?: boolean;
}

export interface PlayActionCompletedPayload extends PlayActionTriggerPayload {
    artist: Artist | undefined;
}

export interface SeekToPayload {
    position: number;
}

export interface AddGradientPayload {
    gradient: string[];
    track: string;
}

export const MUSIC_ACTIONS = {
    PLAY: {
        TRIGGER: createAction('[Music Actions Play Triggered]', (payload: PlayActionTriggerPayload) => payload),
        COMPLETED: createAction('[Music Actions Play Completed]', (payload: PlayActionCompletedPayload) => payload),
    },
    ADD_TO_THE_QUEUE: {
        TRIGGER: createAction('[Add To The Queue Triggered]', (payload: Track) => payload),
        COMPLETED: createAction('[Add To The Queue Completed]', (payload: AddToTheQueuePayload) => payload),
    },
    CONTROL: {
        TRIGGER: createAction('[Music Actions Control Triggered]', (payload: Control) => payload),
        STARTED: createAction('[Music Actions Control Started]', (payload: Control) => payload),
        COMPLETED: createAction('[Music Actions Control Completed]', (payload: Track) => payload), //Sending current track to reducer, we can take this info from TrackPlayer
    },
    SET_CURRENT_TRACK: createAction('[Music Actions Set Current Track]', (payload: Track) => payload),
    SET_USER_TRIGGERED_FLAG: createAction('[Music Actions Set User Triggered Flag]', (payload: boolean) => payload),
    SEEK_TO_POSITION: createAction('[Seek to position]', (payload: SeekToPayload) => payload),
};

export const ADD_TRACK_GRADIENT = createAction('[Add Track Gradient]', (payload: AddGradientPayload) => payload);
