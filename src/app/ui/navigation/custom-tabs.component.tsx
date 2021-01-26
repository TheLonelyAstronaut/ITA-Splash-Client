import AnimatedTabBar from '@gorhom/animated-tabbar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import { useTheme } from 'styled-components/native';

import { generateTabsPreset } from '../../utils/generate-tabs-preset';

export const CustomTabBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
    const currentTheme = useTheme();

    const themedTabs = React.useMemo(() => generateTabsPreset(currentTheme), [currentTheme]);

    const tabBarStyle = React.useMemo(
        () => ({
            backgroundColor: currentTheme.colors.main,
        }),
        [currentTheme]
    );

    return <AnimatedTabBar preset={'flashy'} tabs={themedTabs} style={tabBarStyle} {...props} />;
};
