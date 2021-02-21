import { Track } from '../types/music';

import { tracks } from './tracks';

export interface Album {
    tracks: Track[];
    year: string;
    image: string;
    name: string;
    artist: string;
}

export const albums: Album[] = [
    {
        tracks: tracks,
        year: '2020',
        image: 'https://images.genius.com/9c8508d3056b146aee2ad72d5f0606e7.926x926x1.jpg',
        name: 'ASTRO WORLD',
        artist: 'Travis Scott',
    },
    {
        tracks: tracks,
        year: '2021',
        image: 'https://i.pinimg.com/originals/b0/6b/a1/b06ba1e97a5ede25d56cb473c1d54636.jpg',
        name: 'Queen',
        artist: 'Queen',
    },
    {
        tracks: tracks,
        year: '2019',
        image: 'https://wallpapercave.com/wp/wp4354959.jpg',
        name: 'Hollywood`s Bleeding',
        artist: 'Post Malone',
    },
];
