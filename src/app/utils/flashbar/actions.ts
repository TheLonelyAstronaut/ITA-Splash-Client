import { createAction } from 'typesafe-redux-helpers';

import { FlashbarEnum } from './flashbar-state';

export interface FlashBarProps {
    type: FlashbarEnum;
    title: string;
    message: string;
}

export const SHOW_FLASHBAR = createAction('[Show flashbar]', (payload: FlashBarProps) => payload);
