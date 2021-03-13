import { gql } from '@apollo/client';

import { PlaylistFragment } from '../fragments';

export const getCurrentUser = gql`
    ${PlaylistFragment}
    query getCurrentUser {
        getCurrentUser {
            id
            email
            username
            subscriptions
            playlists {
                ...PlaylistFragment
            }
        }
    }
`;
