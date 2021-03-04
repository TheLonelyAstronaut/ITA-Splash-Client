import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Animated, { useValue, Extrapolate } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { Album, Artist, Track } from '../../../types/music';
import { MUSIC_ACTIONS, PlayActionTriggerPayload } from '../../player/actions';
import { Container } from '../../ui/styled/container.styled';
import { PopularTrackComponent } from '../../ui/tracks/popular-track.component';
import I18n from '../../utils/i18n';
import { FOLLOW_OR_UNFOLLOW } from '../actions';

import { AlbumComponent } from './album.component';
import { ArtistBackButton } from './artist-back-button.component';
import { SimilarArtistComponent } from './similar-artist.component';
import {
    Albums,
    AlbumsWrapper,
    AnimatedArtistName,
    AnimatedHeaderWrapper,
    AnimatedMinifiedArtistName,
    AnimatedPlayButton,
    ArtistsWrapper,
    BackButtonWrapper,
    DataWrapper,
    DiscographyButton,
    DiscographyText,
    FollowButton,
    FollowText,
    PlayButtonWrapper,
    Popular,
    PoularTracksWrapper,
    Separator,
    SimilarArtists,
} from './styled/artist.styled';

export type ArtistProps = {
    data: Artist;
};

export const ArtistComponent: React.FC<ArtistProps> = (props: ArtistProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();
    const scrollValue = useValue(0);

    const handleTrackPlay = useCallback(
        (item: Track) => {
            dispatch(
                MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: props.data.popularTracks } as PlayActionTriggerPayload)
            );
        },
        [dispatch, props.data.popularTracks]
    );

    const handlePlayPopular = useCallback(() => {
        handleTrackPlay((props.data.popularTracks as Track[])[0]);
    }, [handleTrackPlay, props.data.popularTracks]);

    const handleFollowOrUnfollow = useCallback(() => {
        dispatch(FOLLOW_OR_UNFOLLOW(props.data.id));
    }, [dispatch, props.data.id]);

    const handleDiscographyPress = useCallback(() => {
        navigation.navigate('AlbumsScreen', {
            albums: props.data.albums as Album[],
        });
    }, [navigation, props.data.albums]);

    const imageHeight = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight / 2],
        outputRange: [theme.coverHeight, theme.coverHeight / 2],
    });

    const artistOpacity = scrollValue.interpolate({
        inputRange: [-theme.coverHeight / 4, 0, theme.coverHeight / 2],
        outputRange: [0, 1, 0.4],
    });

    const headerOpacity = scrollValue.interpolate({
        inputRange: [0, theme.coverHeight - theme.statusBar - 10],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const playerButtonTranslateY = scrollValue.interpolate({
        inputRange: [-10, 0, theme.coverHeight - theme.statusBar - 10],
        outputRange: [
            theme.coverHeight - theme.playButtonSize / 2 - 10,
            theme.coverHeight - theme.playButtonSize / 2 - 20,
            theme.statusBar - theme.playButtonSize / 2,
        ],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const HeaderComponent = useCallback(() => {
        return (
            <>
                <AnimatedHeaderWrapper style={{ opacity: headerOpacity }}>
                    <AnimatedMinifiedArtistName>{props.data.name}</AnimatedMinifiedArtistName>
                </AnimatedHeaderWrapper>
                <BackButtonWrapper>
                    <ArtistBackButton onPress={() => navigation.goBack()} />
                </BackButtonWrapper>
            </>
        );
    }, [headerOpacity, navigation, props.data.name]);

    return (
        <Container>
            <Animated.Image
                source={{ uri: props.data.image }}
                style={{ width: theme.coverWidth, height: imageHeight, position: 'absolute', resizeMode: 'cover' }}
            />
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingBottom: theme.widgetHeight,
                    paddingTop: theme.coverHeight - theme.fontSize.extraLarge - 40,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollValue } } }])}
            >
                <AnimatedArtistName style={{ opacity: artistOpacity }}>{props.data.name}</AnimatedArtistName>
                <DataWrapper>
                    <PoularTracksWrapper>
                        <FollowButton followed={props.data.isFollowed} onPress={handleFollowOrUnfollow}>
                            {props.data.isFollowed ? (
                                <FollowText>Unfollow</FollowText>
                            ) : (
                                <FollowText>Follow</FollowText>
                            )}
                        </FollowButton>
                        <Popular>{I18n.t('artist.popularTracks')}</Popular>
                        <FlatList
                            data={props.data.popularTracks}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => (
                                <PopularTrackComponent index={index} track={item} onPress={handleTrackPlay} />
                            )}
                        />
                    </PoularTracksWrapper>
                    <AlbumsWrapper>
                        <Albums>{I18n.t('artist.popularReleases')}</Albums>
                        <FlatList data={props.data.albums} renderItem={({ item }) => <AlbumComponent data={item} />} />
                    </AlbumsWrapper>
                    <DiscographyButton onPress={handleDiscographyPress}>
                        <DiscographyText>{I18n.t('artist.discography')}</DiscographyText>
                    </DiscographyButton>
                    <SimilarArtists>{I18n.t('artist.similarArtists')}</SimilarArtists>
                    <ArtistsWrapper>
                        <FlatList
                            data={props.data.similarArtists}
                            renderItem={({ item }) => <SimilarArtistComponent artist={item} />}
                            horizontal={true}
                            ItemSeparatorComponent={Separator}
                            contentContainerStyle={{ marginLeft: theme.spacer * 3 }}
                        />
                    </ArtistsWrapper>
                </DataWrapper>
            </Animated.ScrollView>
            <HeaderComponent />
            <PlayButtonWrapper onPress={handlePlayPopular}>
                <AnimatedPlayButton
                    style={{
                        transform: [{ translateY: playerButtonTranslateY }],
                    }}
                    source={require('../../../assets/play-button-color.png')}
                />
            </PlayButtonWrapper>
        </Container>
    );
};
