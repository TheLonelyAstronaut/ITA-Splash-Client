import { createSelector, Selector } from 'reselect';

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

export const getIsFetching: Selector<ApplicationState, boolean> = createSelector(
    getRootLibraryState,
    (library) => library.isFetching
);
