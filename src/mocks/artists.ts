import { Artist } from '../types/music';

import { playlist } from './playlists';
import { tracks } from './tracks';

export const artists: Artist[] = [
    {
        id: 0,
        name: 'Post Malone',
        popularTracks: tracks,
        image: require('../assets/post-profile.jpeg'),
        albums: playlist[0].tracks,
    },
    {
        id: 1,
        name: 'Travis Scott',
        popularTracks: tracks,
        image: require('../assets/travis.jpeg'),
        albums: playlist[1].tracks,
    },
    {
        id: 2,
        name: 'Queen',
        popularTracks: tracks,
        image: require('../assets/queen-profile.jpg'),
        albums: playlist[2].tracks,
    },
    {
        id: 3,
        name: 'Scryptonite',
        popularTracks: tracks,
        image: require('../assets/skrip.jpeg'),
        albums: playlist[0].tracks,
    },
];
