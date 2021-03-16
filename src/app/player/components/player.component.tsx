import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { ListRenderItemInfo, Platform, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RNTrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
// Add types declaration or move to backend?
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getColorFromURL } from 'rn-dominant-color';
import { useTheme } from 'styled-components/native';

import { Track } from '../../../types/music';
import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { PLAYER_SKIP_TO_TRIGGERED_BY_USER } from '../../utils/events';
import { Logger } from '../../utils/logger';
import { ADD_TRACK_GRADIENT, MUSIC_ACTIONS } from '../actions';
import { closePlayer } from '../player.ref';
import { ControlActions } from '../player.types';
import { getCurrentQueue, getCurrentTrack, getTrackGradient } from '../selectors';

import { PlayControlButton, SkipControlButton } from './control-button.component';
import { PlayerArtwork } from './player-artwork.component';
import {
    ArtistName,
    AvoidingBackground,
    ButtonWrapper,
    ChevronButtonWrapper,
    GestureProvider,
    HeaderText,
    HeaderWrapper,
    InfoWrapper,
    PlayerControlWrapper,
    TRACK_SLIDER_HEIGHT,
    TRACK_SLIDER_WIDTH,
    TrackName,
} from './styled/player.styled';
import { SwipeableTrackChanger } from './swipeable-track-changer.component';
import { TrackProgressSlider } from './track-progress-slider.component';

export const Player: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const currentQueue = useSelector(getCurrentQueue);
    const theme = useTheme();
    const navigation = useNavigation();
    const currentState = usePlaybackState();
    const dispatch = useDispatch();
    const _carousel = useRef<Carousel<Track>>();
    const gradient = useSelector(getTrackGradient(currentTrack.id, [theme.colors.main, theme.colors.main]));

    useEffect(() => {
        if (currentQueue) {
            currentQueue.forEach((item) => {
                try {
                    getColorFromURL(item.artwork).then((colors) => {
                        dispatch(
                            ADD_TRACK_GRADIENT({
                                gradient:
                                    Platform.OS === 'ios'
                                        ? [colors.secondary, colors.background]
                                        : [colors.primary, theme.colors.main],
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

    const transfer = useCallback(
        (stack: string, screen: string, params: unknown) => {
            // Strange RN navigation behavior
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigation.navigate(stack, {
                screen,
                params,
            });
        },
        [navigation]
    );

    const handlePress = useCallback(() => {
        transfer('HomeMusicStack', 'ArtistScreen', {
            id: currentTrack.artistID,
            key: 'ArtistScreen_' + currentTrack.artistID + '_' + Math.random().toString(),
        });
        closePlayer();
    }, [currentTrack.artistID, transfer]);

    return (
        <AvoidingBackground>
            <AnimatedGradientTransition colors={gradient}>
                <SwipeableTrackChanger
                    getRef={(ref) => (_carousel.current = ref)}
                    renderItem={renderItem}
                    width={DEVICE_SIZE.width}
                    height={DEVICE_SIZE.height}
                />
                <InfoWrapper pointerEvents={'box-none'}>
                    <HeaderWrapper>
                        <ChevronButtonWrapper onPress={closePlayer}>
                            <Icon style={{ alignSelf: 'center', padding: 4 }} name={'down'} color={'white'} size={18} />
                        </ChevronButtonWrapper>
                        <HeaderText>{currentTrack.artist}</HeaderText>
                    </HeaderWrapper>
                    <GestureProvider pointerEvents={'box-none'} />
                    <PlayerControlWrapper>
                        <TrackName>{currentTrack.title}</TrackName>
                        <TouchableOpacity onPress={handlePress}>
                            <ArtistName>{currentTrack.artist}</ArtistName>
                        </TouchableOpacity>
                        <TrackProgressSlider
                            width={TRACK_SLIDER_WIDTH}
                            height={TRACK_SLIDER_HEIGHT}
                            listenerEvent={PLAYER_SKIP_TO_TRIGGERED_BY_USER}
                        />
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
