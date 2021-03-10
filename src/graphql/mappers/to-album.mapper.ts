import { Album } from '../../types/music';
import { AlbumOutput } from '../types/music-data.types';

import { fromTrackOutput } from './to-track.mapper';

export const fromAlbumOutput = (output: AlbumOutput): Album => {
    return {
        ...output,
        tracks: output.tracks.map((track) => {
            return fromTrackOutput(track);
        }),
        year: '2020',
        image: output.artwork,
        artistId: 1,
        artistName: 'Post Malone',
    };
};
