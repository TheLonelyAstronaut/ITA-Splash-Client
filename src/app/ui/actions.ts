import { DefaultTheme } from 'styled-components/native';
import { createAction } from 'typesafe-redux-helpers';
import { ThemesEnum } from './theme.state';

export interface ThemePayload {
    theme: ThemesEnum;
}

export const CHANGE_THEME = createAction('[Change Theme]', (payload: ThemePayload) => payload);
