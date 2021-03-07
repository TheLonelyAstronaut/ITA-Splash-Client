import styled from 'styled-components/native';

import { Image } from '../../../ui/image.component';
import { RegularText } from '../../../ui/styled/text.styled';

export const Wrapper = styled.TouchableOpacity`
    width: 100px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
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
    font-size: ${(props) => props.theme.fontSize.small}px;
    margin-top: ${(props) => props.theme.spacer}px;
`;
