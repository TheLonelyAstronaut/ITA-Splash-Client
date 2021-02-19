import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Album } from '../../mocks/albums';
import { Playlist } from '../../types/music';

export type HomeParamList = {
    HomeScreen: undefined;
    HomePlaylistScreen: { data: Playlist | Album };
    HomeMusicianScreen: undefined;
    HomeAlbumsScreen: undefined;
    HomeAlbumScreen: { data: Playlist | Album };
};

export type HomeNavigationProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>;
    route: RouteProp<HomeParamList, T>;
};
