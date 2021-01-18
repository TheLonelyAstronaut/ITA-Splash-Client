import { DefaultTheme } from 'styled-components/native';
import { createAction } from 'typesafe-redux-helpers';

export interface ThemePayload {
    theme: DefaultTheme;
}

export const CHANGE_THEME = createAction('Change Theme', (payload: ThemePayload) => payload);
