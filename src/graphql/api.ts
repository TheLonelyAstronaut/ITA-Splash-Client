import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { SERVER_ADDRESS } from '@env';

import { AuthCompletedPayload, LoginPayload, RegisterPayload } from '../app/authentication/authentication.types';
import { HomepageData } from '../app/home/home.types';
import { AddPlaylistPayload } from '../app/library/actions';
import { LibraryData, LibraryElementType } from '../app/library/library.types';
import { SearchResult, SearchResultType } from '../app/search/search.types';
import { albums } from '../mocks/albums';
import { artists } from '../mocks/artists';
import { home } from '../mocks/home-mock';
import { library } from '../mocks/library';
import { tracks } from '../mocks/tracks';
import { users } from '../mocks/users';
import { Artist, Album } from '../types/music';

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
        console.log(name);

        const artists1 = artists.filter((artist) => artist.name.includes(name) && name !== '');
        const tracks1 = tracks.filter(
            (track) => track.artist.includes(name) || (track.title.includes(name) && name !== '')
        );
        const albums1 = albums.filter((album) => album.name.includes(name) && name !== '');
        const result: SearchResult[] = [];

        artists1.map((item) => {
            result.push({
                type: SearchResultType.ARTIST,
                data: item,
            });
        });

        tracks1.map((item) => {
            result.push({
                type: SearchResultType.TRACK,
                data: item,
            });
        });

        albums1.map((item) => {
            result.push({
                type: SearchResultType.ALBUM,
                data: item,
            });
        });

        if (result.length > 0) {
            return result;
        } else {
            return [];
        }
    };

    getLibrary = async (id: number): Promise<LibraryData[]> => {
        return library;
    };

    addPlaylist = async (action: AddPlaylistPayload): Promise<LibraryData[]> => {
        library.push({
            data: { name: action.name, id: library.length, tracks: [] },
            type: LibraryElementType.PLAYLIST,
        });

        return library;
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

    getArtist = async (id: number): Promise<Artist> => {
        const artist = artists.find((artist) => artist.id === id);

        if (artist) {
            return artist;
        } else {
            throw new Error('Invalid artist id');
        }
    };

    getAlbum = async (id: number): Promise<Album> => {
        const album = albums.find((album) => album.id === id);

        if (album) {
            return album;
        } else {
            throw new Error('Invalid artist id');
        }
    };
}

export const client = new GraphQLAPI();
