import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Animated, { useValue, Extrapolate } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Artist, Track } from '../../../types/music';
import { MUSIC_ACTIONS, PlayActionPayload } from '../../player/actions';
import { ArtistBackButton } from '../../ui/artist-back-button.component';
import { Container } from '../../ui/container.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { PopularTrackComponent } from '../../ui/tracks/popular-track.compoennt';
import I18n from '../../utils/i18n';

import { AlbumComponent } from './album.component';
import { SimilarArtistComponent } from './similar-artist.component';

export const COVER_HEIGHT = DEVICE_SIZE.height * 0.4;
export const COVER_WIDTH = DEVICE_SIZE.width;
export const STATUS_BAR = getStatusBarHeight() + 64; //theme.spacer
export const PLAY_BUTTON_SIZE = 60;

export type ArtistProps = {
    data: Artist;
};

export const Header = styled.SafeAreaView`
    padding-vertical: ${(props) => props.theme.spacer}px;
    position: absolute;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${(props) => props.theme.colors.main}
    height: ${STATUS_BAR}px;
`;

export const AnimatedHeaderWrapper = Animated.createAnimatedComponent(Header);

export const ArtistName = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge + 15};
    margin-left: ${(props) => props.theme.spacer * 2};
    color: white;
`;

export const MinifiedArtistName = styled(BoldText)`
    align-self: center;
`;

export const AnimatedArtistName = Animated.createAnimatedComponent(ArtistName);

export const AnimatedMinifiedArtistName = Animated.createAnimatedComponent(MinifiedArtistName);

export const ArtistImage = styled.Image`
    width: ${COVER_WIDTH};
    height: ${COVER_HEIGHT};
    position: absolute;
`;

export const BackButtonWrapper = styled.View`
    position: absolute;
    left: 0;
    top: ${(props) => props.theme.spacer * 2 + getStatusBarHeight()};
`;

export const PlayButton = styled.Image`
    background-color: white;
    height: ${PLAY_BUTTON_SIZE}px;
    width: ${PLAY_BUTTON_SIZE}px;
    border-radius: ${PLAY_BUTTON_SIZE / 2}px;
`;

export const PlayButtonWrapper = styled.TouchableOpacity`
    position: absolute;
    right: ${(props) => props.theme.spacer * 4}px;
`;

export const AnimatedPlayButton = Animated.createAnimatedComponent(PlayButton);

export const Popular = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 4};
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export const Albums = styled(BoldText)`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 2};
`;

export const SimilarArtists = styled(BoldText)`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 2};
`;

export const DiscographyButton = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.additivePink};
    width: ${DEVICE_SIZE.width * 0.38};
    border-radius: 50px;
    align-self: center;
    margin-top: ${(props) => props.theme.spacer * 2};
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

export const DataWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.screenBackground};
`;

export const ArtistComponent: React.FC<ArtistProps> = (props: ArtistProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();
    const scrollValue = useValue(0);

    const imageHeight = scrollValue.interpolate({
        inputRange: [0, COVER_HEIGHT / 2],
        outputRange: [COVER_HEIGHT, COVER_HEIGHT / 2],
    });

    const artistOpacity = scrollValue.interpolate({
        inputRange: [-COVER_HEIGHT / 4, 0, COVER_HEIGHT / 2],
        outputRange: [0, 1, 0.4],
    });

    const headerOpacity = scrollValue.interpolate({
        inputRange: [0, COVER_HEIGHT - STATUS_BAR - 10],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const playerButtonTranslateY = scrollValue.interpolate({
        inputRange: [0, COVER_HEIGHT - STATUS_BAR - 10],
        outputRange: [COVER_HEIGHT - PLAY_BUTTON_SIZE / 2 - 20, STATUS_BAR - PLAY_BUTTON_SIZE / 2],
        extrapolateRight: Extrapolate.CLAMP,
    });

    const handleTrackPlay = useCallback(
        (item: Track) => {
            dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: props.data.popularTracks } as PlayActionPayload));
        },
        [dispatch, props.data.popularTracks]
    );

    const HeaderComponent = () => {
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
    };

    return (
        <Container>
            <Animated.Image
                source={{ uri: props.data.image }}
                style={{ width: COVER_WIDTH, height: imageHeight, position: 'absolute', resizeMode: 'cover' }}
            />
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingBottom: theme.widgetHeight,
                    paddingTop: COVER_HEIGHT - theme.fontSize.extraLarge - 40,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollValue } } }])}
            >
                <AnimatedArtistName style={{ opacity: artistOpacity }}>{props.data.name}</AnimatedArtistName>
                <DataWrapper>
                    <PoularTracksWrapper>
                        <FlatList
                            data={props.data.popularTracks}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => (
                                <PopularTrackComponent index={index} track={item} onPress={handleTrackPlay} />
                            )}
                            ListHeaderComponent={<Popular>{I18n.t('artist.popularTracks')}</Popular>}
                        />
                    </PoularTracksWrapper>
                    <AlbumsWrapper>
                        <Albums>{I18n.t('artist.popularReleases')}</Albums>
                        <FlatList data={props.data.albums} renderItem={({ item }) => <AlbumComponent data={item} />} />
                    </AlbumsWrapper>
                    <DiscographyButton
                        onPress={() => {
                            navigation.navigate('AlbumsScreen', {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                albums: props.data.albums!,
                            });
                        }}
                    >
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
            <PlayButtonWrapper onPress={() => handleTrackPlay(props.data.popularTracks[0])}>
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
