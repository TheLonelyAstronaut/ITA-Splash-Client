import { Album, Artist, Playlist } from '../../types/music';

export type ArtistPreview = {
    id: number;
    name: string;
    image: string;
};

export type AlbumPreview = {
    id: number;
    name: string;
    artwork: string;
};

export type PlaylistPreview = {
    id: number;
    name: string;
    liked: boolean;
};

export type RenderDataProp = (ArtistPreview | AlbumPreview | PlaylistPreview | null)[];

export type HomepageData = {
    title: string;
    data: RenderDataProp[];
};
