import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DefaultTheme } from 'styled-components/native';

import { ThemesEnum } from './theme.state';

export const DEVICE_SIZE = Dimensions.get('window');

const defaultValues: DefaultTheme = {
    fontSize: {
        extraLarge: 24,
        large: 18,
        medium: 16,
        small: 14,
        extraSmall: 12,
    },
    spacer: 8,
    sliderHeight: 60,
    separator: {
        borderWidth: 1,
        borderColor: 'black',
    },
    tabBarHeight: 68,
    widgetHeight: 55,
    fontWeight: {
        bold: 800,
        standard: 600,
        normal: 400,
        thin: 200,
    },
    borderRadius: {
        large: 50,
        medium: 20,
        small: 10,
    },
    player: {
        artworkMarginTop: DEVICE_SIZE.height * 0.08 + getStatusBarHeight(),
        artworkSize: DEVICE_SIZE.width * 0.85,
        headerHeight: DEVICE_SIZE.height * 0.08,
        marginHorizontal: DEVICE_SIZE.width * 0.075,
        marginVertical: DEVICE_SIZE.height * 0.01,
        controlPlayPauseSize: 70,
        controlPrevNextSize: 35,
    },
    widget: {
        iconSize: 26,
    },
} as DefaultTheme;

const darkTheme: DefaultTheme = {
    ...defaultValues,
    colors: {
        main: '#1e272e',
        secondary: '#d2dae2',
        additive: '#2962ff',
        screenBackground: '#222f3e',
        sliderColor: '#757b80',
    },
};

const lightTheme: DefaultTheme = {
    ...defaultValues,
    colors: {
        main: '#d2dae2',
        secondary: '#1e272e',
        additive: '#2962ff',
        screenBackground: '#f1f2f6',
        sliderColor: '#6f7982',
    },
};

const themesCollection: Partial<Record<ThemesEnum, DefaultTheme>> = {
    [ThemesEnum.LIGHT]: lightTheme,
    [ThemesEnum.DARK]: darkTheme,
};

export { darkTheme, lightTheme, themesCollection, ThemesEnum };
