import { gql } from '@apollo/client';

export const TrackFragment = gql`
    fragment TrackFragment on TrackOutput {
        id
        title
        artwork
        albumID
        artistID
        url
        artistName
        liked
    }
`;

export const PlaylistFragment = gql`
    ${TrackFragment}
    fragment PlaylistFragment on PlaylistOutput {
        id
        liked
        name
        tracks {
            ...TrackFragment
        }
    }
`;

export const AlbumFragment = gql`
    ${TrackFragment}
    fragment AlbumFragment on AlbumOutput {
        id
        name
        artwork
        artistID
        artistName
        tracks {
            ...TrackFragment
        }
    }
`;

export const ArtistFragment = gql`
    ${AlbumFragment}
    fragment ArtistFragment on ArtistOutput {
        id
        image
        name
        albums {
            ...AlbumFragment
        }
        similarArtists {
            id
            image
            name
        }
    }
`;
