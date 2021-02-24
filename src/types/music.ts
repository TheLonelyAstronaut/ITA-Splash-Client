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
    liked: boolean;
};

export type Playlist = {
    tracks: Track[];
    name: string;
    id: number;
    image?: string;
};

export type Artist = {
    id: number;
    name: string;
    popularTracks: Track[];
    image: string;
    albums?: Album[];
    similarArtists?: Artist[];
};

export interface Album {
    id: number;
    tracks: Track[];
    year: string;
    image: string;
    name: string;
    artistId: Artist | number;
    artistName: string;
}
