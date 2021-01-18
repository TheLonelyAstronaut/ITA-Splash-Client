import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../styles/selectors';

type Props = {
    children: ReactNode;
};

export const ConnectedThemeProvider: React.FC<Props> = (props: Props) => {
    const theme = useSelector(getTheme);
    console.log(theme);
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
