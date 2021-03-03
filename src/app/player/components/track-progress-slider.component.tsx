import Slider from '@react-native-community/slider';
import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { SizeProp, TrackSlider } from '../../ui/animated-slider.component';
import { RegularText } from '../../ui/text.component';
import { PLAYER_SKIP_TO_TRIGGERED_BY_USER } from '../../utils/events';
import { MUSIC_ACTIONS } from '../actions';

export const TrackProgress = styled(Slider)`
    height: ${(props) => props.theme.sliderHeight}px;
`;

export const TimerView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.spacer}px;
`;

export const Timer = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.extraSmall}px;
    opacity: 0.6;
    font-weight: 700;
`;

export const TrackSliderWrapper = styled.View<{ disableMargin?: boolean }>`
    margin-vertical: ${(props) => (props.disableMargin ? 0 : props.theme.spacer * 2)}px;
`;

const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    let seconds: string | number = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;
    if (seconds == 60) {
        seconds = '00';
        return `${minutes + 1}:${seconds}`;
    } else return `${minutes}:${seconds}`;
};

export type TrackProgressSliderProps = SizeProp & {
    disableTouches?: boolean;
    listenerEvent: string;
};

export const TrackProgressSlider: React.FC<TrackProgressSliderProps> = (props: TrackProgressSliderProps) => {
    const { position, duration } = useProgress(100);
    const slider = useRef<TrackSlider | null>(null);
    const state = usePlaybackState();
    const dispatch = useDispatch();

    const handleDragEnd = useCallback(
        (time: number) => {
            dispatch(MUSIC_ACTIONS.SEEK_TO_POSITION({ position: time }));
        },
        [dispatch]
    );

    useEffect(() => {
        const listener = EventRegister.addEventListener(PLAYER_SKIP_TO_TRIGGERED_BY_USER, () => {
            slider.current?.animateToValue(duration - 0.1);
        }) as string;

        return () => {
            EventRegister.removeEventListener(listener);
        };
    }, [duration, slider]);

    return (
        <View>
            <TrackSliderWrapper disableMargin={props.disableTouches}>
                <TrackSlider
                    ref={slider}
                    duration={duration - 0.1}
                    onGestureEnd={handleDragEnd}
                    height={props.height}
                    width={props.width}
                    paused={state != State.Playing}
                    currentPosition={position - 0.1}
                    disableTouches={props.disableTouches}
                />
            </TrackSliderWrapper>
            {!props.disableTouches && (
                <TimerView>
                    <Timer>{formatTime(position)}</Timer>
                    <Timer>{formatTime(duration - position)}</Timer>
                </TimerView>
            )}
        </View>
    );
};
