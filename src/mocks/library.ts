import { LibraryData, LibraryElementType } from '../app/library/library.types';

import { playlist } from './playlists';

export const library: LibraryData[] = [
    {
        data: playlist[0],
        type: LibraryElementType.LIKED,
    },
    {
        data: playlist[1],
        type: LibraryElementType.PLAYLIST,
    },
    {
        data: playlist[2],
        type: LibraryElementType.PLAYLIST,
    },
];
