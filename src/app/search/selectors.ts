import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../store/application-state.types';

import { SearchResult, SearchState } from './search.types';

export const getRootSearchState: Selector<ApplicationState, SearchState> = createSelector(
    (state) => state.search,
    (search) => search
);

export const getSearchText: Selector<ApplicationState, string> = createSelector(
    getRootSearchState,
    (search) => search.searchText
);

export const getSearchResults: Selector<ApplicationState, SearchResult[]> = createSelector(
    getRootSearchState,
    (search) => search.results
);
