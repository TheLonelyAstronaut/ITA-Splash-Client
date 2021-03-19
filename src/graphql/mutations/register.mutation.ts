import { gql } from '@apollo/client';

export const registerMutation = gql`
    mutation register($data: RegisterInput!) {
        register(data: $data) {
            accessToken
        }
    }
`;
