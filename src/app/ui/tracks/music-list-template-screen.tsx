import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
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
    ArtistWrapper,
    EmptyPlaylistWrapper,
    IconWrapper,
    InfoWrapper,
    EmptyText,
    PlayButtonWrapper,
    BackButtonWrapper,
} from './music-list-header.component';
import { TrackComponent } from './track.component';
import I18n from '../../utils/i18n';
import { LibraryElementType } from '../../library/library.types';
import Animated, { Extrapolate, useValue } from 'react-native-reanimated';
import { CombinedPlaylistImage } from './combined-image-component';
import Icon from 'react-native-vector-icons/Fontisto';
import { AnimatedHeaderWrapper } from '../../music-stack/components/artist.component';
import { getCurrentQueue } from '../../player/selectors';

export type MusicListTemplateScreenProps = {
    data: Album | Playlist;
    type?: LibraryElementType;
};

export const Wrapper = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
`;

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const EmptyPlaylistComponent = () => {
    return (
        <Wrapper>
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
    const currentQueue = useSelector(getCurrentQueue);

    const handleTrackPlay = useCallback(
        (item: Track) => {
            dispatch(
                MUSIC_ACTIONS.PLAY.TRIGGER({
                    track: item,
                    queue: props.data.tracks,
                    currentQueue: currentQueue,
                } as PlayActionTriggerPayload)
            );
        },
        [currentQueue, dispatch, props.data.tracks]
    );

    const headerOpacity = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight - theme.statusBar],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const imageHeight = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight / 2],
        outputRange: [1, 0.5],
    });

    const playerButtonTranslateY = scrollValue.interpolate({
        inputRange: [-10, 0, 320 - theme.statusBar + 100],
        outputRange: [
            380 - theme.playButtonSize / 3,
            370 - theme.playButtonSize / 3,
            theme.statusBar - theme.playButtonSize / 2,
        ],
        extrapolateRight: Extrapolate.CLAMP,
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
        dispatch(
            MUSIC_ACTIONS.PLAY.TRIGGER({
                track: props.data.tracks[0],
                queue: props.data.tracks,
                currentQueue: currentQueue,
            })
        );
    }, [currentQueue, dispatch, props.data.tracks]);

    const HeaderComponent = () => {
        return (
            <>
                <AnimatedHeaderWrapper style={{ opacity: headerOpacity, backgroundColor: theme.colors.main }}>
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
                        height: 225,
                        position: 'absolute',
                        resizeMode: 'cover',
                        paddingTop: 45,
                        transform: [{ scale: imageHeight }],
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
                {props.data.tracks.length > 0 ? (
                    <AnimatedFlatList
                        data={props.data.tracks}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id + ''}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollValue } } }])}
                        ListHeaderComponent={() => (
                            <InfoWrapper>
                                {isAlbum ? (
                                    <>
                                        <AnimatedPlaylistName>{props.data.name}</AnimatedPlaylistName>
                                        <ArtistWrapper onPress={handlePress}>
                                            <AlbumArtist>{(props.data as Album).artistName}</AlbumArtist>
                                        </ArtistWrapper>
                                        <AlbumYear>{'Album ' + (props.data as Album).year}</AlbumYear>
                                    </>
                                ) : (
                                    <AnimatedPlaylistName style={{ paddingBottom: 20, paddingTop: 10 }}>
                                        {props.data.name}
                                    </AnimatedPlaylistName>
                                )}
                            </InfoWrapper>
                        )}
                        renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                        contentContainerStyle={{
                            paddingBottom: theme.widgetHeight + theme.spacer,
                            backgroundColor: theme.colors.screenBackground,
                            marginTop: 320,
                        }}
                    />
                ) : (
                    <EmptyPlaylistComponent />
                )}
                <HeaderComponent />
                {props.data.tracks.length > 0 ? (
                    <PlayButtonWrapper onPress={handlePlay}>
                        <AnimatedPlayButton
                            style={{
                                transform: [{ translateY: playerButtonTranslateY }],
                            }}
                            source={require('../../../assets/play-button-color.png')}
                        />
                    </PlayButtonWrapper>
                ) : null}
            </AnimatedGradientTransition>
        </Container>
    );
};
