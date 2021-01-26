import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AppTabs from './app-tabs.component';
import { MainStackParams } from './main-stack.params';
import { Player } from '../player/components/player.component';

const Stack = createStackNavigator<MainStackParams>();

export const MainStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Player'} component={Player} />
            <Stack.Screen name={'AppTabs'} component={AppTabs} />
        </Stack.Navigator>
    );
};
