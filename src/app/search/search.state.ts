import { Track } from '../../types/music';

export interface SearchState {
    searchText: string;
    results: Track[];
}
