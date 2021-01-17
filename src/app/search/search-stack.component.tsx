import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MusicDataStack } from './music-data/music-data-stack.component';
import { SearchScreenComponent } from './screens/search-screen.component';
import { SearchStackParamList } from './search-stack-param-list';

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchScreen" component={SearchScreenComponent} />
            <Stack.Screen name="SearchResultScreen" component={SearchScreenComponent} />
            <Stack.Screen name="SearchMusicDataScreen" component={MusicDataStack} />
        </Stack.Navigator>
    );
};
