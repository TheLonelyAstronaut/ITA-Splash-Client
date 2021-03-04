import styled from 'styled-components/native';

import { Image } from '../../../ui/image.component';
import { RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export type WidthProps = {
    width?: boolean;
};

export const PlaylistContainer = styled.TouchableOpacity<WidthProps>`
    width: ${(props) => (props.width ? DEVICE_SIZE.width : DEVICE_SIZE.width * 0.8)};
    height: ${DEVICE_SIZE.height * 0.09};
    margin-bottom: ${(props) => props.theme.spacer * 5}px;
    flex-direction: row;
`;

export const PlaylistImage = styled(Image)`
    width: 100px;
    height: 100px;
`;

export const PlaylistIconWrapper = styled.View`
    width: 100px;
    height: 100px;
    background-color: #1e1e1e;
    padding: 18px;
`;

export const PlaylistIcon = styled.View`
    align-self: center;
    margin-top: 5px;
`;

export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    margin-top: 5px;
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
    width: 100px;
    height: 100px;
    background-color: white;
`;

export const CombinedImage = styled(Image)`
    width: 50px;
    height: 50px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
`;
