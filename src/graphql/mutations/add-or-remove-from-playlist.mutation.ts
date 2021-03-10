import { gql } from '@apollo/client';

export const addOrRemoveFromPlaylistMutation = gql`
    mutation addOrRemoveFromPlaylist($addOrRemoveData: AddOrRemoveInput!) {
        addOrRemoveFromPlaylist(data: $addOrRemoveData) {
            ...PlaylistFragment
        }
    }
`;
