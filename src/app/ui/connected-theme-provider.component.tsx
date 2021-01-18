import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { themesCollection } from './themes';

import { getTheme } from './selectors';

type Props = {
    children: ReactNode;
};

export const ConnectedThemeProvider: React.FC<Props> = (props: Props) => {
    const theme = useSelector(getTheme);
    return <ThemeProvider theme={themesCollection[theme]!}>{props.children}</ThemeProvider>;
};
