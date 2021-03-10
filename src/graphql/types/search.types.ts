import { ArtistOutput } from './artist.types';
import { AlbumOutput, TrackOutput } from './music-data.types';

export type SearchOutput = {
    artists: ArtistOutput[];
    albums: AlbumOutput[];
    tracks: TrackOutput[];
};

export type SearchInput = {
    data: {
        query: string;
    };
};
