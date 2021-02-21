import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LibraryStackParamList } from './routing.params';
import { LibraryScreen } from './screens/library-screen.component';
import { PlaylistScreenComponent } from './screens/playlist-screen.component';

const Stack = createStackNavigator<LibraryStackParamList>();

export const LibraryStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'PlaylistsScreen'} component={LibraryScreen} />
            <Stack.Screen name={'PlaylistScreen'} component={PlaylistScreenComponent} />
        </Stack.Navigator>
    );
};
