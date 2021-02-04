import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MainStackParams } from '../main-stack.params';

import AppTabs from './app-tabs.component';

const Stack = createStackNavigator<MainStackParams>();

export const MainStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'AppTabs'} component={AppTabs} />
        </Stack.Navigator>
    );
};
