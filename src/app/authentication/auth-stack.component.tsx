import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AuthParamList } from './auth-param-list.component';
import LoginScreen from './screens/login-screen.component';
import { RegisterScreen } from './screens/register-screen.component';
import { VerificationScreen } from './screens/sms-verification-screen.component';

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
        </Stack.Navigator>
    );
};
