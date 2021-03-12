import { ApolloClient, ApolloQueryResult, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import messaging from '@react-native-firebase/messaging';
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
import { Artist, Album, Track, Playlist } from '../types/music';

import { fromAlbumOutput } from './mappers/to-album.mapper';
import { fromArtistOutput } from './mappers/to-artist.mapper';
import { fromPlaylistOutput } from './mappers/to-playlist.mapper';
import { fromSearchOutput } from './mappers/to-search-result.mapper';
import { fromTrackOutput } from './mappers/to-track.mapper';
import { fromUserOutput } from './mappers/to-user.mapper';
import { addOrRemoveFromPlaylistMutation } from './mutations/add-or-remove-from-playlist.mutation';
import { createPlaylistMutation } from './mutations/create-playlist.mutation';
import { loginMutation } from './mutations/login.mutation';
import { registerMutation } from './mutations/register.mutation';
import { subscribeMutation } from './mutations/subscribe.mutation';
import { getAlbumQuery } from './queries/get-album.query';
import { getArtistQuery } from './queries/get-artist.query';
import { getCurrentUser } from './queries/get-current-user.query';
import { getHomepageMutation } from './queries/get-homepage';
import { getPlaylistQuery } from './queries/get-playlist.query';
import { searchQuery } from './queries/search.query';
import { ArtistOutput, GetArtistInput } from './types/artist.types';
import { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from './types/auth.types';
import { HomepageDataOutput } from './types/home.types';
import {
    AddOrRemoveInput,
    AlbumAndPlaylistInput,
    AlbumOutput,
    CreatePlaylistInput,
    PlaylistOutput,
} from './types/music-data.types';
import { SearchInput, SearchOutput } from './types/search.types';
import { UserOutput } from './types/user.types';

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
                    FCMToken: await messaging().getToken(),
                },
            },
        });
        console.log(result);
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
                    FCMToken: await messaging().getToken(),
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

    addToPlaylist = async (trackId: string, playlistId: number): Promise<Playlist> => {
        const result = await this.client.mutate<PlaylistOutput, AddOrRemoveInput>({
            mutation: addOrRemoveFromPlaylistMutation,
            variables: {
                playlistID: playlistId,
                trackID: Number(trackId),
            },
        });
        if (result.data?.id) {
            return fromPlaylistOutput(result.data);
        } else {
            throw new Error('playlist not founded');
        }
    };

    logout = (): void => {
        console.log('logout');
    };

    search = async (name: string): Promise<SearchResult[]> => {
        const result = await this.client.query<SearchOutput, SearchInput>({
            query: searchQuery,
            variables: {
                data: {
                    query: name,
                },
            },
        });
        if (result.data) {
            return fromSearchOutput(result.data);
        } else {
            throw new Error('nothing founded');
        }
    };

    getLibrary = async (): Promise<LibraryData[]> => {
        return library;
    };

    addPlaylist = async (action: AddPlaylistPayload): Promise<Playlist> => {
        const result = await this.client.mutate<PlaylistOutput, CreatePlaylistInput>({
            mutation: createPlaylistMutation,
            variables: {
                name: action.name,
            },
        });
        if (result.data?.id) {
            return fromPlaylistOutput(result.data);
        } else {
            throw new Error('playlist not founded');
        }
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
        //     const result = await this.client.query<HomepageDataOutput>({
        //         query: getHomepageMutation,
        //     });
        //
        // })
    };

    subscribe = async (id: number): Promise<number[]> => {
        const result = await this.client.mutate<number[], { data: number }>({
            mutation: subscribeMutation,
            variables: {
                data: id,
            },
        });
        if (result.data) {
            return result.data;
        } else {
            throw new Error('nothing founded');
        }
    };

    getArtist = async (id: number): Promise<Artist> => {
        console.log(id);
        const result = await this.client.query<ArtistOutput, GetArtistInput>({
            query: getArtistQuery,
            variables: {
                data: {
                    id: id,
                },
            },
        });

        if (result.data) {
            return fromArtistOutput(result.data);
        } else {
            throw new Error('artist not founded');
        }
    };

    getAlbum = async (id: number): Promise<Album> => {
        const result = await this.client.query<AlbumOutput, AlbumAndPlaylistInput>({
            query: getAlbumQuery,
            variables: {
                data: {
                    id: id,
                },
            },
        });
        if (result.data) {
            return fromAlbumOutput(result.data);
        } else {
            throw new Error('album not founded');
        }
    };

    getPlaylist = async (id: number): Promise<Playlist> => {
        const result = await this.client.query<PlaylistOutput, AlbumAndPlaylistInput>({
            query: getPlaylistQuery,
            variables: {
                data: {
                    id: id,
                },
            },
        });
        if (result.data) {
            return fromPlaylistOutput(result.data);
        } else {
            throw new Error('playlist not founded');
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
