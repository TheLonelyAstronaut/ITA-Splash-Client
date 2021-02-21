import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { SERVER_ADDRESS } from '@env';

import { AuthCompletedPayload, LoginPayload, RegisterPayload } from '../app/authentication/authentication.types';
import { LibraryData } from '../app/library/library.types';
import { SearchResult, SearchResultType } from '../app/search/search.types';
import { artists } from '../mocks/artists';
import { playlist } from '../mocks/playlists';
import { library } from '../mocks/library';
import { home, HomepageData } from '../mocks/home-mock';
import { tracks } from '../mocks/tracks';
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

    setAuthToken = (token: string | undefined): void => {
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
        const user = users.filter((user) => user.email === payload.email && user.password === payload.password);

        if (user.length > 0) {
            this.setAuthToken(user[0].token);
            return { data: user[0] };
        } else {
            throw new Error('invalid input');
        }
    };

    register = async (payload: RegisterPayload): Promise<AuthCompletedPayload> => {
        const user = users.filter((user) => user.email === payload.email);

        if (user.length > 0) {
            throw new Error('user already exists');
        } else {
            users.push({
                token: Math.random().toString(),
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            return { data: user[0] };
        }
    };

    logout = (): void => {
        console.log('logout');
    };

    // getPLaylistById = (id: number): Playlist[] => {
    //     return playlist;
    // };

    search = async (name: string): Promise<SearchResult[]> => {
        const artists1 = artists.filter((artist) => artist.name.includes(name) && name !== '');
        const tracks1 = tracks.filter(
            (track) => track.artist.includes(name) || (track.title.includes(name) && name !== '')
        );
        const playlists1 = playlist.filter((playlist) => playlist.name.includes(name) && name !== '');
        const result: SearchResult[] = [];
        artists1.map((item) => {
            result.push({
                title: item.name,
                description: 'artist',
                image: item.image,
                type: SearchResultType.ARTIST,
                data: item,
            });
        });
        tracks1.map((item) => {
            result.push({
                title: item.title,
                description: item.artist,
                image: item.artwork,
                type: SearchResultType.TRACK,
                data: item,
            });
        });
        playlists1.map((item) => {
            result.push({
                title: item.name,
                description: 'playlist',
                image: require('../assets/travisscott.jpg'),
                type: SearchResultType.PLAYLIST,
                data: item,
            });
        });
        if (result.length > 0) {
            return result;
        } else {
            throw new Error('nothing founded');
        }
    };

    getLibrary = async (id: number): Promise<LibraryData[]> => {
        return library;
    };

    addPlaylist = async (action: LibraryData): Promise<LibraryData[]> => {
        library.push({
            data: { name: action.data.name, id: 15 },
            type: action.type,
        });
        console.log(library);
    };

    changePassword = async (currentPass: string, newPass: string): Promise<void> => {
        if (currentPass === users[0].password) {
            users[0].password = newPass;
        } else {
            throw new Error('Incorrect password');
        }
    };
    
    getHomepageData = async (id: number): Promise<HomepageData[]> => {
        return home;
    };
}

export const client = new GraphQLAPI();
