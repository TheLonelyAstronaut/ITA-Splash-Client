import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { darkTheme, DEVICE_SIZE } from '../themes/themes';

export const SplashScreenWrapper = styled.View`
    width: ${DEVICE_SIZE.width}px;
    height: ${DEVICE_SIZE.height}px;
    background-color: ${darkTheme.colors.screenBackground};
    position: absolute;
    justify-content: center;
    align-items: center;
`;

export const AnimatedSplashScreenWrapper = Animated.createAnimatedComponent(SplashScreenWrapper);
