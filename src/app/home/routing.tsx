import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { albums } from '../../mocks/albums';
import { playlist } from '../../mocks/playlists';
import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';
import { AlbumScreenComponent } from '../music-data/screens/album-screen';
import { MusicListTemplateScreen } from '../music-data/screens/music-list-template-screen';

import { HomeParamList } from './routing.params';
import { HomeScreenComponent } from './screens/home-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStackComponent: React.FC = () => {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'HomePlaylistScreen'}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreenComponent} />
            <Stack.Screen
                name={'HomePlaylistScreen'}
                component={MusicListTemplateScreen}
                initialParams={{ data: playlist[0] }}
            />
            <Stack.Screen name={'HomeMusicianScreen'} component={MusicianScreenComponent} />
            <Stack.Screen name={'HomeAlbumsScreen'} component={AlbumsScreenComponent} />
            <Stack.Screen
                name={'HomeAlbumScreen'}
                component={AlbumScreenComponent}
                initialParams={{ data: albums[0] }}
            />
        </Stack.Navigator>
    );
};
