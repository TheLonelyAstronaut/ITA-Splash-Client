import { combineReducers, Reducer } from 'redux';

import { authenticationReducer } from '../authentication/reducers';
import { themeReducer } from '../styles/reducers';

import { ApplicationState } from './ApplicationState';

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
    theming: themeReducer,
});
