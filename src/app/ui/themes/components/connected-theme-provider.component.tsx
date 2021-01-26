import React, { ReactNode } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components/native';

import { getTheme } from '../selectors';
import { themesCollection, ThemesEnum } from '../themes';

type Props = {
    children: ReactNode;
};

export const ConnectedThemeProvider: React.FC<Props> = (props: Props) => {
    const theme = useSelector(getTheme);

    const barStyle = React.useMemo(() => {
        if (theme === ThemesEnum.DARK) return 'light-content';
        else return 'dark-content';
    }, [theme]);

    return (
        <ThemeProvider theme={themesCollection[theme] as DefaultTheme}>
            <StatusBar barStyle={barStyle} />
            {props.children}
        </ThemeProvider>
    );
};
