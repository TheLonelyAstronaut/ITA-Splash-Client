import { DefaultTheme } from 'styled-components/native';

import { ThemesEnum } from './theme.state';

const darkTheme: DefaultTheme = {
    colors: {
        main: '#1e272e',
        secondary: '#d2dae2',
        additive: '#2962ff',
        screenBackground: '#222f3e',
    },
    fontSize: {
        large: 48,
        medium: 18,
        small: 16,
        extraSmall: 12,
    },
    spacer: 8,
    fontWeight: {
        bold: 800,
        normal: 400,
        thin: 200,
    },
    borderRadius: {
        large: 50,
        medium: 20,
        small: 10,
    },
};

const lightTheme: DefaultTheme = {
    fontSize: {
        large: 48,
        medium: 18,
        small: 16,
        extraSmall: 12,
    },
    spacer: 8,
    fontWeight: {
        bold: 800,
        normal: 400,
        thin: 200,
    },
    borderRadius: {
        large: 50,
        medium: 20,
        small: 10,
    },
    colors: {
        main: '#d2dae2',
        secondary: '#1e272e',
        additive: '#2962ff',
        screenBackground: '#f1f2f6',
    },
};

const themesCollection: Partial<Record<ThemesEnum, DefaultTheme>> = {
    [ThemesEnum.LIGHT]: lightTheme,
    [ThemesEnum.DARK]: darkTheme,
};

export { darkTheme, lightTheme, themesCollection, ThemesEnum };
