import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaylistScreenComponent } from '../library/screens/playlist-screen.component';
import { MusicStackComponent } from '../music-stack/routing';

import { HomeParamList } from './routing.params';
import { HomeScreenComponent } from './screens/home-screen.component';
import { PasswordChangeScreenComponent } from './screens/password-change-screen.component';
import { SettingsScreenComponent } from './screens/settings-screen.component';
import { ThemeChangeScreenComponent } from './screens/theme-change-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStackComponent: React.FC = () => {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreenComponent} />
            <Stack.Screen name={'HomeMusicStack'} component={MusicStackComponent} />
            <Stack.Screen name={'SettingsScreen'} component={SettingsScreenComponent} />
            <Stack.Screen name={'ThemeChangeScreen'} component={ThemeChangeScreenComponent} />
            <Stack.Screen name={'PasswordChangeScreen'} component={PasswordChangeScreenComponent} />
            <Stack.Screen name={'PlaylistScreen'} component={PlaylistScreenComponent} />
        </Stack.Navigator>
    );
};
