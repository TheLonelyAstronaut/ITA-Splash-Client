import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Album } from '../../types/music';

export type MusicStackParamsList = {
    ArtistScreen: {
        id: number;
    };
    AlbumsScreen: {
        albums: Album[];
    };
    AlbumScreen: {
        id: number;
    };
};

export type MusicStackNavigationProps<T extends keyof MusicStackParamsList> = {
    navigation: StackNavigationProp<MusicStackParamsList, T>;
    route: RouteProp<MusicStackParamsList, T>;
};

export type AlbumScreenParams = MusicStackNavigationProps<'AlbumScreen'>;
export type AlbumsScreenParams = MusicStackNavigationProps<'AlbumsScreen'>;
export type ArtistScreenParams = MusicStackNavigationProps<'ArtistScreen'>;
