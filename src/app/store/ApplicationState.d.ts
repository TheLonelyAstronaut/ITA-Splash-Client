import { authenticationReducer } from '../authentication/reducers';
import { themeReducer } from '../ui/reducers';
import { localeReducer } from '../locales/reducers';

export interface ApplicationState {
    //environment: ReturnType<typeof environmentReducer>;
    authentication: ReturnType<typeof authenticationReducer>;
    theming: ReturnType<typeof themeReducer>;
    localeChanging: ReturnType<typeof localeReducer>;
}
