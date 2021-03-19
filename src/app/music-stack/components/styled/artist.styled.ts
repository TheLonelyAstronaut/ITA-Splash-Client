import Animated from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

import { BoldText, RegularText } from '../../../ui/styled/text.styled';
import { DEVICE_SIZE } from '../../../ui/themes/themes';

export const Header = styled.SafeAreaView`
    padding-vertical: ${(props) => props.theme.spacer}px;
    position: absolute;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${(props) => props.theme.colors.main};
    height: ${(props) => props.theme.statusBar}px;
`;

export const AnimatedHeaderWrapper = Animated.createAnimatedComponent(Header);

export const ArtistName = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge + 15}px;
    margin-left: ${(props) => props.theme.spacer * 2}px;
    color: white;
`;

export const MinifiedArtistName = styled(BoldText)`
    align-self: center;
`;

export const AnimatedArtistName = Animated.createAnimatedComponent(ArtistName);

export const AnimatedMinifiedArtistName = Animated.createAnimatedComponent(MinifiedArtistName);

export const ArtistImage = styled.Image`
    width: ${(props) => props.theme.coverWidth}px;
    height: ${(props) => props.theme.coverHeight}px;
    position: absolute;
`;

export const BackButtonWrapper = styled.View`
    position: absolute;
    left: 0;
    top: ${(props) => props.theme.spacer * 2 + getStatusBarHeight()}px;
`;

export const PlayButton = styled.Image`
    background-color: white;
    height: ${(props) => props.theme.playButtonSize}px;
    width: ${(props) => props.theme.playButtonSize}px;
    border-radius: ${(props) => props.theme.playButtonSize / 2}px;
`;

export const PlayButtonWrapper = styled.TouchableOpacity`
    position: absolute;
    right: ${(props) => props.theme.spacer * 4}px;
`;

export const AnimatedPlayButton = Animated.createAnimatedComponent(PlayButton);

export const Popular = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large}px;
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
    margin-bottom: ${(props) => props.theme.spacer * 2}px;
`;

export const Albums = styled(BoldText)`
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export const SimilarArtists = styled(BoldText)`
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export const DiscographyButton = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.additivePink};
    width: ${DEVICE_SIZE.width * 0.38}px;
    border-radius: 50px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 2}px;
    padding: ${(props) => props.theme.spacer / 2}px;
`;

export const DiscographyText = styled(RegularText)`
    align-self: center;
`;

export const PoularTracksWrapper = styled.View``;

export const AlbumsWrapper = styled.View``;

export const ArtistsWrapper = styled.View``;

export const Separator = styled.View`
    padding: ${(props) => props.theme.spacer * 1.5}px;
`;

export type FollowButtonProp = {
    followed: boolean;
};

export const FollowButton = styled.TouchableOpacity<FollowButtonProp>`
    width: 100px;
    height: 40px;
    border-color: ${(props) => (props.followed ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    border-width: 1px;
    border-radius: 10px;
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 2}px;
`;

export const FollowText = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    align-self: center;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const DataWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
`;
