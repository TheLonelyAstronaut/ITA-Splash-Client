import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

import { Album, Playlist } from '../../../types/music';
import { Image } from '../image.component';
import { BoldText, RegularText } from '../text.component';

import { useDispatch } from 'react-redux';
import { MUSIC_ACTIONS } from '../../player/actions';
import { ADD_TO_LIKED, LOAD_LIBRARY, REMOVE_FROM_LIKED } from '../../library/actions';
import { LibraryElementType } from '../../library/library.types';
import Animated, { Extrapolate, useValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components';

export const AlbumImage = styled.Image`
    margin-top: ${(props) => props.theme.spacer * 3};
    width: 225px;
    height: 225px;
`;

export const PlaylistImage = Animated.createAnimatedComponent(AlbumImage);

export const PlayButton = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: white;
    position: absolute;
    right: ${(props) => props.theme.spacer * 4}px;
`;

export const LikeButton = styled.Image`
    width: 25px;
    height: 25px;
    margin-left: ${(props) => props.theme.spacer * 1.6};
    margin-right: ${(props) => props.theme.spacer * 2.5};
`;

export const ImageWrapper = styled.View`
    align-self: center;
`;

export const HeaderWrapper = styled.View``;

export const TextWrapper = styled.View`
    padding-right: 80px;
`;

export const InfoWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    align-items: center;
    margin-top: ${(props) => props.theme.spacer * 4};
`;

export const AlbumName = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large};
    align-self: center;
`;

export const ArtistWrapper = styled.TouchableOpacity`
    opacity: 3;
`;

export const AlbumArtist = styled(BoldText)`
    align-self: center;
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: ${(props) => props.theme.spacer * 0.5};
`;

export const AlbumYear = styled(RegularText)`
    align-self: center;
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall};
    margin-top: ${(props) => props.theme.spacer * 0.5};
`;

export const EmptyPlaylistWrapper = styled.View`
    width: 225px;
    height: 225px;
    background-color: #1e1e1e;
    margin-top: ${(props) => props.theme.spacer * 3};
`;

export const IconWrapper = styled.View`
    align-self: center;
    margin-top: 50px;
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

export const MusicListHeader: React.FC<MusicListHeaderProps> = (props: MusicListHeaderProps) => {
    const isAlbum = (props.data as Album).year;
    const dispatch = useDispatch();
    const scrollValue = useValue(0);
    const theme = useTheme();

    const navigation = useNavigation();

    const handlePress = useCallback(() => {
        navigation.navigate({
            name: 'ArtistScreen',
            key: 'ArtistScreen_' + (props.data as Album).artistId + '_' + Math.random().toString(),
            params: {
                id: (props.data as Album).artistId,
            },
        });
    }, [props, navigation]);

    const playerButtonTranslateY = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight - theme.statusBar - 10],
        outputRange: [-25, theme.statusBar - theme.playButtonSize / 2],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const infoOpacity = scrollValue.interpolate({
        inputRange: [-80, 0, 160],
        outputRange: [0, 1, 0.4],
    });

    const handlePlay = useCallback(() => {
        dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: props.data.tracks[0], queue: props.data.tracks }));
    }, []);

    const handleLike = useCallback(() => {
        if (props.data.liked) {
            dispatch(REMOVE_FROM_LIKED.TRIGGER({ data: props.data }));
            dispatch(LOAD_LIBRARY.TRIGGER(1));
        } else {
            dispatch(ADD_TO_LIKED.TRIGGER({ data: props.data }));
            dispatch(LOAD_LIBRARY.TRIGGER(1));
        }
    }, [dispatch, props.data.liked, props.data]);

    return (
        <HeaderWrapper>
            {/*<InfoWrapper>*/}
            {/*    /!*<TouchableOpacity onPress={handleLike}>*!/*/}
            {/*    /!*    {props.data.liked ? (*!/*/}
            {/*    /!*        <LikeButton source={require('../../../assets/like-button-color.png')} />*!/*/}
            {/*    /!*    ) : (*!/*/}
            {/*    /!*        <LikeButton source={require('../../../assets/like-button-blank.png')} />*!/*/}
            {/*    /!*    )}*!/*/}
            {/*    /!*</TouchableOpacity>*!/*/}
            {/*    */}
            {/*    /!*<TouchableOpacity onPress={handlePlay}>*!/*/}
            {/*    /!*    <AnimatedPlayButton style={{*!/*/}
            {/*    /!*        transform: [{ translateY: playerButtonTranslateY }],*!/*/}
            {/*    /!*    }} source={require('../../../assets/play-button-color.png')} />*!/*/}
            {/*    /!*</TouchableOpacity>*!/*/}
            {/*</InfoWrapper>*/}
        </HeaderWrapper>
    );
};
