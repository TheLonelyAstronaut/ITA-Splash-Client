import React from 'react';

export class NavigationContainer extends React.Component {
    static mockGetRootState = jest.fn();

    getRootState = NavigationContainer.mockGetRootState;

    render() {
        return <>{this.props.children}</>;
    }
}

export const DefaultTheme = () => {
    return { dark: false, colors: { background: '' } };
};

export const useNavigation = jest.fn();

export const StackActions = jest.requireActual('@react-navigation/native').StackActions;
export const CommonActions = jest.requireActual('@react-navigation/native').CommonActions;
