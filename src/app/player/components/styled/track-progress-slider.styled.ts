import Slider from '@react-native-community/slider';
import styled from 'styled-components/native';

import { RegularText } from '../../../ui/styled/text.styled';

export const TrackProgress = styled(Slider)`
    height: ${(props) => props.theme.sliderHeight}px;
`;

export const TimerView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const Timer = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.extraSmall}px;
    opacity: 0.6;
    font-weight: 700;
`;

export const TrackSliderWrapper = styled.View<{ disableMargin?: boolean }>`
    margin-vertical: ${(props) => (props.disableMargin ? 0 : props.theme.spacer * 2)}px;
`;
