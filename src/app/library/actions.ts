import { createAction } from 'typesafe-redux-helpers';

import { LibraryData } from './library.types';

export type AddPlaylistPayload = {
    name: string;
};

export type AddToLikedPayload = {
    id: number;
};

export const LOAD_LIBRARY = {
    TRIGGER: createAction('[Load Library Trigger]'),
    STARTED: createAction('[Load Library Started]', (payload) => payload),
    COMPLETED: createAction('[Load Library Completed]', (payload: LibraryData[]) => payload),
};

export const ADD_PLAYLIST = {
    TRIGGER: createAction('[Add Playlist Trigger]', (payload: AddPlaylistPayload) => payload),
};

export const ADD_TO_LIKED = {
    TRIGGER: createAction('[Add To Liked]', (payload: AddToLikedPayload) => payload),
};
