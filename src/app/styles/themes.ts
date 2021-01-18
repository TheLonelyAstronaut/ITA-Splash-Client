import { DefaultTheme } from 'styled-components/native';

const darkTheme: DefaultTheme = {
    borderRadius: '5px',

    colors: {
        main: 'black',
        secondary: 'white',
    },
};

const lightTheme: DefaultTheme = {
    borderRadius: '5px',

    colors: {
        main: 'white',
        secondary: 'black',
    },
};

export { darkTheme, lightTheme };
