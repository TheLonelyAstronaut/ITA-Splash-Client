import { combineReducers, Reducer } from 'redux';

import { authenticationReducer } from '../authentication/reducers';
import { themeReducer } from '../ui/reducers';

import { ApplicationState } from './ApplicationState';
import { localeReducer } from '../locales/reducers';

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
    theming: themeReducer,
    localeChanging: localeReducer,
});
