import { Track } from '../../types/music';
import { TrackOutput } from '../types/music-data.types';

export const fromTrackOutput = (output: TrackOutput): Track => {
    return {
        ...output,
        liked: true,
        artist: 'test',
        id: output.id.toString(),
    };
};
