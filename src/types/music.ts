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
    artwork: string;
    artworkType: ArtworkType;
};

export type Playlist = {
    tracks: Track[];
    name: string;
    id: number;
};

export type Artist = {
    id: number;
    name: string;
    popularTracks?: Track[];
    image: string;
    albums?: Track[];
    similarArtists?: Artist[];
};
