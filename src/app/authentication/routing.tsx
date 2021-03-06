import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import { Player } from '../player/components/player.component';

import { AuthParamList } from './routing.params';
import LoginScreen from './screens/login-screen.component';
import { RegisterScreen } from './screens/register-screen.component';

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}
            initialRouteName={'Login'}
        >
            <Stack.Screen name={'Login'} component={LoginScreen} />
            <Stack.Screen name={'Register'} component={RegisterScreen} />
            <Stack.Screen name={'Player'} component={Player} />
        </Stack.Navigator>
    );
};
