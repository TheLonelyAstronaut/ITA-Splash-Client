import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import { BoldText, RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const WidgetWrapper = styled.View`
    width: ${DEVICE_SIZE.width}px;
    height: ${(props) => props.theme.widgetHeight}px;
    background-color: ${(props) => props.theme.colors.main};
`;

export const TrackControl = styled.View`
    width: ${DEVICE_SIZE.width}px;
    height: ${(props) => props.theme.widgetHeight - props.theme.separator.borderWidth}px;
    background-color: ${(props) => props.theme.colors.main};
    border-bottom-width: ${(props) => props.theme.separator.borderWidth};
    flex-direction: row;
`;

export const ArtistText = styled(RegularText)`
    font-size: ${(props) => props.theme.fontSize.extraSmall}px;
    font-weight: 600;
    margin-top: 2px;
    opacity: 0.6;
`;

export const TitleText = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.small}px;
    font-weight: 700;
`;

export const PlayButton = styled.TouchableOpacity`
    align-self: center;
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

export const TrackInfoWrapper = styled(Pressable)`
    width: ${(props) => DEVICE_SIZE.width - props.theme.widget.iconSize - props.theme.widgetHeight}px;
    height: 100%;
    padding-horizontal: ${(props) => props.theme.spacer * 2}px;
    justify-content: center;
`;

export const ProgressLineWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    height: ${(props) => props.theme.widget.progressHeight}px;
    position: absolute;
    margin-top: -${(props) => props.theme.widget.progressHeight}px;
    width: ${DEVICE_SIZE.width};
`;

export const ProgressLine = styled.View<{ width: number }>`
    background-color: ${(props) => props.theme.colors.secondary};
    width: ${(props) => props.width}px;
    height: 100%;
`;
