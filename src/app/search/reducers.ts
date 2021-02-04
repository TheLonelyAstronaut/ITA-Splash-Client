import { createReducer } from 'typesafe-redux-helpers';

import { SEARCH_ALL } from './actions';
import { SearchState } from './search.types';

const initialState: SearchState = {
    searchText: '',
    results: [],
};

export const searchReducer = createReducer<SearchState>(initialState).handleAction(
    SEARCH_ALL.STARTED,
    (state, action) => ({
        searchText: action.payload.text,
        results: action.payload.result,
    })
);
