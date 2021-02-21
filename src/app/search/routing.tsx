import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';

import { SearchStackParamList } from './routing.params';
import { SearchScreenComponent } from './screens/search-screen.component';

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'SearchScreen'} component={SearchScreenComponent} />
            <Stack.Screen name={'SearchPlaylistScreen'} component={PlaylistScreenComponent} />
            <Stack.Screen name={'SearchMusicianScreen'} component={MusicianScreenComponent} />
            <Stack.Screen name={'SearchAlbumsScreen'} component={AlbumsScreenComponent} />
        </Stack.Navigator>
    );
};
