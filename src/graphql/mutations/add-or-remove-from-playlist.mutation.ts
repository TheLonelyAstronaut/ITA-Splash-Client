import { gql } from '@apollo/client';

import { PlaylistFragment } from '../fragments';

export const addOrRemoveFromPlaylistMutation = gql`
    ${PlaylistFragment}
    mutation addOrRemoveFromPlaylist($addOrRemoveData: AddOrRemoveInput!) {
        addOrRemoveFromPlaylist(data: $addOrRemoveData) {
            ...PlaylistFragment
        }
    }
`;
