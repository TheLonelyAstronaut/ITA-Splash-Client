import { AlbumOutput } from './music-data.types';

export type ArtistOutput = {
    name: string;
    image: string;
    id: number;
    similarArtists?: ArtistOutput[];
    albums?: AlbumOutput[];
};

export type GetArtistOutput = {
    getArtist: ArtistOutput;
};

export type GetArtistInput = {
    getArtistData: {
        id: number;
    };
};
