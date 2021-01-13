import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LibraryScreen } from './screens/library-screen.component';

const Stack = createStackNavigator();

export const LibraryStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Library" component={LibraryScreen} />
        </Stack.Navigator>
    );
};
