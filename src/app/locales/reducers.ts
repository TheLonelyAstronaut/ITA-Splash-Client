import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { CHANGE_LOCALE } from './actions';
import { LocalesEnum, LocalesState } from './locales.state';

const initialState: LocalesState = {
    locale: LocalesEnum.en,
};

const unpersistedReducer = createReducer<LocalesState>(initialState).handleAction(CHANGE_LOCALE, (state, action) => ({
    locale: action.payload.locale,
}));

export const localeReducer = persistReducer(
    {
        key: 'locale',
        version: 1,
        storage: AsyncStorage,
        whitelist: ['locale'],
        debug: true,
        //migrate: createMigrate(migrations, { debug: true }),
    },
    unpersistedReducer
);
