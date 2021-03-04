import { Animated as RNAnimated } from 'react-native';
import styled from 'styled-components/native';

import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const SheetWrapper = styled.View``;

export const AnimatedPlayerWrapper = RNAnimated.createAnimatedComponent(styled.View`
    background-color: transparent;
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
`);

export const AnimatedWidgetWrapper = RNAnimated.createAnimatedComponent(styled.View`
    height: ${(props) => props.theme.widgetHeight}px;
    position: absolute;
    width: ${DEVICE_SIZE.width}px;
`);
