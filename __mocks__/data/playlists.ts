import I18n from '../../src/app/utils/i18n';
import { Playlist } from '../../src/types/music';

import { tracks } from './tracks';

export const playlist: Playlist[] = [
    {
        id: 1,
        name: 'Playlist 2',
        tracks: tracks,
        liked: false,
    },
    {
        id: 2,
        name: 'Playlist 3',
        tracks: [],
        liked: false,
    },
];
