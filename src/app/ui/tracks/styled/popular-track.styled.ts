import styled from 'styled-components/native';

import { Image } from '../../image.component';
import { RegularText } from '../../styled/text.styled';

export const TrackContainer = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin-top: 5px;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
`;

export type Props = {
    isPlaying: boolean;
};

export const TrackInfoWrapper = styled.View`
    justify-content: flex-start;
    flex-direction: row;
`;

export const TrackName = styled(RegularText)<Props>`
    color: ${(props) => (props.isPlaying ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    font-size: ${(props) => props.theme.fontSize.medium};
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const Icons = styled.View`
    margin-right: ${(props) => props.theme.spacer};
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
    flex-direction: row;
`;

export const TrackImage = styled(Image)`
    height: 45px;
    width: 45px;
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const Index = styled(RegularText)`
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
`;
