import AnimatedTabBar from '@gorhom/animated-tabbar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import Animated, { useValue, Extrapolate } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { State, usePlaybackState } from 'react-native-track-player';
import styled, { useTheme } from 'styled-components/native';

import { SwipeableSheet } from '../../player/components/swipeable-sheet.component';
import { generateTabsPreset } from '../../utils/generate-tabs-preset';
import { DEVICE_SIZE } from '../themes/themes';

export const TabBarWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.main};
`;

export const AnimatableTabBarWrapper = Animated.createAnimatedComponent(TabBarWrapper);

export const TabBarSafeWrapper = styled.SafeAreaView``;

export const SheetWrapper = styled.View`
    position: absolute;
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
`;

const states: State[] = [State.None, State.Stopped, State.Ready] as State[];

export const CustomTabBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
    const currentTheme = useTheme();
    const animatableValue = useValue(0);
    const currentState = usePlaybackState();
    const safeArea = useSafeAreaInsets();
    const themedTabs = React.useMemo(() => generateTabsPreset(currentTheme), [currentTheme]);
    const isPlayerVisible = React.useMemo(() => states.indexOf(currentState) == -1, [currentState]);

    const translateY = animatableValue.interpolate({
        inputRange: [currentTheme.tabBarHeight * 2 + safeArea.bottom, DEVICE_SIZE.height],
        outputRange: [0, currentTheme.tabBarHeight + safeArea.bottom],
        extrapolate: Extrapolate.CLAMP,
    });

    const tabBarStyle = React.useMemo(
        () => ({
            backgroundColor: currentTheme.colors.main,
            height: currentTheme.tabBarHeight,
        }),
        [currentTheme]
    );

    return (
        <React.Fragment>
            {isPlayerVisible && (
                <SheetWrapper pointerEvents={'box-none'}>
                    <SwipeableSheet
                        paddingBottom={currentTheme.tabBarHeight + currentTheme.widgetHeight + safeArea.bottom}
                        animatableValue={animatableValue}
                    />
                </SheetWrapper>
            )}
            <AnimatableTabBarWrapper
                style={{
                    transform: [{ translateY: translateY }],
                }}
            >
                <TabBarSafeWrapper>
                    <AnimatedTabBar preset={'flashy'} tabs={themedTabs} style={tabBarStyle} {...props} />
                </TabBarSafeWrapper>
            </AnimatableTabBarWrapper>
        </React.Fragment>
    );
};
