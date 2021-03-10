import { Playlist } from '../../types/music';
import { PlaylistOutput } from '../types/music-data.types';

import { fromTrackOutput } from './to-track.mapper';

export const fromPlaylistOutput = (output: PlaylistOutput): Playlist => {
    return {
        ...output,
        tracks: output.tracks.map((track) => {
            return fromTrackOutput(track);
        }),
    };
};
