import I18n from '../app/utils/i18n';
import { Playlist } from '../types/music';

import { favoriteTracks } from './favorite-tracks';
import { tracks } from './tracks';

export const playlist: Playlist[] = [
    {
        id: 0,
        name: I18n.t('library.favoriteTracks'),
        tracks: favoriteTracks,
    },
    {
        id: 1,
        name: 'Playlist 2',
        tracks: tracks,
    },
    {
        id: 2,
        name: 'Playlist 3',
        tracks: [],
    },
];
