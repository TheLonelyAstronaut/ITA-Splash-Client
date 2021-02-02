import React, { useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Animated, { Easing, useValue } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Image } from './image.component';
import { getTheme } from './themes/selectors';
import { darkTheme, DEVICE_SIZE, themesCollection, ThemesEnum } from './themes/themes';

export const SplashScreenWrapper = styled.View`
    width: ${DEVICE_SIZE.width}px;
    height: ${DEVICE_SIZE.height}px;
    background-color: ${darkTheme.colors.screenBackground};
    position: absolute;
    justify-content: center;
    align-items: center;
`;

export const AnimatedSplashScreenWrapper = Animated.createAnimatedComponent(SplashScreenWrapper);

const defaultColor = themesCollection[ThemesEnum.DARK]?.colors.screenBackground as string;
const lightThemeColor = themesCollection[ThemesEnum.LIGHT]?.colors.screenBackground as string;

export const SplashScreen: React.FC = () => {
    const currentTheme = useSelector(getTheme);
    const backgroundState = useValue(1);
    const opacity = useValue(1);
    const [isMounted, setIsMounted] = useState(true);

    const backgroundColor = Animated.interpolateColors(backgroundState, {
        inputRange: [0, 1],
        outputColorRange: [lightThemeColor, defaultColor],
    });

    const onLoadEnd = React.useCallback(() => {
        RNBootSplash.hide({ fade: true });

        const hideSplashScreen = () => {
            Animated.timing(opacity, {
                duration: 400,
                easing: Easing.ease,
                toValue: 0,
            }).start(() => {
                setIsMounted(false);
            });
        };

        if (currentTheme === ThemesEnum.LIGHT) {
            Animated.timing(backgroundState, {
                duration: 400,
                toValue: 0,
                easing: Easing.ease,
            }).start(hideSplashScreen);
        } else {
            hideSplashScreen();
        }
    }, [currentTheme, opacity, backgroundState]);

    return (
        <React.Fragment>
            {isMounted && (
                <AnimatedSplashScreenWrapper
                    style={{
                        backgroundColor,
                        opacity,
                    }}
                >
                    <Image
                        source={require('../../assets/logo.png')}
                        onLoadEnd={onLoadEnd}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                    />
                </AnimatedSplashScreenWrapper>
            )}
        </React.Fragment>
    );
};
