import { createAction } from 'typesafe-redux-helpers';

import { SearchResult } from './search.types';

export interface SearchPayload {
    text: string;
    result: SearchResult[];
}

export const SEARCH_ALL = {
    TRIGGER: createAction('[Search Trigger]', (payload: string) => payload),
    STARTED: createAction('[Search Started]', (payload) => payload),
    COMPLETED: createAction('[Search Completed]', (payload: SearchPayload) => payload),
};

export const NOTHING_FOUNDED = createAction('[Nothing Founded]', (payload) => payload);
