import AnimatedTabBar from '@gorhom/animated-tabbar';
import React from 'react';
import { useSelector } from 'react-redux';

import { generateTabsPreset } from '../../utils/generate-tabs-preset';
import { getTheme } from '../selectors';
import { themesCollection } from '../themes';

export const CustomTabBar = (props: any) => {
    console.log(props);
    const currentTheme = useSelector(getTheme);
    const themedTabs = React.useMemo(() => generateTabsPreset(themesCollection[currentTheme]), [currentTheme]);
    return <AnimatedTabBar preset="flashy" tabs={themedTabs} {...props} />;
};
