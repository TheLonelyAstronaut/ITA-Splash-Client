import { gql } from '@apollo/client';

export const subscribeMutation = gql`
    mutation subscribe($artistID: Float!) {
        subscribe(data: $artistID)
    }
`;
