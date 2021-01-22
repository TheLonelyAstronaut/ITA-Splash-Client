import { createAction } from 'typesafe-redux-helpers';

import { Track } from './player.sate';

export const MUSIC_CONTROL = {
    PLAY: createAction('[Play]', (payload: Track) => payload),
    PAUSE: createAction('[Pause]'),
    NEXT: createAction('[Next]'),
    PREV: createAction('[Prev]'),
};
