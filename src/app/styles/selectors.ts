import { createSelector, Selector } from 'reselect';
import { DefaultTheme } from 'styled-components/native';

import { ApplicationState } from '../store/ApplicationState';

import { ThemeState } from './theme.state';

export const getRootThemeState: Selector<ApplicationState, ThemeState> = createSelector(
    (state) => state.theming,
    (state) => state
);

export const getTheme: Selector<ApplicationState, DefaultTheme> = createSelector(
    getRootThemeState,
    (state) => state.theme
);
