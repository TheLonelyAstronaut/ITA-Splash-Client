import { Playlist } from '../types/music';

import { tracks } from './tracks';

export const playlist: Playlist[] = [
    {
        id: 0,
        name: 'Playlist 1',
        tracks: tracks,
        image: require('../assets/travisscott.jpg'),
    },
    {
        id: 1,
        name: 'Playlist 2',
        tracks: tracks,
        image: require('../assets/travisscott.jpg'),
    },
    {
        id: 2,
        name: 'Playlist 3',
        tracks: tracks,
        image: require('../assets/travisscott.jpg'),
    },
];
