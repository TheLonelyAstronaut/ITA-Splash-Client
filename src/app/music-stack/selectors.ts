import { createSelector, Selector } from 'reselect';

import { Artist, Album } from '../../types/music';
import { ApplicationState } from '../store/application-state.types';

import { MusicStackState } from './reducers';
import { ExtendedError } from './sagas';

export const getRootMusicStackState: Selector<ApplicationState, MusicStackState> = createSelector(
    (state) => state.music,
    (music) => music
);

export const getIsMusicScreenFetching = (key: string): Selector<ApplicationState, boolean> =>
    createSelector(getRootMusicStackState, (state) => !!state.isFetching.get(key));

export const getMusicScreenError = (key: string): Selector<ApplicationState, ExtendedError | undefined> =>
    createSelector(getRootMusicStackState, (state) => state.error.get(key));

export const getArtist = (id: number): Selector<ApplicationState, Artist | undefined> =>
    createSelector(getRootMusicStackState, (state) => state.data.artists.get(id));

export const getAlbum = (id: number): Selector<ApplicationState, Album | undefined> =>
    createSelector(getRootMusicStackState, (state) => state.data.albums.get(id));
