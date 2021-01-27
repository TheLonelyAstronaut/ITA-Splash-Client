import { ArtworkType, Track } from '../app/player/player.state';

export const tracks: Track[] = [
    {
        id: '0',
        url: require('../assets/testmp3.mp3'),
        title: 'test',
        artist: 'test',
        artwork: { uri: 'https://media.giphy.com/media/4ck99vdkdx468DQwxB/giphy.gif' },
        artworkType: ArtworkType.VIDEO,
    },
    {
        id: '1',
        url: require('../assets/postmalone.mp3'),
        title: 'Sunflower',
        artist: 'Post Malone',
        artwork: { uri: 'https://media.giphy.com/media/4ck99vdkdx468DQwxB/giphy.gif' },
        artworkType: ArtworkType.VIDEO,
    },
    {
        id: '2',
        url: require('../assets/travisscott.mp3'),
        title: 'Sicko mode',
        artist: 'Travis Scott',
        artwork: require('../assets/travisscott.jpg'),
        artworkType: ArtworkType.IMAGE,
    },
    {
        id: '3',
        url: require('../assets/queen.mp3'),
        title: 'Dont Stop Me Now',
        artist: 'Queen',
        artwork: require('../assets/queen.jpg'),
        artworkType: ArtworkType.IMAGE,
    },
    {
        id: '4',
        url: require('../assets/skryptonite.mp3'),
        title: 'Chistiy',
        artist: 'Scryptonite',
        artwork: require('../assets/skryptonite.jpg'),
        artworkType: ArtworkType.IMAGE,
    },
];
