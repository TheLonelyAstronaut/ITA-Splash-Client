import { gql } from '@apollo/client';

import { PlaylistFragment } from '../fragments';

export const getPlaylistQuery = gql`
    ${PlaylistFragment}
    query getPlaylist($playlistID: Float!) {
        getPlaylist(data: $playlistID) {
            ...PlaylistFragment
        }
    }
`;
