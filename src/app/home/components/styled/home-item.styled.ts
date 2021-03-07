import styled from 'styled-components/native';

import { Image } from '../../../ui/image.component';
import { RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const Wrapper = styled.TouchableOpacity`
    width: 90px;
    margin-left: ${(props) => props.theme.spacer * 3};
`;

export const PlaylistImage = styled(Image)`
    height: 100px;
    width: 100px;
    align-self: center;
`;

export const ArtistImage = styled(PlaylistImage)`
    border-radius: 100px;
`;

export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: ${(props) => props.theme.spacer};
`;
