import { gql } from '@apollo/client';

export const TrackFragment = gql`
    fragment TrackFragment on TrackOutput {
        id
        title
        artwork
        albumID
        artistID
        url
    }
`;

export const PlaylistFragment = gql`
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
    fragment AlbumFragment on AlbumOutput {
        id
        name
        artwork
        tracks {
            ...TrackFragment
        }
    }
`;

export const ArtistFragment = gql`
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
