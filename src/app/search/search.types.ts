import { Track, Artist, Album } from '../../types/music';

export enum SearchResultType {
    ARTIST,
    ALBUM,
    TRACK,
}

export type SearchResult = {
    type: SearchResultType;
    data: Artist | Track | Album;
};

export interface SearchState {
    searchText: string;
    results: SearchResult[];
    isFetching: boolean;
    error: undefined | Error;
}
