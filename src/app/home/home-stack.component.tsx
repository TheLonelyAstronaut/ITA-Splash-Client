import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeParamList } from './home-stack-param-list';
import { MusicDataStack } from './music-data/music-data-stack.component';
import { HomeScreenComponent } from './screens/home-screen.component';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={HomeScreenComponent} />
            <Stack.Screen name="MusicData" component={MusicDataStack} />
        </Stack.Navigator>
    );
};
