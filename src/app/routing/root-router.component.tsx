import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';

import { AuthStack } from '../authentication/routing';

import { MainStackComponent } from './main-stack.component';
import { getIsLoggedIn } from '../authentication/selectors';

export const RootRouterComponent: React.FC = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    return <NavigationContainer>{isLoggedIn ? <MainStackComponent /> : <AuthStack />}</NavigationContainer>;
};
