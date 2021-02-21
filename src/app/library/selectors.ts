import { createSelector, Selector } from 'reselect';

import { Playlist } from '../../types/music';
import { ApplicationState } from '../store/application-state.types';

import { LibraryData } from './library.types';
import { LibraryParams } from './reducers';

export const getRootLibraryState: Selector<ApplicationState, LibraryParams> = createSelector(
    (state) => state.library,
    (library) => library
);

export const getLibrary: Selector<ApplicationState, LibraryData[]> = createSelector(
    getRootLibraryState,
    (library) => library.data
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
    createSelector(getRootLibraryState, (library) => library.data.find((item) => item.data.id === id)?.data);
