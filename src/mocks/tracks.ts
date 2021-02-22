import { ArtworkType, Track } from '../types/music';

export const tracks: Track[] = [
    {
        id: '0',
        url: require('../assets/testmp3.mp3'),
        title: 'test',
        artist: 'test',
        artwork: 'https://profilepicture7.com/img/img_dongman/4/-1390993833.jpg',
        artworkType: ArtworkType.IMAGE,
        liked: false,
    },
    {
        id: '1',
        url: require('../assets/postmalone.mp3'),
        title: 'Sunflower',
        artist: 'Post Malone',
        artwork: 'https://wallpapercave.com/wp/wp4354959.jpg',
        artworkType: ArtworkType.IMAGE,
        liked: true,
    },
    {
        id: '2',
        url: require('../assets/travisscott.mp3'),
        title: 'Sicko mode',
        artist: 'Travis Scott',
        artwork: 'https://images.genius.com/9c8508d3056b146aee2ad72d5f0606e7.926x926x1.jpg',
        artworkType: ArtworkType.IMAGE,
        liked: false,
    },
    {
        id: '3',
        url: require('../assets/queen.mp3'),
        title: 'Dont Stop Me Now',
        artist: 'Queen',
        artwork: 'https://i.pinimg.com/originals/b0/6b/a1/b06ba1e97a5ede25d56cb473c1d54636.jpg',
        artworkType: ArtworkType.IMAGE,
        liked: true,
    },
    {
        id: '4',
        url: require('../assets/skryptonite.mp3'),
        title: 'Чистый',
        artist: 'Скриптонит',
        artwork: 'https://zapoem.com/images/covers/87d2f033.a.13052128-1.jpg',
        artworkType: ArtworkType.IMAGE,
        liked: true,
    },
];
