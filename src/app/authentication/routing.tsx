import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Player } from '../player/components/player.component';

import { AuthParamList } from './routing.params';
import LoginScreen from './screens/login-screen.component';
import { RegisterScreen } from './screens/register-screen.component';
import { VerificationScreen } from './screens/sms-verification-screen.component';

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Player">
            <Stack.Screen name={'Login'} component={LoginScreen} />
            <Stack.Screen name={'Register'} component={RegisterScreen} />
            <Stack.Screen name={'Verification'} component={VerificationScreen} />
            <Stack.Screen name={'Player'} component={Player} />
        </Stack.Navigator>
    );
};
