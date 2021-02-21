import { combineReducers, Reducer } from 'redux';

import { authenticationReducer } from '../authentication/reducers';
import { libraryReducer } from '../library/reducers';
import { homeReducer } from '../home/reducers';
import { trackReducer } from '../player/reducers';
import { searchReducer } from '../search/reducers';
import { themeReducer } from '../ui/themes/reducers';

import { ApplicationState } from './application-state.types';

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
    theming: themeReducer,
    track: trackReducer,
    search: searchReducer,
    library: libraryReducer,
    homepage: homeReducer,
});
