import styled from 'styled-components/native';

import { Image } from '../../../ui/image.component';
import { BoldText } from '../../../ui/styled/text.styled';

export const Wrapper = styled.TouchableOpacity`
    padding-vertical: ${(props) => props.theme.spacer * 3}px;
    width: 120px;
`;

export const ArtistImage = styled(Image)`
    border-radius: 60px;
    height: 120px;
    width: 120px;
`;

export const ArtistName = styled(BoldText)`
    text-align: center;
    padding-top: ${(props) => props.theme.spacer}px;
`;
