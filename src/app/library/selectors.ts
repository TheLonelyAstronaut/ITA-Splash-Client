import { createSelector, Selector } from 'reselect';

import { Playlist } from '../../types/music';
import { getRootAuthenticationState } from '../authentication/selectors';
import { ApplicationState } from '../store/application-state.types';

import { LibraryData } from './library.types';
import { LibraryParams } from './reducers';
export const getRootLibraryState: Selector<ApplicationState, LibraryParams> = createSelector(
    (state) => state.library,
    (library) => library
);

export const getLibrary: Selector<ApplicationState, LibraryData[]> = createSelector(
    getRootAuthenticationState,
    (library) => library.data.playlists
);

export const getIsFetchingLibrary: Selector<ApplicationState, boolean> = createSelector(
    getRootLibraryState,
    (library) => library.isFetching
);

export const getErrorLibrary: Selector<ApplicationState, Error | undefined> = createSelector(
    getRootLibraryState,
    (library) => library.error
);

export const getPlaylist = (id: number): Selector<ApplicationState, Playlist | undefined> =>
    createSelector(getLibrary, (library) => library.find((item) => item.id === id));

export const getLikedPlaylist: Selector<ApplicationState, Playlist> = createSelector(
    getLibrary,
    (library) => library[0]
);

export const getIsSubscribed = (id: number): Selector<ApplicationState, boolean> =>
    createSelector(getRootAuthenticationState, (state) => state.data.subscriptions.indexOf(id) !== -1);
