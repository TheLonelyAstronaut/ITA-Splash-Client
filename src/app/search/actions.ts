import { createAction } from 'typesafe-redux-helpers';

export const SEARCH = createAction('[Search]', (payload: string) => payload);
