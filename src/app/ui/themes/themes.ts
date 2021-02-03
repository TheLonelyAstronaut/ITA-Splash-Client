import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DefaultTheme } from 'styled-components/native';

import { ThemesEnum } from './theme';

export const DEVICE_SIZE = Dimensions.get('window');

const defaultValues: DefaultTheme = {
    fontSize: {
        extraLarge: 24,
        large: 18,
        medium: 16,
        small: 14,
        extraSmall: 12,
    },
    fontFamily: {
        regular: Platform.OS === 'ios' ? 'Playfair Display Regular' : 'PlayfairDisplay-Regular',
        medium: Platform.OS === 'ios' ? 'Playfair Display Medium' : 'PlayfairDisplay-Medium',
        bold: Platform.OS === 'ios' ? 'Playfair Display Bold' : 'PlayfairDisplay-Bold',
        extraBold: Platform.OS === 'ios' ? 'Playfair Display ExtraBold' : 'PlayfairDisplay-ExtraBold',
        black: Platform.OS === 'ios' ? 'Playfair Display Black' : 'PlayfairDisplay-Black',
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
        progressHeight: 2,
    },
} as DefaultTheme;

const darkTheme: DefaultTheme = {
    ...defaultValues,
    colors: {
        main: '#1E1E1E',
        secondary: '#d2dae2',
        additive: '#2962ff',
        screenBackground: '#000000',
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

const japaneseDarkTheme: DefaultTheme = {
    ...defaultValues,
    fontFamily: {
        regular: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        medium: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        bold: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        extraBold: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
        black: Platform.OS === 'ios' ? 'Electroharmonix' : 'electroharmonix',
    },
    colors: {
        main: '#1E1E1E',
        secondary: '#d2dae2',
        additive: '#2962ff',
        screenBackground: '#000000',
        sliderColor: '#757b80',
    },
};

const themesCollection: Partial<Record<ThemesEnum, DefaultTheme>> = {
    [ThemesEnum.LIGHT]: lightTheme,
    [ThemesEnum.DARK]: darkTheme,
    [ThemesEnum.JAPANESE]: japaneseDarkTheme,
};

export { darkTheme, lightTheme, japaneseDarkTheme, themesCollection, ThemesEnum };
