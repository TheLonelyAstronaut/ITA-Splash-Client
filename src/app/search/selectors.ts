import { createSelector, Selector } from 'reselect';

import { Track } from '../../types/music';
import { ApplicationState } from '../store/application-state';

import { SearchState } from './search.state';

export const getRootSearchState: Selector<ApplicationState, SearchState> = createSelector(
    (state) => state.search,
    (search) => search
);

export const getSearchText: Selector<ApplicationState, string> = createSelector(
    getRootSearchState,
    (search) => search.searchText
);

export const getSearchResults: Selector<ApplicationState, Track[]> = createSelector(
    getRootSearchState,
    (search) => search.results
);
