import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { Album, Playlist, Track } from '../../../types/music';
import { MUSIC_ACTIONS, PlayActionTriggerPayload } from '../../player/actions';
import AnimatedGradientTransition from '../animated-gradient-transition.component';
import { BackButton } from '../back-button.component';
import { Container } from '../container.component';

import {
    AlbumArtist,
    AlbumImage,
    AlbumYear,
    AnimatedImage,
    AnimatedPlayButton,
    AnimatedPlaylistName,
    AnimatedText,
    ArtistWrapper,
    EmptyPlaylistWrapper,
    IconWrapper,
    InfoWrapper,
    LikeButton,
    MusicListHeader,
    PlayButton,
    AnimatedWrapper,
} from './music-list-header.component';
import { TrackComponent } from './track.component';
import { RegularText } from '../text.component';
import { DEVICE_SIZE } from '../themes/themes';
import I18n from '../../utils/i18n';
import { LibraryElementType } from '../../library/library.types';
import Animated, { Extrapolate, useValue } from 'react-native-reanimated';
import { CombinedPlaylistImage } from './combined-image-component';
import Icon from 'react-native-vector-icons/Fontisto';
import { AnimatedHeaderWrapper } from '../../music-stack/components/artist.component';
import { ADD_TO_LIKED, LOAD_LIBRARY, REMOVE_FROM_LIKED } from '../../library/actions';

export const BackButtonWrapper = styled.View`
    position: absolute;
    margin-top: ${getStatusBarHeight()};
`;

export type MusicListTemplateScreenProps = {
    data: Album | Playlist;
    type?: LibraryElementType;
};

export const Wrapper = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
`;

export const EmptyText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    align-self: center;
    margin-top: ${DEVICE_SIZE.height * 0.2};
`;
export const EmptyPlaylistComponent = (data: MusicListTemplateScreenProps) => {
    return (
        <Wrapper>
            <MusicListHeader data={data.data} />
            <EmptyText>{I18n.t('library.emptyPlaylist')}</EmptyText>
        </Wrapper>
    );
};

export const MusicListTemplateScreen: React.FC<MusicListTemplateScreenProps> = (
    props: MusicListTemplateScreenProps
) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigation = useNavigation();
    const isAlbum = (props.data as Album).year;
    const scrollValue = useValue(0);

    const handleTrackPlay = useCallback(
        (item: Track) => {
            dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: props.data.tracks } as PlayActionTriggerPayload));
        },
        [dispatch, props]
    );

    const headerOpacity = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight - theme.statusBar],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const HeaderComponent = () => {
        return (
            <>
                <AnimatedHeaderWrapper style={{ opacity: headerOpacity, backgroundColor: theme.colors.additiveBlue }}>
                    <AnimatedPlaylistName>{props.data.name}</AnimatedPlaylistName>
                </AnimatedHeaderWrapper>
                <BackButtonWrapper pointerEvents={'box-none'}>
                    <BackButton
                        onPress={useCallback(() => {
                            {
                                isAlbum ? navigation.goBack() : navigation.navigate('PlaylistsScreen');
                            }
                        }, [isAlbum, navigation])}
                    />
                </BackButtonWrapper>
            </>
        );
    };

    const imageHeight = scrollValue.interpolate({
        inputRange: [0, 160],
        outputRange: [theme.coverHeight, theme.coverHeight / 2],
    });
    const infoOpacity = scrollValue.interpolate({
        inputRange: [-80, 0, 160],
        outputRange: [0, 1, 0.4],
    });

    const handlePress = useCallback(() => {
        navigation.navigate({
            name: 'ArtistScreen',
            key: 'ArtistScreen_' + (props.data as Album).artistId + '_' + Math.random().toString(),
            params: {
                id: (props.data as Album).artistId,
            },
        });
    }, [props, navigation]);

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

    const playerButtonTranslateY = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight - theme.statusBar - 10],
        outputRange: [-25, theme.statusBar - theme.playButtonSize / 2],
        extrapolateRight: Extrapolate.CLAMP,
    });

    return (
        <Container>
            <AnimatedGradientTransition
                colors={[
                    theme.colors.additiveBlue,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                ]}
            >
                <AnimatedImage
                    style={{
                        width: 225,
                        height: imageHeight,
                        position: 'absolute',
                        resizeMode: 'cover',
                        paddingTop: 45,
                    }}
                >
                    {isAlbum ? (
                        <AlbumImage source={{ uri: props.data.image }} />
                    ) : props.data.tracks.length > 0 ? (
                        <CombinedPlaylistImage data={props.data} />
                    ) : (
                        <EmptyPlaylistWrapper>
                            <IconWrapper>
                                <Icon name={'music-note'} size={120} color={'white'} />
                            </IconWrapper>
                        </EmptyPlaylistWrapper>
                    )}
                </AnimatedImage>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollValue } } }])}
                    contentContainerStyle={{
                        paddingTop: 320,
                    }}
                >
                    <AnimatedWrapper style={{ opacity: infoOpacity }}>
                        <TouchableOpacity onPress={handleLike}>
                            {props.data.liked ? (
                                <LikeButton source={require('../../../assets/like-button-color.png')} />
                            ) : (
                                <LikeButton source={require('../../../assets/like-button-blank.png')} />
                            )}
                        </TouchableOpacity>
                        <AnimatedText style={{ opacity: infoOpacity }}>
                            {isAlbum ? (
                                <>
                                    <AnimatedPlaylistName>{props.data.name}</AnimatedPlaylistName>
                                    <ArtistWrapper onPress={handlePress}>
                                        <AlbumArtist>{(props.data as Album).artistName}</AlbumArtist>
                                    </ArtistWrapper>
                                    <AlbumYear>{'Album ' + (props.data as Album).year}</AlbumYear>
                                </>
                            ) : (
                                <AnimatedPlaylistName>{props.data.name}</AnimatedPlaylistName>
                            )}
                        </AnimatedText>
                        <TouchableOpacity onPress={handlePlay}>
                            <AnimatedPlayButton
                                style={{
                                    transform: [{ translateY: playerButtonTranslateY }],
                                }}
                                source={require('../../../assets/play-button-color.png')}
                            />
                        </TouchableOpacity>
                    </AnimatedWrapper>
                    {props.data.tracks.length > 0 ? (
                        <FlatList
                            data={props.data.tracks}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id + ''}
                            renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                            contentContainerStyle={{
                                paddingBottom: theme.widgetHeight + theme.spacer,
                                backgroundColor: theme.colors.screenBackground,
                            }}
                            ListHeaderComponent={<MusicListHeader data={props.data} type={props.type} />}
                        />
                    ) : (
                        <EmptyPlaylistComponent data={props.data} />
                    )}
                </Animated.ScrollView>
                <HeaderComponent />
            </AnimatedGradientTransition>
        </Container>
    );
};
