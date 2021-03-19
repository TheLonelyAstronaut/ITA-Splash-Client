import { AlbumPreview, ArtistPreview, HomepageData, PlaylistPreview } from '../../app/home/home.types';
import { ArtistOutput } from '../types/artist.types';
import { HomepageMapperData } from '../types/home.types';
import { AlbumOutput, PlaylistOutput } from '../types/music-data.types';

export const toArtist = (artist: ArtistOutput): ArtistPreview => {
    return {
        id: artist.id,
        image: artist.image,
        name: artist.name,
    };
};

export const toAlbum = (album: AlbumOutput): AlbumPreview => {
    return {
        id: album.id,
        name: album.name,
        artwork: album.artwork,
    };
};

export const toPlaylist = (playlist: PlaylistOutput): PlaylistPreview => {
    return {
        id: playlist.id,
        name: playlist.name,
        liked: playlist.liked,
    };
};

export const fromHomepageOutput = (data: HomepageMapperData): HomepageData => {
    return {
        title: data.title,
        data: [
            data.data.map((value) => {
                if ((value as ArtistOutput).image) {
                    return toArtist(value as ArtistOutput);
                } else if ((value as AlbumOutput).artwork) {
                    return toAlbum(value as AlbumOutput);
                } else if ((value as PlaylistOutput).liked || !(value as PlaylistOutput).liked) {
                    return toPlaylist(value as PlaylistOutput);
                } else return null;
            }),
        ],
    };
};
