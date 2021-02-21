import { createAction } from 'typesafe-redux-helpers';

import { LibraryData } from './library.types';

export const LOAD_LIBRARY = {
    TRIGGER: createAction('[Load Library Trigger]', (payload: number) => payload),
    STARTED: createAction('[Load Library Started]', (payload) => payload),
    COMPLETED: createAction('[Load Library Completed]', (payload: LibraryData[]) => payload),
};

export const ADD_PLAYLIST = {
    TRIGGER: createAction('[Add Playlist Trigger]', (payload: LibraryData) => payload),
};
