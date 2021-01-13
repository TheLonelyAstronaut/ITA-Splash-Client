import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { SearchScreenComponent } from './screens/search-screen.component';

const Stack = createStackNavigator();

export const SearchStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={SearchScreenComponent} />
        </Stack.Navigator>
    );
};
