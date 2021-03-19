import { gql } from '@apollo/client';

import { PlaylistFragment } from '../fragments';

export const createPlaylistMutation = gql`
    ${PlaylistFragment}
    mutation createPlaylist($createPlaylistData: CreatePlaylistInput!) {
        createPlaylist(data: $createPlaylistData) {
            ...PlaylistFragment
        }
    }
`;
