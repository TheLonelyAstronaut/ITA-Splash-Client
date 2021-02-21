import { createAction } from 'typesafe-redux-helpers';

import { LibraryData } from './library.types';

export type AddPlaylistPayload = {
    name: string;
};

export const LOAD_LIBRARY = {
    TRIGGER: createAction('[Load Library Trigger]', (payload: number) => payload),
    STARTED: createAction('[Load Library Started]', (payload) => payload),
    COMPLETED: createAction('[Load Library Completed]', (payload: LibraryData[]) => payload),
};

export const ADD_PLAYLIST = {
    TRIGGER: createAction('[Add Playlist Trigger]', (payload: AddPlaylistPayload) => payload),
};
