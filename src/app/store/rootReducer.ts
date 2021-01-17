import { combineReducers, Reducer } from 'redux';

import { ApplicationState } from './ApplicationState';
import { authenticationReducer } from '../authentication/reducers';

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
});
