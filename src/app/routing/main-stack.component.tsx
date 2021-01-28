import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AppTabs from './app-tabs.component';
import { MainStackParams } from './main-stack.params';

const Stack = createStackNavigator<MainStackParams>();

export const MainStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'AppTabs'} component={AppTabs} />
        </Stack.Navigator>
    );
};
