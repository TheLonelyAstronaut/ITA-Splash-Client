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

export type Playlist = {
    tracks: Track[];
    name: string;
    id: number;
};
