import styled from 'styled-components/native';

import { Image } from '../../ui/image.component';
import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';

export const PlaylistContainer = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width};
    height: ${DEVICE_SIZE.height * 0.09};
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    flex-direction: row;
`;

export const PlaylistImage = styled(Image)`
    width: 90px;
    height: 90px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
`;

export const PlaylistIconWrapper = styled.View`
    width: 90px;
    height: 90px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
    background-color: ${(props) => props.theme.colors.main};
    padding: 18px;
`;

export const PlaylistIcon = styled.View`
    align-self: center;
`;

export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
`;

export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 3};
`;

export const TracksAmount = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
`;

export const CombinedImageContainer = styled.View`
    width: 90px;
    height: 90px;
    background-color: white;
    margin-left: ${(props) => props.theme.spacer * 3}px;
`;

export const CombinedImage = styled(Image)`
    width: 45px;
    height: 45px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
`;
