import { gql } from '@apollo/client';

import { AlbumFragment } from '../fragments';

export const getAlbumQuery = gql`
    ${AlbumFragment}
    query getAlbum($albumID: Float!) {
        getAlbum(data: $albumID) {
            ...AlbumFragment
        }
    }
`;
