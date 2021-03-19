import { ArtistOutput } from './artist.types';
import { AlbumOutput, TrackOutput } from './music-data.types';

export type SearchOutput = {
    findByQuery: {
        artists: ArtistOutput[];
        albums: AlbumOutput[];
        tracks: TrackOutput[];
    };
};

export type SearchInput = {
    searchQuery: {
        query: string;
    };
};
