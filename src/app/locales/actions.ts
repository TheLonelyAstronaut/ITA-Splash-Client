import { createAction } from 'typesafe-redux-helpers';
import { LocalesEnum } from './locales.state';

export interface LocalePayload {
    locale: LocalesEnum;
}

export const CHANGE_LOCALE = createAction('[Change Locale]', (payload: LocalePayload) => payload);
