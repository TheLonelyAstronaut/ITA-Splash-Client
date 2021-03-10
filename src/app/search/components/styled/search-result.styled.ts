import styled from 'styled-components/native';

import { Image } from '../../../ui/image.component';
import { RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const Container = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width}px;
    height: ${(props) => props.theme.searchItem.height}px;
    margin-bottom: ${(props) => props.theme.spacer}px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
`;

export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 1.5}px;
    margin-top: ${(props) => props.theme.spacer * 1.5}px;
`;

export const TrackName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-bottom: ${(props) => props.theme.spacer / 2}px;
`;

export const ArtistText = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall}px;
`;

export const TrackImage = styled(Image)`
    width: ${(props) => props.theme.searchItem.searchImage}px;
    height: ${(props) => props.theme.searchItem.searchImage}px;
    margin-left: ${(props) => props.theme.spacer * 5}px;
`;

export const ArtistImage = styled(Image)`
    width: ${(props) => props.theme.searchItem.searchImage}px;
    height: ${(props) => props.theme.searchItem.searchImage}px;
    border-radius: 100px;
    margin-left: ${(props) => props.theme.spacer * 5}px;
`;
