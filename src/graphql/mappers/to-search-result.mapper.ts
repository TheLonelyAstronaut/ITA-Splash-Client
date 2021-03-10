import { SearchResult, SearchResultType } from '../../app/search/search.types';
import { SearchOutput } from '../types/search.types';

import { fromAlbumOutput } from './to-album.mapper';
import { fromArtistOutput } from './to-artist.mapper';
import { fromTrackOutput } from './to-track.mapper';

export const fromSearchOutput = (data: SearchOutput): SearchResult[] => {
    const resultArray: SearchResult[] = [];

    data.albums.forEach((album) => {
        resultArray.push({
            type: SearchResultType.ALBUM,
            data: fromAlbumOutput(album),
        });
    });
    data.artists.forEach((artist) => {
        resultArray.push({
            type: SearchResultType.ARTIST,
            data: fromArtistOutput(artist),
        });
    });
    data.tracks.forEach((track) => {
        resultArray.push({
            type: SearchResultType.TRACK,
            data: fromTrackOutput(track),
        });
    });

    return resultArray;
};
