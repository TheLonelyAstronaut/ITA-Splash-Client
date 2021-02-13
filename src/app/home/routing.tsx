import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';

import { HomeParamList } from './routing.params';
import { HomeScreenComponent } from './screens/home-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStackComponent: React.FC = () => {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'HomeAlbumsScreen'}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreenComponent} />
            <Stack.Screen name={'HomePlaylistScreen'} component={PlaylistScreenComponent} />
            <Stack.Screen name={'HomeMusicianScreen'} component={MusicianScreenComponent} />
            <Stack.Screen name={'HomeAlbumsScreen'} component={AlbumsScreenComponent} />
        </Stack.Navigator>
    );
};
