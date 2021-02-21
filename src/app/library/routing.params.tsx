import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type LibraryStackParamList = {
    PlaylistsScreen: undefined;
    PlaylistScreen: {
        id: number;
    };
};

export type LibraryStackNavigationProps<T extends keyof LibraryStackParamList> = {
    navigation: StackNavigationProp<LibraryStackParamList, T>;
    route: RouteProp<LibraryStackParamList, T>;
};
