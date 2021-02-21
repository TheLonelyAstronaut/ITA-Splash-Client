import { createSelector, Selector } from 'reselect';

import { HomepageData } from '../../mocks/home-mock';
import { ApplicationState } from '../store/application-state.types';

import { HomeStateProps } from './reducers';

export const getRootHomepageState: Selector<ApplicationState, HomeStateProps> = createSelector(
    (state) => state.homepage,
    (homepage) => homepage
);

export const getHomepageData: Selector<ApplicationState, HomepageData[]> = createSelector(
    getRootHomepageState,
    (state) => state.data
);

export const getIsFetching: Selector<ApplicationState, boolean> = createSelector(
    getRootHomepageState,
    (state) => state.isFetching
);

export const getError: Selector<ApplicationState, Error | undefined> = createSelector(
    getRootHomepageState,
    (state) => state.error
);
