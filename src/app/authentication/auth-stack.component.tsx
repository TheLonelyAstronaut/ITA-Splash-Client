import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from './login-screen.component';
import { RegisterScreen } from './register-screen.component';
import { VerificationScreen } from './sms-verification-screen.component';

const Stack = createStackNavigator();

export const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
        </Stack.Navigator>
    );
};
