import { createAction } from 'typesafe-redux-helpers';

import { ThemesEnum } from './theme.types';

export interface ThemePayload {
    theme: ThemesEnum;
}

export const CHANGE_THEME = createAction('[Change Theme]', (payload: ThemePayload) => payload);
