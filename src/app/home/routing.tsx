import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { albums } from '../../mocks/albums';
import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';
import { AlbumScreenComponent } from '../music-data/screens/album.component';

import { HomeParamList } from './routing.params';
import { HomeScreenComponent } from './screens/home-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStackComponent: React.FC = () => {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreenComponent} />
            <Stack.Screen name={'HomePlaylistScreen'} component={PlaylistScreenComponent} />
            <Stack.Screen name={'HomeMusicianScreen'} component={MusicianScreenComponent} />
            <Stack.Screen name={'HomeAlbumsScreen'} component={AlbumsScreenComponent} />
            <Stack.Screen
                name={'HomeAlbumScreen'}
                component={AlbumScreenComponent}
                initialParams={{ album: albums[0] }}
            />
        </Stack.Navigator>
    );
};
