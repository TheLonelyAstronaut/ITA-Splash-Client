import { createAction } from 'typesafe-redux-helpers';

import { Track } from '../../types/music';

export interface SearchPayload {
    text: string;
    result: Track[];
}

export const SEARCH = {
    TRIGGER: createAction('[Search Trigger]', (payload: string) => payload),
    STARTED: createAction('[Search Started]', (payload: SearchPayload) => payload),
};
