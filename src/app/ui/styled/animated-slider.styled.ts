import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { SizeProp } from '../animated-slider.component';

export const SliderWrapper = styled(Animated.View)<SizeProp>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.colors.sliderColor};
    border-radius: ${(props) => (props.height > 5 ? props.height / 2 : 0)}px;
    overflow: visible;
    justify-content: center;
`;

export const PlayedStateWrapper = styled(SliderWrapper)<SizeProp>`
    width: 0px;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.colors.secondary};
`;

export const GestureHandlerWrapper = styled(Animated.View)<SizeProp>`
    width: ${(props) => props.height * 2}px;
    height: ${(props) => props.height * 2}px;
    border-radius: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.colors.secondary};
    margin-left: ${(props) => props.height / -2}px;
    position: absolute;
`;
