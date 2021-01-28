import React, { useEffect, useRef } from 'react';
import { ListRenderItemInfo } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RNTrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { AvoidingContainer } from '../../ui/container.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { MUSIC_ACTIONS } from '../actions';
import { ControlActions, Track } from '../player.state';
import { getCurrentQueue, getCurrentTrack } from '../selectors';

import { PlayControlButton, SkipControlButton } from './control-button.component';
import { PlayerArtwork } from './player-artwork.component';
import { TrackProgressSlider } from './tarck-progress-slider.component';

export const InfoWrapper = styled.View`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    position: absolute;
    flex: 1;
`;

export const HeaderWrapper = styled.View`
    height: ${(props) => props.theme.player.headerHeight}px;
    margin-top: ${getStatusBarHeight()}px;
    align-items: center;
    justify-content: center;
`;

export const GestureProvider = styled.View`
    height: ${(props) => props.theme.player.artworkSize}px;
`;

export const PlayerControlWrapper = styled.View`
    flex: 1;
    padding-horizontal: ${(props) => props.theme.player.marginHorizontal}px;
    padding-vertical: ${(props) => props.theme.player.marginVertical}px;
`;

export const HeaderText = styled(RegularText)`
    font-size: ${(props) => props.theme.fontSize.small}px;
`;

export const TrackName = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.large}px;
`;

export const ArtistName = styled(RegularText)`
    line-height: 24px;
`;

export const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: ${(props) => props.theme.player.marginVertical * 3}px;
`;

export const Player: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const theme = useTheme();
    const currentState = usePlaybackState();
    const dispatch = useDispatch();
    const queue = useSelector(getCurrentQueue);
    const _carousel = useRef<Carousel<Track>>();

    const handleNextTrackPress = React.useCallback(() => {
        _carousel?.current?.snapToNext();
    }, [_carousel]);

    const handlePreviousTrackPress = React.useCallback(async () => {
        const position = await RNTrackPlayer.getPosition();

        if (position > 3) {
            dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS }));
        } else {
            _carousel?.current?.snapToPrev();
        }
    }, [_carousel, dispatch]);

    const handlePlayPausePress = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.PAUSE_RESUME }));
    }, [dispatch]);

    const changeTrackController = React.useCallback(
        (nextTrack: number) => {
            const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);

            if (nextTrack > currentIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }));
            } else if (nextTrack < currentIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS, forceSkip: true }));
            }
        },
        [queue, currentTrack, dispatch]
    );

    const renderItem = React.useCallback((info: ListRenderItemInfo<Track>) => <PlayerArtwork track={info.item} />, []);

    useEffect(() => {
        const currentIndex = queue.findIndex((item) => item.id === currentTrack.id);

        if (currentIndex != _carousel?.current?.currentIndex) {
            _carousel?.current?.snapToItem(currentIndex);
        }
    }, [currentTrack, queue, _carousel]);

    return (
        <AvoidingContainer>
            <Carousel
                ref={(ref) => (_carousel.current = ref as Carousel<Track>)}
                data={queue}
                horizontal={true}
                renderItem={renderItem}
                sliderWidth={DEVICE_SIZE.width}
                itemWidth={DEVICE_SIZE.width}
                onSnapToItem={changeTrackController}
            />
            <InfoWrapper pointerEvents={'box-none'}>
                <HeaderWrapper>
                    <HeaderText>Playlist info</HeaderText>
                </HeaderWrapper>
                <GestureProvider pointerEvents={'box-none'} />
                <PlayerControlWrapper>
                    <TrackName>{currentTrack.title}</TrackName>
                    <ArtistName>{currentTrack.artist}</ArtistName>
                    <TrackProgressSlider />
                    <ButtonWrapper>
                        <SkipControlButton
                            onPress={handlePreviousTrackPress}
                            iconName={'md-play-skip-back-sharp'}
                            iconSize={theme.player.controlPrevNextSize}
                        />
                        <PlayControlButton
                            onPress={handlePlayPausePress}
                            iconName={currentState === State.Playing ? 'pause-circle' : 'play-circle'}
                            iconSize={theme.player.controlPlayPauseSize}
                        />
                        <SkipControlButton
                            onPress={handleNextTrackPress}
                            iconName={'md-play-skip-forward-sharp'}
                            iconSize={theme.player.controlPrevNextSize}
                        />
                    </ButtonWrapper>
                </PlayerControlWrapper>
            </InfoWrapper>
        </AvoidingContainer>
    );
};
