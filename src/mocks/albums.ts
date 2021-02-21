import { Track } from '../types/music';

import { tracks } from './tracks';

export interface Album {
    data: Track[];
    year: string;
    image: string;
    name: string;
}

export const albums: Album[] = [
    {
        data: tracks,
        year: '2020',
        image: require('../assets/travisscott.jpg'),
        name: 'ASTRO WORLD',
    },
    {
        data: tracks,
        year: '2021',
        image: require('../assets/queen.jpg'),
        name: 'Queen',
    },
    {
        data: tracks,
        year: '2019',
        image: require('../assets/postmalone.jpg'),
        name: 'Hollywoods Bleeding',
    },
];
