import { DefaultTheme } from 'styled-components/native';

const darkTheme: DefaultTheme = {
    colors: {
        main: 'black',
        secondary: 'white',
        additive: '#2962ff',
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
        main: 'white',
        secondary: 'black',
        additive: '#2962ff',
    },
};

export { darkTheme, lightTheme };
