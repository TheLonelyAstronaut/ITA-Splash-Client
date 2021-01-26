import { createAction } from 'typesafe-redux-helpers';

import { Track, ControlActions } from './player.state';

export interface Control {
    action: ControlActions;
}

export interface AddToTheQueuePayload {
    track: Track;
    insertBeforeTrack: string | undefined;
}

export interface PlayActionPayload {
    track: Track;
    queue: Track[];
}

export const MUSIC_ACTIONS = {
    PLAY: {
        TRIGGER: createAction('[Music Actions Play Triggered]', (payload: PlayActionPayload) => payload),
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
};
