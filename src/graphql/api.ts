import { ApolloClient, ApolloQueryResult, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Config from 'react-native-config';

import { showMessage } from 'react-native-flash-message';

import { AuthCompletedPayload, LoginPayload, RegisterPayload, User } from '../app/authentication/authentication.types';
import { HomepageData } from '../app/home/home.types';
import { AddPlaylistPayload } from '../app/library/actions';
import { LibraryData, LibraryElementType } from '../app/library/library.types';
import { SearchResult, SearchResultType } from '../app/search/search.types';
import { firebase } from '../app/utils/firebase';
import { albums } from '../mocks/albums';
import { artists } from '../mocks/artists';
import { home } from '../mocks/home-mock';
import { library } from '../mocks/library';
import { playlist } from '../mocks/playlists';
import { tracks } from '../mocks/tracks';
import { users } from '../mocks/users';
import { Artist, Album, Track } from '../types/music';
import { loginMutation } from './mutations/login.mutation';
import { registerMutation } from './mutations/register.mutation';
import { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from './types/auth.types';
import { getCurrentUser } from './queries/get-current-user.query';
import { UserOutput } from './types/user.types';
import { fromUserOutput } from './mappers/to-user.mapper';

export class GraphQLAPI {
    private client: ApolloClient<unknown>;

    constructor() {
        console.log(Config.SERVER_ADDRESS);
        this.client = new ApolloClient({
            uri: Config.SERVER_ADDRESS,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            cache: new InMemoryCache(),
        });
    }

    setAuthToken = (token: string | undefined): void => {
        const httpLink = createHttpLink({
            uri: Config.SERVER_ADDRESS,
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        });

        this.client.setLink(authLink.concat(httpLink));
    };

    getCurrentUser = async (token: string): Promise<User> => {
        const user = await this.client.query<UserOutput>({
            query: getCurrentUser,
        });

        return fromUserOutput(user.data, token);
    };

    login = async (payload: LoginPayload): Promise<AuthCompletedPayload | void> => {
        const result = await this.client.mutate<LoginResponse, LoginInput>({
            mutation: loginMutation,
            variables: {
                data: {
                    email: payload.email,
                    password: payload.password,
                    // FCMToken: await messaging().getToken(),
                    FCMToken: '123',
                },
            },
        });
        if (result.data?.login.accessToken) {
            this.setAuthToken(result.data?.login.accessToken);
            return { data: await this.getCurrentUser(result.data?.login.accessToken) };
        } else {
            throw new Error('no access token found');
        }
    };

    register = async (payload: RegisterPayload): Promise<AuthCompletedPayload> => {
        const result = await this.client.mutate<RegisterResponse, RegisterInput>({
            mutation: registerMutation,
            variables: {
                data: {
                    email: payload.email,
                    password: payload.password,
                    username: payload.username,
                    // FCMToken: await messaging().getToken(),
                    FCMToken: '123',
                },
            },
        });
        console.log(result);
        if (result.data?.register.accessToken) {
            this.setAuthToken(result.data?.register.accessToken);
            return { data: await this.getCurrentUser(result.data?.register.accessToken) };
        } else {
            throw new Error('no access token found');
        }
    };

    addToPlaylist = async (trackId: string, playlistId: number): Promise<void> => {
        const track = tracks.find((track) => track.id === trackId);
        if (playlistId === 0 && track !== undefined) {
            track.liked = true;
            playlist[0].liked = true;
        }
        const playlist1 = playlist[playlistId].tracks.find((track) => track.id === trackId);
        if (!playlist1) {
            playlist[playlistId].tracks.push(track as Track);
        } else {
            throw new Error('Something went wrong');
        }
    };

    logout = (): void => {
        console.log('logout');
    };

    search = async (name: string): Promise<SearchResult[]> => {
        console.log(name);

        const artists1 = artists.filter((artist) => artist.name.includes(name) && name !== '');
        const tracks1 = tracks.filter(
            (track) => track.artist.includes(name) || (track.title.includes(name) && name !== '')
        );
        const albums1 = albums.filter((album) => album.name.includes(name) && name !== '');
        const result: SearchResult[] = [];

        artists1.forEach((item) => {
            result.push({
                type: SearchResultType.ARTIST,
                data: item,
            });
        });

        tracks1.forEach((item) => {
            result.push({
                type: SearchResultType.TRACK,
                data: item,
            });
        });

        albums1.forEach((item) => {
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

    getLibrary = async (): Promise<LibraryData[]> => {
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
        // if (currentPass === users[0].password) {
        //     users[0].password = newPass;
        // } else {
        //     throw new Error('Incorrect password');
        // }
    };

    getHomepageData = async (): Promise<HomepageData[]> => {
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

    addToLiked = async (id: number): Promise<void> => {
        const track = tracks.find((track) => track.id === id.toString()) as Track;
        if (track.liked) {
            track.liked = false;
            for (let i = 0; i < playlist[0].tracks.length; i++) {
                if (playlist[0].tracks[i] === track) {
                    playlist[0].tracks.splice(i, 1);
                }
            }
        } else {
            track.liked = true;
            playlist[0].tracks.push(track);
        }
    };

    followOrUnfollow = async (id: number): Promise<Artist> => {
        const artist = artists.find((artist) => artist.id === id) as Artist;
        const index = artists.findIndex((artist) => artist.id === id);
        artists[index] = { ...artist, isFollowed: !artist.isFollowed };
        await firebase.follow(artist);
        return artist;
    };
}

export const client = new GraphQLAPI();
