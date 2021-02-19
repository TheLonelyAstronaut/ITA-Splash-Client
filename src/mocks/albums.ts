import { Track } from '../types/music';

import { tracks } from './tracks';

export interface Album {
    data: Track[];
    year: string;
    artwork: string;
    name: string;
    artist: string;
}

export const albums: Album[] = [
    {
        data: tracks,
        year: '2020',
        artwork: require('../assets/travisscott.jpg'),
        name: 'ASTRO WORLD',
        artist: 'Travis Scott',
    },
    {
        data: tracks,
        year: '2021',
        artwork: require('../assets/queen.jpg'),
        name: 'Queen',
        artist: 'Queen',
    },
    {
        data: tracks,
        year: '2019',
        artwork: require('../assets/postmalone.jpg'),
        name: 'Hollywood`s Bleeding',
        artist: 'Post Malone',
    },
];
