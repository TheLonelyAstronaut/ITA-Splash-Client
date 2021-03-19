import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { useDispatch } from 'react-redux';

import { SizeProp, TrackSlider } from '../../ui/animated-slider.component';
import { PLAYER_SKIP_TO_TRIGGERED_BY_USER } from '../../utils/events';
import { formatTime } from '../../utils/mappers/time.formatter';
import { MUSIC_ACTIONS } from '../actions';

import { Timer, TimerView, TrackSliderWrapper } from './styled/track-progress-slider.styled';

export type TrackProgressSliderProps = SizeProp & {
    disableTouches?: boolean;
    listenerEvent: string;
};

export const TrackProgressSlider: React.FC<TrackProgressSliderProps> = (props: TrackProgressSliderProps) => {
    const { position, duration } = useProgress(100);
    const slider = useRef<TrackSlider | null>(null);
    const state = usePlaybackState();
    const dispatch = useDispatch();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], () => {
        slider.current?.animateToValue(duration, true);
    });

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
