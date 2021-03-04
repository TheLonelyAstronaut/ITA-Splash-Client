import { Animated as RNAnimated } from 'react-native';
import styled from 'styled-components/native';

import { DEVICE_SIZE } from '../../themes/themes';

export const TabBarWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.main};
`;

export const AnimatableTabBarWrapper = RNAnimated.createAnimatedComponent(TabBarWrapper);

export const TabBarSafeWrapper = styled.SafeAreaView``;

export const SheetWrapper = styled.View`
    position: absolute;
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
`;
