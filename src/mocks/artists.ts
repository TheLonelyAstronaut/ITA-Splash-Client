import { Artist } from '../app/music-data/reducers';

import { albums } from './albums';
import { tracks } from './tracks';

export const artists: Artist[] = [
    {
        name: 'Post Malone',
        popularTracks: tracks,
        albums: albums,
    },
    {
        name: 'Travis Scott',
        popularTracks: tracks,
        albums: albums,
    },
    {
        name: 'Queen',
        popularTracks: tracks,
        albums: albums,
    },
];
