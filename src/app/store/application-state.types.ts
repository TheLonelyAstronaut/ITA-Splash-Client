import { authenticationReducer } from '../authentication/reducers';
import { homeReducer } from '../home/reducers';
import { libraryReducer } from '../library/reducers';
import { musicStackStateReducer } from '../music-stack/reducers';
import { trackReducer } from '../player/reducers';
import { searchReducer } from '../search/reducers';
import { themeReducer } from '../ui/themes/reducers';

export interface ApplicationState {
    //environment: ReturnType<typeof environmentReducer>;
    authentication: ReturnType<typeof authenticationReducer>;
    theming: ReturnType<typeof themeReducer>;
    track: ReturnType<typeof trackReducer>;
    search: ReturnType<typeof searchReducer>;
    library: ReturnType<typeof libraryReducer>;
    homepage: ReturnType<typeof homeReducer>;
    music: ReturnType<typeof musicStackStateReducer>;
}
