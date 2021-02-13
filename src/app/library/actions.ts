import { createAction } from 'typesafe-redux-helpers';

import { LibraryData } from './library.types';

export const LOAD_LIBRARY = {
    TRIGGER: createAction('[Load Libary Trigger]', (payload: number) => payload),
    COMPLETED: createAction('[Load Library Completed]', (payload: LibraryData[]) => payload),
};
