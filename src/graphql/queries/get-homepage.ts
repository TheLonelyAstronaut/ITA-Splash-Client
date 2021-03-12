import { gql } from '@apollo/client';

export const getHomepageMutation = gql`
    query getHomepage {
        getHomepage {
            title
            data {
                __typename
                ... on ArtistOutput {
                    id
                    image
                    name
                }
                ... on AlbumOutput {
                    id
                    name
                    artwork
                }
                ... on PlaylistOutput {
                    id
                    name
                    liked
                }
            }
        }
    }
`;
