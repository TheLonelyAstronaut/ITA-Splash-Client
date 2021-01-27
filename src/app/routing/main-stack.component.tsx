import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Player } from '../player/components/player.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppTabs from './app-tabs.component';
import { MainStackParams } from './main-stack.params';

const Stack = createStackNavigator<MainStackParams>();

export const MainStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                //<Stack.Screen name={'AppTabs'} component={AppTabs} />
            }
            <Stack.Screen name={'AppTabs'} component={Player} />
        </Stack.Navigator>
    );
};
