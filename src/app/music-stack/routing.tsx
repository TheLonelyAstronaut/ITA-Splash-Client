import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MusicStackParamsList } from './routing.params';
import { AlbumScreenComponent } from './screens/album-screen.component';
import { AlbumsScreenComponent } from './screens/albums-screen.component';
import { ArtistScreenComponent } from './screens/artist-screen.component';

const Stack = createStackNavigator<MusicStackParamsList>();

export const MusicStackComponent: React.FC = () => {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name={'ArtistScreen'} component={ArtistScreenComponent} />
            <Stack.Screen name={'AlbumsScreen'} component={AlbumsScreenComponent} />
            <Stack.Screen name={'AlbumScreen'} component={AlbumScreenComponent} />
        </Stack.Navigator>
    );
};
