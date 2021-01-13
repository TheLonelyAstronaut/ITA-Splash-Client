import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from './authentication/auth-stack.component';
import { AppTabs } from './tabs.component';
import { HomeStackComponent } from './home/home-stack.component';

export const RoutesComponent: React.FC = () => {
    const user = 'user';
    return <NavigationContainer>{!user ? <HomeStackComponent /> : <AuthStack />}</NavigationContainer>;
};
