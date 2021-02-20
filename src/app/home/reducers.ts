import { createReducer } from 'typesafe-redux-helpers';

import { HomepageData } from '../../mocks/home-mock';

import { LOAD_HOME_DATA } from './actions';

export interface HomeStateProps {
    isFetching: boolean;
    error?: Error;
    data: HomepageData[];
}

export const initialState: HomeStateProps = {
    isFetching: false,
    error: undefined,
    data: [],
};

export const homeReducer = createReducer<HomeStateProps>(initialState)
    .handleAction(LOAD_HOME_DATA.STARTED, (state) => ({
        ...state,
        isFetching: true,
    }))
    .handleAction(
        LOAD_HOME_DATA.COMPLETED,
        (state, action) => ({
            isFetching: false,
            error: undefined,
            data: action.payload,
        }),
        (state, action) => ({
            ...state,
            error: action.payload as Error,
        })
    );
