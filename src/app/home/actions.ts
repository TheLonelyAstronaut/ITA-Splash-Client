import { createAction } from 'typesafe-redux-helpers';

export interface PassProps {
    currentPass: string;
    newPass: string;
}

export const CHANGE_PASSWORD = {
    TRIGGER: createAction('[Change password Trigger]', (payload: PassProps) => payload),
};
