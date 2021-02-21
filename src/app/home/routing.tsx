import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { albums } from '../../mocks/albums';
import { playlist } from '../../mocks/playlists';
import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';
import { AlbumScreenComponent } from '../music-data/screens/album-screen';
import { MusicListTemplateScreen } from '../music-data/screens/music-list-template-screen';

import { HomeParamList } from './routing.params';
import { HomeScreenComponent } from './screens/home-screen.component';
import { PasswordChangeScreenComponent } from './screens/password-change-screen.component';
import { SettingsScreenComponent } from './screens/settings-screen.component';
import { ThemeChangeScreenComponent } from './screens/theme-change-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStackComponent: React.FC = () => {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'HomePlaylistScreen'}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreenComponent} />
            <Stack.Screen name={'SettingsScreen'} component={SettingsScreenComponent} />
            <Stack.Screen name={'ThemeChangeScreen'} component={ThemeChangeScreenComponent} />
            <Stack.Screen name={'PasswordChangeScreen'} component={PasswordChangeScreenComponent} />
        </Stack.Navigator>
    );
};
