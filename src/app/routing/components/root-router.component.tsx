import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { AuthStack } from '../../authentication/routing';
import { getUsername } from '../../authentication/selectors';

import { MainStackComponent } from './main-stack.component';

const AppStack = createStackNavigator();

export const RootRouterComponent: React.FC = () => {
    const isLoggedIn = useSelector(getUsername);
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode={'none'} mode={'modal'}>
                {isLoggedIn ? (
                    <AppStack.Screen component={MainStackComponent} name={'MainModule'} />
                ) : (
                    <AppStack.Screen component={AuthStack} name={'AuthModule'} />
                )}
            </AppStack.Navigator>
        </NavigationContainer>
    );
};
