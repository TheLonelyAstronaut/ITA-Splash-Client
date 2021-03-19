import { Artist, Track } from '../../types/music';
import { ArtistOutput } from '../types/artist.types';

import { fromAlbumOutput } from './to-album.mapper';
import { fromTrackOutput } from './to-track.mapper';

export const fromArtistOutput = (artist: ArtistOutput): Artist => {
    const popularTracks: Track[] = [];
    artist.albums?.forEach((value) => {
        value.tracks.forEach((track) => {
            if (popularTracks.length < 6) {
                popularTracks.push(fromTrackOutput(track));
            }
        });
    });

    return {
        ...artist,
        isFollowed: true,
        albums: artist.albums?.map((album) => {
            return fromAlbumOutput(album);
        }),
        similarArtists: artist.similarArtists?.map((artist) => {
            return fromArtistOutput(artist);
        }),
        popularTracks: popularTracks,
    };
};
