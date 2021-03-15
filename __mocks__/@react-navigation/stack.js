import React from 'react';

export const MockNavigator = ({ children }) => <>{children}</>;
export const MockScreen = ({ name, component, options }) => null;

export const createStackNavigator = () => ({
    Navigator: MockNavigator,
    Screen: MockScreen,
});

export const HeaderBackButton = () => null;

export const HeaderTitle = () => null;

export const useHeaderHeight = jest.fn();

export const CardStyleInterpolators = {
    forVerticalIOS: jest.fn(),
    forFadeFromBottomAndroid: jest.fn(),
};
