import React, { useEffect, useRef, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { err } from 'react-native-svg/lib/typescript/xml';
import RNTrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { getColorFromURL } from 'rn-dominant-color';
import styled, { useTheme } from 'styled-components/native';

import { Track } from '../../../types/music';
import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { AvoidingContainer } from '../../ui/container.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { Logger } from '../../utils/logger';
import { ADD_TRACK_GRADIENT, MUSIC_ACTIONS } from '../actions';
import { ControlActions } from '../player.types';
import { getCurrentQueue, getCurrentTrack, getTrackGradient } from '../selectors';

import { PlayControlButton, SkipControlButton } from './control-button.component';
import { PlayerArtwork } from './player-artwork.component';
import { SwipeableTrackChanger } from './swipeable-track-changer.component';
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
    flex: 2;
`;

export const PlayerControlWrapper = styled.View`
    height: ${(props) => props.theme.player.playerControlHeight}px;
    padding-horizontal: ${(props) => props.theme.player.marginHorizontal}px;
    margin-vertical: ${(props) => props.theme.player.marginVertical}px;
`;

export const HeaderText = styled(RegularText)`
    font-size: ${(props) => props.theme.fontSize.small - 1}px;
    font-weight: 700;
`;

export const TrackName = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.extraLarge}px;
`;

export const ArtistName = styled(RegularText)`
    line-height: 24px;
    font-size: ${(props) => props.theme.fontSize.medium - 1}px;
    opacity: 0.6;
    font-weight: 700;
`;

export const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: ${(props) => props.theme.player.marginVertical * 3}px;
`;

export const AvoidingBackground = styled(AvoidingContainer)`
    background-color: ${(props) => props.theme.colors.main};
`;

export const Player: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const currentQueue = useSelector(getCurrentQueue);
    const theme = useTheme();
    const currentState = usePlaybackState();
    const dispatch = useDispatch();
    const _carousel = useRef<Carousel<Track>>();
    const gradient = useSelector(getTrackGradient(currentTrack.id, [theme.colors.main, theme.colors.main]));

    useEffect(() => {
        if (currentQueue) {
            currentQueue.forEach((item) => {
                try {
                    getColorFromURL(item.artwork.uri).then((colors) => {
                        dispatch(
                            ADD_TRACK_GRADIENT({
                                gradient: [colors.primary, theme.colors.main],
                                track: item.id,
                            })
                        );
                    });
                } catch (error) {
                    Logger.log(error);
                }
            });
        }
    }, [currentQueue, dispatch, theme.colors.main]);

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

    const renderItem = React.useCallback((info: ListRenderItemInfo<Track>) => <PlayerArtwork track={info.item} />, []);

    return (
        <AvoidingBackground>
            <AnimatedGradientTransition colors={gradient}>
                <SwipeableTrackChanger
                    getRef={(ref) => (_carousel.current = ref)}
                    renderItem={renderItem}
                    width={DEVICE_SIZE.width}
                />
                <InfoWrapper pointerEvents={'box-none'}>
                    <HeaderWrapper>
                        <HeaderText>{currentTrack.artist}</HeaderText>
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
            </AnimatedGradientTransition>
        </AvoidingBackground>
    );
};
