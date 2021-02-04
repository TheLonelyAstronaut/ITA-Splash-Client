import { createReducer } from 'typesafe-redux-helpers';

import { SEARCH } from './actions';
import { SearchState } from './search.state';

const initialState: SearchState = {
    searchText: '',
    results: [],
};

export const searchReducer = createReducer<SearchState>(initialState).handleAction(SEARCH.STARTED, (state, action) => ({
    searchText: action.payload.text,
    results: action.payload.result,
}));
