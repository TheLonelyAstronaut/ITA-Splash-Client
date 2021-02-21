import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type MusicDataParamList = {
    Albums: undefined;
    Artist: undefined;
};

export type MusicDataNavigationProps<T extends keyof MusicDataParamList> = {
    navigation: StackNavigationProp<MusicDataParamList, T>;
    route: RouteProp<MusicDataParamList, T>;
};
