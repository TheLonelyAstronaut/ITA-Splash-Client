import { Playlist } from '../types/music';

import { tracks } from './tracks';

export const playlist: Playlist[] = [
    {
        id: 0,
        name: 'Playlist 1',
        tracks: tracks,
        image: 'https://wallpapercave.com/wp/wp4354959.jpg',
    },
    {
        id: 1,
        name: 'Playlist 2',
        tracks: tracks,
        image: 'https://images.genius.com/9c8508d3056b146aee2ad72d5f0606e7.926x926x1.jpg',
    },
    {
        id: 2,
        name: 'Playlist 3',
        tracks: tracks,
        image: 'https://i.pinimg.com/originals/b0/6b/a1/b06ba1e97a5ede25d56cb473c1d54636.jpg',
    },
];
