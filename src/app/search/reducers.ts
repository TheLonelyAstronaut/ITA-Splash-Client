import { createReducer } from 'typesafe-redux-helpers';

import { NOTHING_FOUNDED, SEARCH_ALL } from './actions';
import { SearchState } from './search.types';

const initialState: SearchState = {
    searchText: '',
    results: [],
    isFetching: false,
    error: undefined,
    nothingFounded: false,
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
            nothingFounded: false,
        }),
        (state, action) => ({
            ...state,
            error: (action.payload.message as unknown) as Error,
        })
    )
    .handleAction(NOTHING_FOUNDED, (state) => ({
        ...state,
        nothingFounded: true,
    }));
