import { Artist } from '../types/music';

import { playlist } from './playlists';
import { tracks } from './tracks';

export const artists: Artist[] = [
    {
        id: 0,
        name: 'Post Malone',
        popularTracks: tracks,
        image: require('../assets/postmalone.jpg'),
        albums: playlist,
    },
    {
        id: 1,
        name: 'Travis Scott',
        popularTracks: tracks,
        image: require('../assets/travisscott.jpg'),
        albums: playlist,
    },
    {
        id: 2,
        name: 'Queen',
        popularTracks: tracks,
        image: require('../assets/queen.jpg'),
        albums: playlist,
    },
    {
        id: 3,
        name: 'Scryptonite',
        popularTracks: tracks,
        image: require('../assets/skryptonite.jpg'),
        albums: playlist,
    },
];
