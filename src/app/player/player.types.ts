import { Track } from '../../types/music';

export enum ControlActions {
    PAUSE_RESUME,
    SKIP_TO_NEXT,
    SKIP_TO_PREVIOUS,
}

export interface TrackState {
    currentTrack: Track;
    artistId: number | undefined;
    queue: Track[];
    trackGradient: Record<string, string[]>;
}
