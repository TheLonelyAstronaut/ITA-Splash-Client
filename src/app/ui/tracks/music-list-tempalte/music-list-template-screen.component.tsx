import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Animated, { Extrapolate, useValue } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { Album, Playlist, Track } from '../../../../types/music';
import { AnimatedHeaderWrapper } from '../../../music-stack/components/styled/artist.styled';
import { MUSIC_ACTIONS, PlayActionTriggerPayload } from '../../../player/actions';
import { getCurrentQueue } from '../../../player/selectors';
import { BackButton } from '../../back-button.component';
import { Container } from '../../styled/container.styled';
import { CombinedPlaylistImage } from '../combined-image.component';
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
    PlayButtonWrapper,
    BackButtonWrapper,
    HeaderWrapper,
} from '../styled/music-list-header.styled';
import { AnimatedFlatList, EmptyPlaylistComponent } from '../styled/music-list-temlate-screen.styled';
import { TrackComponent } from '../track.component';
import I18n from '../../../utils/i18n';

export type MusicListTemplateScreenProps = {
    data: Album | Playlist;
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
        inputRange: [0, 225 - theme.statusBar],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const imageHeight = scrollValue.interpolate({
        inputRange: [-500, 0, theme.coverHeight / 2],
        outputRange: [1.5, 1, 0.5],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const imagePadding = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight / 2],
        outputRange: [60, 240],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const playerButtonTranslateY = scrollValue.interpolate({
        inputRange: [0, 330 - theme.statusBar + theme.playButtonSize / 2],
        outputRange: [360 - theme.playButtonSize / 2, theme.statusBar - theme.playButtonSize / 2],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const handlePress = useCallback(() => {
        navigation.navigate({
            name: 'ArtistScreen',
            key: `ArtistScreen_${(props.data as Album).artistId}_${Math.random().toString()}`,
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

    const handleBackPress = useCallback(
        () => (isAlbum ? navigation.goBack() : navigation.navigate('PlaylistsScreen')),
        [isAlbum, navigation]
    );

    const HeaderComponent = useCallback(
        () => (
            <>
                <AnimatedHeaderWrapper style={{ opacity: headerOpacity, backgroundColor: theme.colors.main }}>
                    <AnimatedPlaylistName>{props.data.name}</AnimatedPlaylistName>
                </AnimatedHeaderWrapper>
                <BackButtonWrapper pointerEvents={'box-none'}>
                    <BackButton onPress={handleBackPress} />
                </BackButtonWrapper>
            </>
        ),
        [handleBackPress, headerOpacity, props.data.name, theme.colors.main]
    );

    return (
        <Container>
            <AnimatedFlatList
                data={props.data.tracks}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyPlaylistComponent}
                keyExtractor={(item) => item.id + ''}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollValue } } }])}
                ListHeaderComponent={() => (
                    <HeaderWrapper>
                        <AnimatedImage
                            style={{
                                width: 225,
                                height: 225,
                                position: 'absolute',
                                resizeMode: 'cover',
                                transform: [{ scale: imageHeight }, { translateY: imagePadding }],
                            }}
                        >
                            {isAlbum ? (
                                <AlbumImage source={{ uri: (props.data as Album).image }} />
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
                        <InfoWrapper>
                            {isAlbum ? (
                                <>
                                    <AnimatedPlaylistName>{props.data.name}</AnimatedPlaylistName>
                                    <ArtistWrapper onPress={handlePress}>
                                        <AlbumArtist>{(props.data as Album).artistName}</AlbumArtist>
                                    </ArtistWrapper>
                                    <AlbumYear>{I18n.t('additional.album') + (props.data as Album).year}</AlbumYear>
                                </>
                            ) : (
                                <AnimatedPlaylistName style={{ paddingBottom: 20, paddingTop: 10 }}>
                                    {props.data.name}
                                </AnimatedPlaylistName>
                            )}
                        </InfoWrapper>
                    </HeaderWrapper>
                )}
                renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                contentContainerStyle={{
                    paddingBottom: theme.widgetHeight + theme.spacer,
                    backgroundColor: theme.colors.screenBackground,
                }}
            />
            <HeaderComponent />
            {props.data.tracks.length > 0 ? (
                <PlayButtonWrapper onPress={handlePlay}>
                    <AnimatedPlayButton
                        style={{
                            transform: [{ translateY: playerButtonTranslateY }],
                        }}
                        source={require('../../../../assets/play-button-color.png')}
                    />
                </PlayButtonWrapper>
            ) : null}
        </Container>
    );
};
