import React from 'react';
import { View } from 'react-native';
import { State, useProgress } from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';
import Slider from '@react-native-community/slider';

import { MUSIC_ACTIONS } from '../actions';
import Animated, { useValue } from 'react-native-reanimated';

export const TrackProgress = styled(Slider)`
    height: 60px;
`;

const AnimatedTrackProgress = Animated.createAnimatedComponent(TrackProgress);

export const TimerView = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const Timer = styled.Text`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small}px;
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

export const TrackProgressSlider: React.FC = () => {
    const theme = useTheme();
    const { position, duration } = useProgress(500);
    const dispatch = useDispatch();

    const seekTo = React.useCallback(
        (pos) => {
            return dispatch(MUSIC_ACTIONS.SEEK_TO_POSITION({ position: pos }));
        },
        [dispatch]
    );

    return (
        <View>
            <AnimatedTrackProgress
                minimumValue={0}
                maximumValue={duration}
                value={Math.ceil(position)}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor={theme.colors.main}
                onSlidingComplete={seekTo}
                thumbTintColor={theme.colors.secondary}
            />
            <TimerView>
                <Timer>{formatTime(position)}</Timer>
                <Timer>{formatTime(duration)}</Timer>
            </TimerView>
        </View>
    );
};
