import { Track } from '../../types/music';

export enum SearchResultType {
    ARTIST,
    PLAYLIST,
    TRACK,
}

export type SearchResult = {
    data: Track[];
    type: SearchResultType;
};

export interface SearchState {
    searchText: string;
    results: SearchResult[];
}
