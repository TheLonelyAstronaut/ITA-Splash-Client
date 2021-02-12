import { Dimensions, Platform } from 'react-native';
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
    },
    fontFamily: {
        regular: Platform.OS === 'ios' ? 'Playfair Display Regular' : 'PlayfairDisplay-Regular',
        medium: Platform.OS === 'ios' ? 'Playfair Display Medium' : 'PlayfairDisplay-Medium',
        bold: Platform.OS === 'ios' ? 'Playfair Display Bold' : 'PlayfairDisplay-Bold',
        extraBold: Platform.OS === 'ios' ? 'Playfair Display ExtraBold' : 'PlayfairDisplay-ExtraBold',
        black: Platform.OS === 'ios' ? 'Playfair Display Black' : 'PlayfairDisplay-Black',
    },
    logoFont: 'PressStart2P-Regular',
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
    searchItem: {
        height: 60,
        searchImage: 60,
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
        placeholderColor: '#C4C4C4',
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
        placeholderColor: '#878787',
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
        placeholderColor: '#C4C4C4',
    },
};

const themesCollection: Partial<Record<ThemesEnum, DefaultTheme>> = {
    [ThemesEnum.LIGHT]: lightTheme,
    [ThemesEnum.DARK]: darkTheme,
    [ThemesEnum.JAPANESE]: japaneseDarkTheme,
};

export { darkTheme, lightTheme, japaneseDarkTheme, themesCollection, ThemesEnum };
