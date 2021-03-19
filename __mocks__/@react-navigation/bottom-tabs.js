import React from 'react';

export const MockNavigator = ({ children }) => <>{children}</>;
export const MockScreen = ({ name, component }) => null;

export const createBottomTabNavigator = () => ({
    Navigator: MockNavigator,
    Screen: MockScreen,
});
