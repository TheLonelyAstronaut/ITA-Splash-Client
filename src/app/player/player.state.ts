export enum ArtworkType {
    IMAGE,
    VIDEO,
}

export type Track = {
    id: string;
    url: string;
    title: string;
    artist: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    artwork: any;
    artworkType: ArtworkType;
};

export enum ControlActions {
    PAUSE_RESUME,
    SKIP_TO_NEXT,
    SKIP_TO_PREVIOUS,
}

export interface TrackState {
    currentTrack: Track;
    queue: Track[];
}
