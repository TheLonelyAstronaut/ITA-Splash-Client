import { Artist } from '../../types/music';
import { ArtistOutput } from '../types/artist.types';

import { fromAlbumOutput } from './to-album.mapper';

export const fromArtistOutput = (artist: ArtistOutput): Artist => {
    return {
        ...artist,
        isFollowed: true,
        albums: artist.albums.map((album) => {
            return fromAlbumOutput(album);
        }),
        similarArtists: artist.similarArtists.map((artist) => {
            return fromArtistOutput(artist);
        }),
        // popularTracks: ?
    };
};
