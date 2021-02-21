import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { PlaylistScreenComponent, MusicianScreenComponent, AlbumsScreenComponent } from '../music-data';

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
            <Stack.Screen name={'SettingsScreen'} component={SettingsScreenComponent} />
            <Stack.Screen name={'ThemeChangeScreen'} component={ThemeChangeScreenComponent} />
            <Stack.Screen name={'PasswordChangeScreen'} component={PasswordChangeScreenComponent} />
        </Stack.Navigator>
    );
};
