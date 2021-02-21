import { createReducer } from 'typesafe-redux-helpers';

import { SEARCH_ALL } from './actions';
import { SearchState } from './search.types';

const initialState: SearchState = {
    searchText: '',
    results: [],
    isFetching: false,
    error: undefined,
};

export const searchReducer = createReducer<SearchState>(initialState)
    .handleAction(SEARCH_ALL.TRIGGER, (state, action) => ({
        ...state,
        searchText: action.payload,
        isFetching: true,
    }))
    .handleAction(SEARCH_ALL.STARTED, (state) => ({
        ...state,
        isFetching: true,
    }))
    .handleAction(
        SEARCH_ALL.COMPLETED,
        (state, action) => ({
            searchText: action.payload.text,
            results: action.payload.result,
            isFetching: false,
            error: undefined,
        }),
        (state, action) => ({
            ...state,
            error: (action.payload.message as unknown) as Error,
        })
    );
