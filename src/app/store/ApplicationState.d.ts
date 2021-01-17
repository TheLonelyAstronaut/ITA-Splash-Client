import { authenticationReducer } from '../authentication/reducers';

export interface ApplicationState {
    //environment: ReturnType<typeof environmentReducer>;
    authentication: ReturnType<typeof authenticationReducer>;
}
