import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MusicDataParamList } from './music-data-param-list';
import { AlbumsScreenComponent } from './screens/albums-screen.component';
import { MusicianScreenComponent } from './screens/musician-screen.component';
import { PlaylistScreenComponent } from './screens/playlist-screen';

const Stack = createStackNavigator<MusicDataParamList>();

export const MusicDataStack: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MusicianScreen" component={MusicianScreenComponent} />
            <Stack.Screen name="AlbumsScreen" component={AlbumsScreenComponent} />
            <Stack.Screen name="PlaylistScreen" component={PlaylistScreenComponent} />
        </Stack.Navigator>
    );
};
