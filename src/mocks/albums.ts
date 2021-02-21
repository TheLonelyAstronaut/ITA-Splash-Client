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
        image: 'https://images.genius.com/9c8508d3056b146aee2ad72d5f0606e7.926x926x1.jpg',
        name: 'ASTRO WORLD',
    },
    {
        data: tracks,
        year: '2021',
        image: 'https://i.pinimg.com/originals/b0/6b/a1/b06ba1e97a5ede25d56cb473c1d54636.jpg',
        name: 'Queen',
    },
    {
        data: tracks,
        year: '2019',
        image: 'https://wallpapercave.com/wp/wp4354959.jpg',
        name: 'Hollywoods Bleeding',
    },
];
