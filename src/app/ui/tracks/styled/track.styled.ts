import styled from 'styled-components/native';

import { RegularText } from '../../styled/text.styled';

export const TrackContainer = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

export type Props = {
    isPlaying: boolean;
};

export const TrackInfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 1.6};
`;

export const TrackName = styled(RegularText)<Props>`
    color: ${(props) => (props.isPlaying ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    font-size: ${(props) => props.theme.fontSize.medium};
`;

export const TrackArtist = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall};
`;

export const Plus = styled.TouchableOpacity``;

export const Icons = styled.View`
    margin-right: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 2};
    flex-direction: row;
`;

export const Liked = styled.Image`
    width: 13px;
    height: 13px;
    margin-top: 4px;
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

export const LikeWrapper = styled.TouchableOpacity``;
