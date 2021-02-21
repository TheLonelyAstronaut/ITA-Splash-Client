import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type SearchStackParamList = {
    SearchScreen: undefined;
    SearchMusicStack: undefined;
};

export type SearchNavigationProps<T extends keyof SearchStackParamList> = {
    navigation: StackNavigationProp<SearchStackParamList, T>;
    route: RouteProp<SearchStackParamList, T>;
};
