import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from '../authentication/auth-stack.component';

import { HomeMainStackComponent } from './home-main-stack.component';

export const RoutesComponent: React.FC = () => {
    const user = AsyncStorage.getItem('user');
    // const user =' '
    return <NavigationContainer>{!user ? <HomeMainStackComponent /> : <AuthStack />}</NavigationContainer>;
};
