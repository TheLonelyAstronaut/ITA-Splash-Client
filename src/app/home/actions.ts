import { createAction } from 'typesafe-redux-helpers';
import { HomepageData } from '../../mocks/home-mock';

export interface PassProps {
    currentPass: string;
    newPass: string;
    repeatNewPass: string;
}

export const CHANGE_PASSWORD = {
    TRIGGER: createAction('[Change password Trigger]', (payload: PassProps) => payload),
};

export const LOAD_HOME_DATA = {
    TRIGGER: createAction('[Load Home Data Trigger]', (payload: number) => payload),
    STARTED: createAction('[Load Home Data Started]', (payload) => payload),
    COMPLETED: createAction('[Load Home Data Completed]', (payload: HomepageData[]) => payload),
};
