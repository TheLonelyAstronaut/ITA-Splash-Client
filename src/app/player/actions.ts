import { createAction } from 'typesafe-redux-helpers';

import { Track } from './player.state';

export const MUSIC_CONTROL = {
    PLAY: createAction('[Play]', (payload: Track) => payload),
    PAUSE: createAction('[Pause]'),
    NEXT: createAction('[Next]'),
    PREV: createAction('[Prev]'),
};