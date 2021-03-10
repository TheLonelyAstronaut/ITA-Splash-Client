export enum ArtworkType {
    IMAGE,
    VIDEO,
}

export type Track = {
    id: string;
    url: string;
    title: string;
    artist: string;
    artistID: number;
    artwork: string;
    liked: boolean;
    albumID: number;
};

export type Playlist = {
    tracks: Track[];
    name: string;
    id: number;
    liked?: boolean;
};

export type Artist = {
    id: number;
    name: string;
    image: string;
    popularTracks?: Track[];
    albums?: Album[];
    similarArtists?: Partial<Artist>[];
    isFollowed: boolean;
};

export interface Album {
    id: number;
    tracks: Track[];
    year: string;
    image: string;
    name: string;
    artistId: Artist | number;
    artistName: string;
    liked?: boolean;
}
