import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

import { Container } from '../../../ui/styled/container.styled';
import { BoldText, RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const TRACK_SLIDER_WIDTH = DEVICE_SIZE.width * 0.85;
export const TRACK_SLIDER_HEIGHT = 8;

export const InfoWrapper = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    position: absolute;
    flex: 1;
`;

export const HeaderWrapper = styled.View`
    height: ${(props) => props.theme.player.headerHeight}px;
    margin-top: ${getStatusBarHeight()}px;
    align-items: center;
    justify-content: center;
`;

export const GestureProvider = styled.View`
    flex: 2;
`;

export const PlayerControlWrapper = styled.View`
    height: ${(props) => props.theme.player.playerControlHeight}px;
    padding-horizontal: ${(props) => props.theme.player.marginHorizontal}px;
    margin-vertical: ${(props) => props.theme.player.marginVertical}px;
`;

export const HeaderText = styled(RegularText)`
    font-size: ${(props) => props.theme.fontSize.small - 1}px;
    font-weight: 700;
`;

export const TrackName = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge}px;
`;

export const ArtistName = styled(RegularText)`
    line-height: 24px;
    font-size: ${(props) => props.theme.fontSize.medium - 1}px;
    opacity: 0.6;
    font-weight: 700;
`;

export const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: ${(props) => props.theme.player.marginVertical * 3}px;
`;

export const AvoidingBackground = styled(Container)`
    background-color: ${(props) => props.theme.colors.main};
`;

export const ChevronButtonWrapper = styled.TouchableOpacity`
    position: absolute;
    left: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 8.5 + 2};
    width: 25px;
    height: 25px;
    background-color: rgba(52, 52, 52, 0.7);
    border-radius: 20px;
`;
