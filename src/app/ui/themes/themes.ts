import { Dimensions, Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DefaultTheme } from 'styled-components/native';

import { ThemesEnum } from './theme.types';

export const DEVICE_SIZE = Dimensions.get('window');

const defaultValues: DefaultTheme = {
    fontSize: {
        extraLarge: 24,
        large: 18,
        medium: 16,
        small: 14,
        extraSmall: 12,
        welcome: 36,
    },
    fontFamily: {
        regular: 'system font',
        medium: 'system font',
        bold: 'system font',
        extraBold: 'system font',
        black: 'system font',
    },
    logoFont: 'PressStart2P-Regular',
    spacer: 8,
    sliderHeight: 60,
    separator: {
        borderWidth: StyleSheet.hairlineWidth,
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
        artworkMarginTop:
            (DEVICE_SIZE.height * 0.57 - DEVICE_SIZE.width * 0.85) / 2 +
            DEVICE_SIZE.height * 0.04 +
            getStatusBarHeight(),
        artworkSize: DEVICE_SIZE.width * 0.85,
        headerHeight: DEVICE_SIZE.height * 0.08,
        marginHorizontal: DEVICE_SIZE.width * 0.075,
        marginVertical: DEVICE_SIZE.height * 0.01,
        controlPlayPauseSize: 70,
        controlPrevNextSize: 35,
        playerControlHeight: DEVICE_SIZE.height * 0.35,
    },
    widget: {
        iconSize: 26,
        progressHeight: 2,
    },
} as DefaultTheme;

const darkTheme: DefaultTheme = {
    ...defaultValues,
    colors: {
        main: '#1E1E1E',
        secondary: '#fff',
        additivePink: '#FF4BF8',
        additiveBlue: '#2B63FF',
        screenBackground: '#000000',
        sliderColor: '#757b80',
        inputBackground: '#343434',
        contrast: '#ff073a',
    },
};

const lightTheme: DefaultTheme = {
    ...defaultValues,
    colors: {
        main: '#fff',
        secondary: '#1e272e',
        additivePink: '#FF4BF8',
        additiveBlue: '#2B63FF',
        screenBackground: '#f1f2f6',
        sliderColor: '#6f7982',
        inputBackground: '#E5E5E5',
        contrast: '#ff073a',
    },
};

const japaneseDarkTheme: DefaultTheme = {
    ...defaultValues,
    fontFamily: {
        regular: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        medium: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        bold: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        extraBold: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        black: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
    },
    logoFont: Platform.OS === 'ios' ? 'Press Start 2P' : 'PressStart2P-Regular',
    colors: {
        main: '#1E1E1E',
        secondary: '#fff',
        additivePink: '#FF4BF8',
        additiveBlue: '#2B63FF',
        screenBackground: '#000000',
        sliderColor: '#757b80',
        inputBackground: '#343434',
        contrast: '#ff073a',
    },
};

const themesCollection: Partial<Record<ThemesEnum, DefaultTheme>> = {
    [ThemesEnum.LIGHT]: lightTheme,
    [ThemesEnum.DARK]: darkTheme,
    [ThemesEnum.JAPANESE]: japaneseDarkTheme,
};

export { darkTheme, lightTheme, japaneseDarkTheme, themesCollection, ThemesEnum };
