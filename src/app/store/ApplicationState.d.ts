import { authenticationReducer } from '../authentication/reducers';
import { themeReducer } from '../styles/reducers';

export interface ApplicationState {
    //environment: ReturnType<typeof environmentReducer>;
    authentication: ReturnType<typeof authenticationReducer>;
    theming: ReturnType<typeof themeReducer>;
}
