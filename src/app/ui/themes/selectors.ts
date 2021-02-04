import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/application-state.types';

import { ThemesEnum, ThemeState } from './theme.types';

export const getRootThemeState: Selector<ApplicationState, ThemeState> = createSelector(
    (state) => state.theming,
    (state) => state
);

export const getTheme: Selector<ApplicationState, ThemesEnum> = createSelector(
    getRootThemeState,
    (state) => state.theme
);
