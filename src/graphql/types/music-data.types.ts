export type AddOrRemoveInput = {
    playlistID: number;
    trackID: number;
};

export type TrackOutput = {
    id: number;
    title: string;
    url: string;
    artwork: string;
    albumID: number;
    artistID: number;
};

export type PlaylistOutput = {
    name: string;
    id: number;
    liked: boolean;
    tracks: TrackOutput[];
};
