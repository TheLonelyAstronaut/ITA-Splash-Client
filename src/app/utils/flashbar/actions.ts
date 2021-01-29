import { createAction } from 'typesafe-redux-helpers';
import { FlashbarEnum } from './flashbar-state';

export interface flashbarProps {
    type: FlashbarEnum;
    message: string;
}

export const SHOW_FLASHBAR = createAction('[Show flashbar]', (payload: flashbarProps) => payload);
