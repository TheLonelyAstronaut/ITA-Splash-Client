import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MainStackParamList } from './main-stack-param-list';
import { AppTabs } from './tabs.component';

const Stack = createStackNavigator<MainStackParamList>();

export const HomeMainStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tab" component={AppTabs} />
        </Stack.Navigator>
    );
};
