import { createHttpLink, ApolloClient, InMemoryCache, ApolloQueryResult } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { SERVER_ADDRESS } from '@env';
import { AuthCompletedPayload, LoginPayload, RegisterPayload } from '../app/authentication/authentication';
import { tracks } from '../mocks/tracks';
import { Track } from '../types/music';
import { playlist } from '../mocks/playlists';
import { users } from '../mocks/users';

export class GraphQLAPI {
    private client: ApolloClient<unknown>;

    constructor() {
        this.client = new ApolloClient({
            uri: SERVER_ADDRESS,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            cache: new InMemoryCache(),
        });
    }

    setAuthToken = (token: string): void => {
        const httpLink = createHttpLink({
            uri: SERVER_ADDRESS,
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token,
                },
            };
        });

        this.client.setLink(authLink.concat(httpLink));
    };

    login = async (payload: LoginPayload): Promise<AuthCompletedPayload> => {
        const user = await users.filter((user) => user.username === payload.username);
        if (user.length > 0) {
            this.setAuthToken(user[0].token);
            return { username: user[0].username, token: user[0].token };
        } else {
            throw new Error('invalid input');
        }
    };

    register = async (payload: RegisterPayload): Promise<any> => {
        const user = await users.filter((user) => user.username === payload.username);

        if (user.length > 0) {
            throw new Error('user already exists');
        } else {
            users.push(payload);
        }
    };

    getTrack = (): Track => {
        return tracks[0];
    };

    getCurrentPlaylist = (): Track[] => {
        return tracks;
    };

    getPLaylists = (): Track[][] => {
        return playlist;
    };

    search = async (name: string): Promise<Track> => {
        const result = await tracks.filter((track) => track.title === name);
        if (result.length > 0) {
            return result[0];
        } else {
            throw new Error('nothing founded');
        }
    };
}

export const client = new GraphQLAPI();
