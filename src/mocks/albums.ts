import { Track } from '../types/music';

import { tracks } from './tracks';

export interface Album {
    data: Track[];
    year: string;
    img: string;
    name: string;
}

export const albums: Album[] = [
    {
        data: tracks,
        year: '2020',
        img: require('../assets/travisscott.jpg'),
        name: 'ASTRO WORLD',
    },
    {
        data: tracks,
        year: '2021',
        img: require('../assets/queen.jpg'),
        name: 'Queen',
    },
    {
        data: tracks,
        year: '2019',
        img: require('../assets/postmalone.jpg'),
        name: 'Hollywoods Bleeding',
    },
];
