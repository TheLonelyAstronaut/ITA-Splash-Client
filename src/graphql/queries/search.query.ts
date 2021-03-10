import { gql } from '@apollo/client';

import { TrackFragment } from '../fragments';

export const searchQuery = gql`
    ${TrackFragment}
    query search($searchQuery: SearchInput!) {
        findByQuery(data: $searchQuery) {
            artists {
                id
                image
                name
            }
            albums {
                id
                artwork
                name
            }
            tracks {
                ...TrackFragment
            }
        }
    }
`;
