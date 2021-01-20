import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../store/ApplicationState';

import { LocalesEnum, LocalesState } from './locales.state';

export const getRootLocaleState: Selector<ApplicationState, LocalesState> = createSelector(
    (state) => state.localeChanging,
    (state) => state
);

export const getLocale: Selector<ApplicationState, LocalesEnum | undefined> = createSelector(
    getRootLocaleState,
    (state) => state.locale
);
