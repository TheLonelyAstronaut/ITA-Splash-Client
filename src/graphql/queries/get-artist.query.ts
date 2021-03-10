import { gql } from '@apollo/client';

import { ArtistFragment } from '../fragments';

export const getArtistQuery = gql`
    ${ArtistFragment}
    query getArtist($getArtistData: GetArtistInput!) {
        getArtist(data: $getArtistData) {
            ...ArtistFragment
        }
    }
`;
