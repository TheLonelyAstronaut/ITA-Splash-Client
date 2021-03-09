import { gql } from '@apollo/client';

export const getCurrentUser = gql`
    query getCurrentUser {
        getCurrentUser {
            id
            email
            username
            subscriptions
        }
    }
`;
