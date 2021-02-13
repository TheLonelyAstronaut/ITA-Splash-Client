import { Playlist } from '../../types/music';

export enum LibraryElementType {
    LIKED,
    PLAYLIST,
}

export interface LibraryData {
    type: LibraryElementType;
    data: Playlist;
}
