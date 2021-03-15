import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';

import { AuthCompletedPayload, LoginPayload, RegisterPayload, User } from '../app/authentication/authentication.types';
import { HomepageData } from '../app/home/home.types';
import { AddPlaylistPayload } from '../app/library/actions';
import { SearchResult } from '../app/search/search.types';
import { Artist, Album, Playlist } from '../types/music';

import { fromAlbumOutput } from './mappers/to-album.mapper';
import { fromArtistOutput } from './mappers/to-artist.mapper';
import { fromHomepageOutput } from './mappers/to-homepage.mapper';
import { fromPlaylistOutput } from './mappers/to-playlist.mapper';
import { fromSearchOutput } from './mappers/to-search-result.mapper';
import { fromUserOutput } from './mappers/to-user.mapper';
import { addOrRemoveFromPlaylistMutation } from './mutations/add-or-remove-from-playlist.mutation';
import { createPlaylistMutation } from './mutations/create-playlist.mutation';
import { loginMutation } from './mutations/login.mutation';
import { registerMutation } from './mutations/register.mutation';
import { subscribeMutation } from './mutations/subscribe.mutation';
import { getAlbumQuery } from './queries/get-album.query';
import { getArtistQuery } from './queries/get-artist.query';
import { getCurrentUser } from './queries/get-current-user.query';
import { getHomepageQuery } from './queries/get-homepage';
import { getPlaylistQuery } from './queries/get-playlist.query';
import { searchQuery } from './queries/search.query';
import { GetArtistInput, GetArtistOutput } from './types/artist.types';
import { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from './types/auth.types';
import { HomepageDataOutput } from './types/home.types';
import {
    AddOrRemoveInput,
    AddToPlaylistOutput,
    AlbumInput,
    CreatePlaylistInput,
    CreatePlaylistOutput,
    GetAlbumOutput,
    GetPlaylistOutput,
    PlaylistInput,
} from './types/music-data.types';
import { SearchInput, SearchOutput } from './types/search.types';
import { SubscribeInput, SubscribeOuput } from './types/subscribe.types';
import { UserOutput } from './types/user.types';

export class GraphQLAPI {
    private client: ApolloClient<unknown>;

    constructor() {
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
        if (result.data?.login.accessToken) {
            this.setAuthToken(result.data?.login.accessToken);
            return {
                data: await this.getCurrentUser(result.data?.login.accessToken),
                token: result.data?.login.accessToken,
            };
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
        if (result.data?.register.accessToken) {
            this.setAuthToken(result.data?.register.accessToken);
            return {
                data: await this.getCurrentUser(result.data?.register.accessToken),
                token: result.data?.register.accessToken,
            };
        } else {
            throw new Error('no access token found');
        }
    };

    addToPlaylist = async (trackId: string, playlistId: number): Promise<Playlist> => {
        const result = await this.client.mutate<AddToPlaylistOutput, AddOrRemoveInput>({
            mutation: addOrRemoveFromPlaylistMutation,
            variables: {
                addOrRemoveData: {
                    playlistID: playlistId,
                    trackID: Number(trackId),
                },
            },
        });
        if (result.data?.addOrRemoveFromPlaylist.id) {
            return fromPlaylistOutput(result.data.addOrRemoveFromPlaylist);
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
                searchQuery: {
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

    addPlaylist = async (action: AddPlaylistPayload): Promise<Playlist> => {
        console.log(action);
        const result = await this.client.mutate<CreatePlaylistOutput, CreatePlaylistInput>({
            mutation: createPlaylistMutation,
            variables: {
                createPlaylistData: {
                    name: action.name,
                },
            },
        });
        if (result.data?.createPlaylist.id) {
            return fromPlaylistOutput(result.data.createPlaylist);
        } else {
            throw new Error('playlist not founded');
        }
    };

    changePassword = async (currentPass: string, newPass: string): Promise<{}> => {
        // if (currentPass === users[0].password) {
        //     users[0].password = newPass;
        // } else {
        //     throw new Error('Incorrect password');
        // }
        return { currentPass: currentPass, newPass: newPass };
    };

    getHomepageData = async (): Promise<HomepageData[]> => {
        const home: HomepageData[] = [];

        const result = await this.client.query<HomepageDataOutput>({
            query: getHomepageQuery,
        });
        result.data.getHomepage.forEach((item) => {
            home.push(fromHomepageOutput(item));
        });
        return home;
    };

    subscribe = async (id: number): Promise<number[]> => {
        const result = await this.client.mutate<SubscribeOuput, SubscribeInput>({
            mutation: subscribeMutation,
            variables: {
                artistID: id,
            },
        });
        if (result.data) {
            return result.data.subscribe;
        } else {
            throw new Error('nothing founded');
        }
    };

    getArtist = async (id: number): Promise<Artist> => {
        console.log(id);
        const result = await this.client.query<GetArtistOutput, GetArtistInput>({
            query: getArtistQuery,
            variables: {
                getArtistData: {
                    id: id,
                },
            },
        });

        if (result.data) {
            return fromArtistOutput(result.data.getArtist);
        } else {
            throw new Error('artist not founded');
        }
    };

    getAlbum = async (id: number): Promise<Album> => {
        const result = await this.client.query<GetAlbumOutput, AlbumInput>({
            query: getAlbumQuery,
            variables: {
                albumID: id,
            },
        });
        if (result.data) {
            return fromAlbumOutput(result.data.getAlbum);
        } else {
            throw new Error('album not founded');
        }
    };

    getPlaylist = async (id: number): Promise<Playlist> => {
        const result = await this.client.query<GetPlaylistOutput, PlaylistInput>({
            query: getPlaylistQuery,
            variables: {
                playlistID: id,
            },
        });
        if (result.data) {
            return fromPlaylistOutput(result.data.getPlaylist);
        } else {
            throw new Error('playlist not founded');
        }
    };

    // addToLiked = async (id: number): Promise<void> => {
    //     const track = tracks.find((track) => track.id === id.toString()) as Track;
    //     if (track.liked) {
    //         track.liked = false;
    //         for (let i = 0; i < playlist[0].tracks.length; i++) {
    //             if (playlist[0].tracks[i] === track) {
    //                 playlist[0].tracks.splice(i, 1);
    //             }
    //         }
    //     } else {
    //         track.liked = true;
    //         playlist[0].tracks.push(track);
    //     }
    // };
}

export const client = new GraphQLAPI();
