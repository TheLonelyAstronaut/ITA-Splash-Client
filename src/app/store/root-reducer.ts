import { combineReducers, Reducer } from 'redux';

import { authenticationReducer } from '../authentication/reducers';
import { trackReducer } from '../player/reducers';
import { themeReducer } from '../ui/themes/reducers';

import { ApplicationState } from './application-state';

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
    theming: themeReducer,
    track: trackReducer,
});
