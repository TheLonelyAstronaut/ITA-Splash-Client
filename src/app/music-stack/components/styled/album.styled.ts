import styled from 'styled-components/native';

import { Image } from '../../../ui/image.component';
import { BoldText, RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const AlbumWrapper = styled.TouchableOpacity`
    margin-top: ${(props) => props.theme.spacer * 2}px;
    width: ${DEVICE_SIZE.width}px;
    height: ${DEVICE_SIZE.height * 0.08}px;
    background-color: ${(props) => props.theme.colors.screenBackground};
    flex-direction: row;
`;

export const AlbumImage = styled(Image)`
    height: ${DEVICE_SIZE.height * 0.08}px;
    width: ${DEVICE_SIZE.height * 0.08}px;
    margin-left: ${(props) => props.theme.spacer * 4}px;
`;

export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export const AlbumName = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-bottom: ${(props) => props.theme.spacer * 0.5}px;
    font-size: ${(props) => props.theme.fontSize.large}px;
`;

export const AlbumYear = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small}px;
`;
