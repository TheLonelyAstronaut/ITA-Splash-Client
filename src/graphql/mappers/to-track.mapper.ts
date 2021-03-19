import { Track } from '../../types/music';
import { TrackOutput } from '../types/music-data.types';

export const fromTrackOutput = (output: TrackOutput): Track => {
    return {
        ...output,
        artist: output.artistName,
        id: output.id.toString(),
    };
};
