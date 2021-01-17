import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';

import { LibraryStackParamList } from './routing.params';
import { FavoritesScreen } from './screens/favorites-screen.component';
import { LibraryScreen } from './screens/library-screen.component';

const Stack = createStackNavigator<LibraryStackParamList>();

export const LibraryStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'PlaylistsScreen'} component={LibraryScreen} />
            <Stack.Screen name={'FavoritesScreen'} component={FavoritesScreen} />
            <Stack.Screen name={'LibraryPlaylistScreen'} component={PlaylistScreenComponent} />
            <Stack.Screen name={'LibraryMusicianScreen'} component={MusicianScreenComponent} />
            <Stack.Screen name={'LibraryAlbumsScreen'} component={AlbumsScreenComponent} />
        </Stack.Navigator>
    );
};
