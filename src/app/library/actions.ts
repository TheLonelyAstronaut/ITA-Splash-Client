import { createAction } from 'typesafe-redux-helpers';

import { LibraryData } from './library.types';
import { Album, Playlist } from '../../types/music';

export type AddPlaylistPayload = {
    name: string;
};

export type AddToLikedPayload = {
    data: Album | Playlist;
};

export const LOAD_LIBRARY = {
    TRIGGER: createAction('[Load Library Trigger]', (payload: number) => payload),
    STARTED: createAction('[Load Library Started]', (payload) => payload),
    COMPLETED: createAction('[Load Library Completed]', (payload: LibraryData[]) => payload),
};

export const ADD_PLAYLIST = {
    TRIGGER: createAction('[Add Playlist Trigger]', (payload: AddPlaylistPayload) => payload),
};

export const ADD_TO_LIKED = {
    TRIGGER: createAction('[Add To Liked]', (payload: AddToLikedPayload) => payload),
};

export const REMOVE_FROM_LIKED = {
    TRIGGER: createAction('[Remove From Liked]', (payload: AddToLikedPayload) => payload),
};
