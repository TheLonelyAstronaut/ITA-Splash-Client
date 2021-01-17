import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeParamList } from './routing.params';
import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';
import { HomeScreenComponent } from './screens/home-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'HomeScreen'} component={HomeScreenComponent} />
            <Stack.Screen name={'HomePlaylistScreen'} component={PlaylistScreenComponent} />
            <Stack.Screen name={'HomeMusicianScreen'} component={MusicianScreenComponent} />
            <Stack.Screen name={'HomeAlbumsScreen'} component={AlbumsScreenComponent} />
        </Stack.Navigator>
    );
};
