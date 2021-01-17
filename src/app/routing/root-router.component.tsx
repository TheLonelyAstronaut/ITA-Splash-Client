import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from '../authentication/routing';

import { MainStackComponent } from './main-stack.component';

export const RootRouterComponent: React.FC = () => {
    const user = 'user';
    return <NavigationContainer>{user ? <MainStackComponent /> : <AuthStack />}</NavigationContainer>;
};
