import { gql } from '@apollo/client';

export const loginMutation = gql`
    mutation login($data: LoginInput!) {
        login(data: $data) {
            accessToken
        }
    }
`;
