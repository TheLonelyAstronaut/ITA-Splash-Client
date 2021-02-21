import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { AuthStack } from '../../authentication/routing';
import { getAccessToken } from '../../authentication/selectors';
import { getTheme } from '../../ui/themes/selectors';
import { ThemesEnum } from '../../ui/themes/theme.types';

import { MainStackComponent } from './main-stack.component';

const AppStack = createStackNavigator();

export const RootRouterComponent: React.FC = () => {
    const isLoggedIn = useSelector(getAccessToken);
    const currentTheme = useTheme();
    const currentThemeEnum = useSelector(getTheme);

    return (
        <NavigationContainer
            theme={{
                dark: currentThemeEnum === ThemesEnum.DARK,
                colors: {
                    primary: currentTheme.colors.main,
                    background: currentTheme.colors.main,
                    card: currentTheme.colors.main,
                    text: currentTheme.colors.main,
                    border: currentTheme.colors.main,
                    notification: currentTheme.colors.main,
                },
            }}
        >
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
