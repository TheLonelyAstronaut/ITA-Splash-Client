import { authenticationReducer } from '../authentication/reducers';
import { trackReducer } from '../player/reducers';
import { themeReducer } from '../ui/themes/reducers';

export interface ApplicationState {
    //environment: ReturnType<typeof environmentReducer>;
    authentication: ReturnType<typeof authenticationReducer>;
    theming: ReturnType<typeof themeReducer>;
    track: ReturnType<typeof trackReducer>;
}
