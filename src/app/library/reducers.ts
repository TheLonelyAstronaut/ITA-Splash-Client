import { createReducer } from 'typesafe-redux-helpers';

import { library } from '../../mocks/library';

import { LOAD_LIBRARY } from './actions';
import { LibraryData } from './library.types';

export type LibraryParams = {
    isFetching: boolean;
    error?: Error;
    data: LibraryData[];
};

export const initialState: LibraryParams = {
    isFetching: false,
    error: undefined,
    data: library,
};

export const libraryReducer = createReducer<LibraryParams>(initialState)
    .handleAction(LOAD_LIBRARY.STARTED, () => ({
        isFetching: true,
        error: undefined,
        data: [],
    }))
    .handleAction(
        LOAD_LIBRARY.COMPLETED,
        (state, action) => ({
            isFetching: false,
            error: undefined,
            data: action.payload,
        }),
        () => ({
            isFetching: false,
            error: new Error('error'),
            data: [],
        })
    );
