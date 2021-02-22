import { Artist } from '../types/music';

import { albums } from './albums';
import { tracks } from './tracks';

export const artists: Artist[] = [
    {
        id: 0,
        name: 'Post Malone',
        popularTracks: tracks,
        image: 'https://cyber.pressball.by/wp-content/uploads/2021/02/saint-tropez-post-malone-2.jpg',
        albums: [albums[2]],
        similarArtists: [
            {
                id: 1,
                name: 'Travis Scott',
                image:
                    'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed670179e384f0007b7db8f%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1032%26cropX2%3D3642%26cropY1%3D186%26cropY2%3D2795',
            },
            {
                id: 2,
                name: 'Queen',
                image: 'https://www.udiscovermusic.com/wp-content/uploads/2018/08/GH008-web-optimised-1000.jpg',
            },
        ],
    },
    {
        id: 1,
        name: 'Travis Scott',
        popularTracks: tracks,
        image:
            'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed670179e384f0007b7db8f%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1032%26cropX2%3D3642%26cropY1%3D186%26cropY2%3D2795',
        albums: [albums[0]],
        similarArtists: [
            {
                id: 0,
                name: 'Post Malone',
                image: 'https://cyber.pressball.by/wp-content/uploads/2021/02/saint-tropez-post-malone-2.jpg',
            },
            {
                id: 2,
                name: 'Queen',
                image: 'https://www.udiscovermusic.com/wp-content/uploads/2018/08/GH008-web-optimised-1000.jpg',
            },
        ],
    },
    {
        id: 2,
        name: 'Queen',
        popularTracks: tracks,
        image: 'https://www.udiscovermusic.com/wp-content/uploads/2018/08/GH008-web-optimised-1000.jpg',
        albums: [albums[1]],
        similarArtists: [
            {
                id: 0,
                name: 'Post Malone',
                image: 'https://cyber.pressball.by/wp-content/uploads/2021/02/saint-tropez-post-malone-2.jpg',
            },
            {
                id: 3,
                name: 'Scriptonite',
                image: 'https://m.iguides.ru/upload/iblock/8b3/8b3c6f7dab41bc8590ffc78ff22fa372.jpg',
            },
        ],
    },
    {
        id: 3,
        name: 'Scriptonite',
        popularTracks: tracks,
        image: 'https://m.iguides.ru/upload/iblock/8b3/8b3c6f7dab41bc8590ffc78ff22fa372.jpg',
        albums: [],
        similarArtists: [
            {
                id: 0,
                name: 'Post Malone',
                image: 'https://cyber.pressball.by/wp-content/uploads/2021/02/saint-tropez-post-malone-2.jpg',
            },
            {
                id: 1,
                name: 'Travis Scott',
                image:
                    'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed670179e384f0007b7db8f%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1032%26cropX2%3D3642%26cropY1%3D186%26cropY2%3D2795',
            },
        ],
    },
];
