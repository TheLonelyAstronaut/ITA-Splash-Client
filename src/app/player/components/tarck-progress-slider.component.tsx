import Slider from '@react-native-community/slider';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { MUSIC_ACTIONS } from '../actions';

export const TrackProgress = styled(Slider)`
    height: ${(props) => props.theme.sliderHeight}px;
`;

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
    const [lockedPosition, setLockedPosition] = useState(-1);
    const [unlockAllowed, setUnlockAllowed] = useState(true);
    const [triggerUnlocking, setTriggerUnlocking] = useState(false);
    const dispatch = useDispatch();

    const blockAutoupdate = useCallback((value: number) => {
        setLockedPosition(value);
        setUnlockAllowed(false);
    }, []);

    const seekTo = React.useCallback(
        (pos) => {
            dispatch(MUSIC_ACTIONS.SEEK_TO_POSITION({ position: pos }));
            setLockedPosition(pos);
            setTriggerUnlocking(true);
        },
        [dispatch]
    );

    const value = React.useMemo(
        () => (lockedPosition != -1 && !unlockAllowed ? lockedPosition : Math.floor(position)),
        [position, lockedPosition, unlockAllowed]
    );

    useEffect(() => {
        if (lockedPosition != -1 && triggerUnlocking) {
            setTriggerUnlocking(false);
            setUnlockAllowed(true);
        }
        // We need to trigger this only when position was changed
        // eslint-disable-next-line
    }, [position]);

    return (
        <View>
            <TrackProgress
                minimumValue={0}
                maximumValue={duration - 1}
                value={value}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor={theme.colors.sliderColor}
                onSlidingStart={blockAutoupdate}
                onSlidingComplete={seekTo}
                thumbTintColor={theme.colors.secondary}
            />
            <TimerView>
                <Timer>{formatTime(position)}</Timer>
                <Timer>{formatTime(duration - position)}</Timer>
            </TimerView>
        </View>
    );
};
