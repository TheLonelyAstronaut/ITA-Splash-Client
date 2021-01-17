import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LibraryStackParamList } from './library-stack-param-list';
import { FavoritesScreen } from './screens/favorites-screen.component';
import { LibraryScreen } from './screens/library-screen.component';

const Stack = createStackNavigator<LibraryStackParamList>();

export const LibraryStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlaylistsScreen" component={LibraryScreen} />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        </Stack.Navigator>
    );
};
