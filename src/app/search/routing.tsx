import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MusicStackComponent } from '../music-stack/routing';

import { SearchStackParamList } from './routing.params';
import { SearchScreenComponent } from './screens/search-screen.component';

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'SearchScreen'} component={SearchScreenComponent} />
            <Stack.Screen name={'SearchMusicStack'} component={MusicStackComponent} />
        </Stack.Navigator>
    );
};
