import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppTabs } from '../tabs.component';

const Stack = createStackNavigator();

export const HomeStackComponent: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tab" component={AppTabs} />
        </Stack.Navigator>
    );
};
