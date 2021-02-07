import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeParamList = {
    HomeScreen: undefined;
    HomePlaylistScreen: undefined;
    HomeMusicianScreen: undefined;
    HomeAlbumsScreen: undefined;
};

export type HomeNavigationProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>;
    route: RouteProp<HomeParamList, T>;
};
