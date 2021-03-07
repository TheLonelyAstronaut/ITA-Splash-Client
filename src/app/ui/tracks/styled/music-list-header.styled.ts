import Animated from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

import { Album, Playlist } from '../../../../types/music';
import { LibraryElementType } from '../../../library/library.types';
import { BoldText, RegularText } from '../../styled/text.styled';
import { DEVICE_SIZE } from '../../themes/themes';

export const AlbumImage = styled.Image`
    margin-top: ${(props) => props.theme.spacer * 3}px;
    width: 225px;
    height: 225px;
`;

export const PlaylistImage = Animated.createAnimatedComponent(AlbumImage);

export const PlayButton = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: white;
`;

export const LikeButton = styled.Image`
    width: 25px;
    height: 25px;
    margin-left: ${(props) => props.theme.spacer * 1.6}px;
    margin-right: ${(props) => props.theme.spacer * 10}px;
`;

export const ImageWrapper = styled.View`
    align-self: center;
`;

export const HeaderWrapper = styled.View`
    margin-top: 320px;
`;

export const TextWrapper = styled.View`
    padding-right: 80px;
`;

export const InfoWrapper = styled.View`
    margin-top: ${(props) => props.theme.spacer * 2}px;
    align-self: center;
    background-color: ${(props) => props.theme.colors.screenBackground};
    width: ${DEVICE_SIZE.width}px;
`;

export const AlbumName = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large}px;
    align-self: center;
`;

export const ArtistWrapper = styled.TouchableOpacity`
    opacity: 1;
`;

export const AlbumArtist = styled(BoldText)`
    align-self: center;
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small}px;
    margin-top: ${(props) => props.theme.spacer * 0.5}px;
`;

export const AlbumYear = styled(RegularText)`
    align-self: center;
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall}px;
    margin-top: ${(props) => props.theme.spacer * 0.5}px;
`;

export const EmptyPlaylistWrapper = styled.View`
    width: 225px;
    height: 225px;
    background-color: #1e1e1e;
    margin-top: ${(props) => props.theme.spacer * 3}px;
`;

export const IconWrapper = styled.View`
    align-self: center;
    margin-top: 50px;
`;

export const EmptyText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    align-self: center;
    margin-top: ${DEVICE_SIZE.height * 0.2}px;
`;

export const PlayButtonWrapper = styled.TouchableOpacity`
    position: absolute;
    right: ${(props) => props.theme.spacer * 4}px;
`;

export const BackButtonWrapper = styled.View`
    position: absolute;
    margin-top: ${getStatusBarHeight()}px;
`;

export const Wrapper = styled.View``;

export const AnimatedPlaylistName = Animated.createAnimatedComponent(AlbumName);
export const AnimatedImage = Animated.createAnimatedComponent(ImageWrapper);

export const AnimatedPlayButton = Animated.createAnimatedComponent(PlayButton);
export const AnimatedText = Animated.createAnimatedComponent(TextWrapper);
export const AnimatedWrapper = Animated.createAnimatedComponent(InfoWrapper);

export type MusicListHeaderProps = {
    data: Album | Playlist;
    type?: LibraryElementType;
};
