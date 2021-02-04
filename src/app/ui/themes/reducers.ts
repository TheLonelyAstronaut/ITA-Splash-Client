import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import { createReducer } from 'typesafe-redux-helpers';

import { CHANGE_THEME } from './actions';
import { ThemesEnum, ThemeState } from './theme.types';

const initialState: ThemeState = {
    theme: ThemesEnum.DARK,
};

const unpersistedReducer = createReducer<ThemeState>(initialState).handleAction(CHANGE_THEME, (state, action) => ({
    theme: action.payload.theme,
}));

export const themeReducer = persistReducer(
    {
        key: 'theme',
        version: 1,
        storage: AsyncStorage,
        whitelist: ['theme'],
        debug: true,
        //migrate: createMigrate(migrations, { debug: true }),
    },
    unpersistedReducer
);
