import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from '../authentication/auth-stack.component';

import { HomeMainStackComponent } from './home-main-stack.component';
import { AppTabs } from './tabs.component';

export const RoutesComponent: React.FC = () => {
    const user = 'user';
    return <NavigationContainer>{!user ? <HomeMainStackComponent /> : <AuthStack />}</NavigationContainer>;
};
