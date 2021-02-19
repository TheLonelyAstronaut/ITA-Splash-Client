import { Track, Playlist, Artist } from '../../types/music';

export enum SearchResultType {
    ARTIST,
    PLAYLIST,
    TRACK,
}

export type SearchResult = {
    title: string;
    description: string;
    image: string;
    type: SearchResultType;
    data: Artist | Track | Playlist;
};

export interface SearchState {
    searchText: string;
    results: SearchResult[];
    isFetching: boolean;
    error: undefined | Error;
    nothingFounded: boolean;
}
