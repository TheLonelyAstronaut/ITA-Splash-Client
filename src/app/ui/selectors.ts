import { createSelector, Selector } from 'reselect';
import { DefaultTheme } from 'styled-components/native';

import { ApplicationState } from '../store/ApplicationState';

import { ThemesEnum, ThemeState } from './theme.state';

export const getRootThemeState: Selector<ApplicationState, ThemeState> = createSelector(
    (state) => state.theming,
    (state) => state
);

export const getTheme: Selector<ApplicationState, ThemesEnum> = createSelector(
    getRootThemeState,
    (state) => state.theme
);
