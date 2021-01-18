import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components/native';

import { getTheme } from './selectors';
import { themesCollection } from './themes';

type Props = {
    children: ReactNode;
};

export const ConnectedThemeProvider: React.FC<Props> = (props: Props) => {
    const theme = useSelector(getTheme);
    return <ThemeProvider theme={themesCollection[theme] as DefaultTheme}>{props.children}</ThemeProvider>;
};
