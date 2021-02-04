import { createAction } from 'typesafe-redux-helpers';

import { Track } from '../../types/music';

import { ControlActions } from './player.state';

export interface Control {
    action: ControlActions;
    trackID?: string;
    forceSkip?: boolean;
}

export interface AddToTheQueuePayload {
    track: Track;
    insertBeforeTrack: string | undefined;
}

export interface PlayActionPayload {
    track: Track;
    queue: Track[];
}

export interface SeekToPayload {
    position: number;
}

export const MUSIC_ACTIONS = {
    PLAY: {
        TRIGGER: createAction('[Music Actions Play Triggered]'),
        COMPLETED: createAction('[Music Actions Play Completed]', (payload: PlayActionPayload) => payload),
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
