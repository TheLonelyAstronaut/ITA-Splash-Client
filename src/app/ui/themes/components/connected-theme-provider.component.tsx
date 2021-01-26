import React, { ReactNode } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components/native';

import { getTheme } from '../selectors';
import { darkTheme, lightTheme, themesCollection, ThemesEnum } from '../themes';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

type Props = {
    children: ReactNode;
};

export const ConnectedThemeProvider: React.FC<Props> = (props: Props) => {
    const theme = useSelector(getTheme);

    const barStyle = React.useMemo(() => {
        if (theme === ThemesEnum.DARK) {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(darkTheme.colors.screenBackground, true);
                changeNavigationBarColor(darkTheme.colors.main, false, true);
            }

            return 'light-content';
        } else {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(lightTheme.colors.screenBackground, true);
                changeNavigationBarColor(lightTheme.colors.main, true, true);
            }

            return 'dark-content';
        }
    }, [theme]);

    return (
        <ThemeProvider theme={themesCollection[theme] as DefaultTheme}>
            <StatusBar barStyle={barStyle} />
            {props.children}
        </ThemeProvider>
    );
};
