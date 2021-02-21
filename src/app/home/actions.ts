import { createAction } from 'typesafe-redux-helpers';

import { HomepageData } from '../../mocks/home-mock';

export const LOAD_HOME_DATA = {
    TRIGGER: createAction('[Load Home Data Trigger]', (payload: number) => payload),
    STARTED: createAction('[Load Home Data Started]', (payload) => payload),
    COMPLETED: createAction('[Load Home Data Completed]', (payload: HomepageData[]) => payload),
};
