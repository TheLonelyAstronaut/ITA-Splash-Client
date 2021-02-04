import React from 'react';
import { ListRenderItemInfo, Pressable } from 'react-native';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { Image } from '../../ui/image.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { MUSIC_ACTIONS } from '../actions';
import { openPlayer } from '../player.ref';
import { ControlActions } from '../player.state';
import { getCurrentTrack } from '../selectors';

import { SwipeableTrackChanger } from './swipeable-track-changer.component';
import { Track } from '../../../types/music';

export const WidgetWrapper = styled.View`
    width: ${DEVICE_SIZE.width}px;
    height: ${(props) => props.theme.widgetHeight}px;
    background-color: ${(props) => props.theme.colors.main};
`;

export const TrackControl = styled.View`
    width: ${DEVICE_SIZE.width}px;
    height: ${(props) => props.theme.widgetHeight - props.theme.separator.borderWidth}px;
    background-color: ${(props) => props.theme.colors.main};
    border-bottom-width: ${(props) => props.theme.separator.borderWidth};
    flex-direction: row;
`;

export const ArtistText = styled(RegularText)`
    font-size: ${(props) => props.theme.fontSize.small}px;
`;

export const TitleText = styled(BoldText)`
    font-size: ${(props) => props.theme.fontSize.large}px;
`;

export const PlayButton = styled.TouchableOpacity`
    align-self: center;
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

export const TrackInfoWrapper = styled(Pressable)`
    width: ${(props) => DEVICE_SIZE.width - props.theme.widget.iconSize - props.theme.widgetHeight}px;
    height: 100%;
    padding-horizontal: ${(props) => props.theme.spacer * 2}px;
    justify-content: center;
`;

export const ProgressLineWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.main};
    height: ${(props) => props.theme.widget.progressHeight}px;
    position: absolute;
    margin-top: -${(props) => props.theme.widget.progressHeight}px;
    width: ${DEVICE_SIZE.width};
`;

export const ProgressLine = styled.View<{ width: number }>`
    background-color: ${(props) => props.theme.colors.secondary};
    width: ${(props) => props.width}px;
    height: 100%;
`;

export const Widget: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentState = usePlaybackState();
    const trackInfoWidth = React.useMemo(() => DEVICE_SIZE.width - theme.widget.iconSize - theme.widgetHeight, [theme]);
    const { position, duration } = useProgress();
    const imageDimension = React.useMemo(() => theme.widgetHeight - theme.separator.borderWidth, [theme]);

    const progress = React.useMemo(() => {
        if (position && duration) {
            return (position / duration) * DEVICE_SIZE.width;
        } else {
            return 0;
        }
    }, [position, duration]);

    const handlePlayPausePress = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.PAUSE_RESUME }));
    }, [dispatch]);

    const renderItem = React.useCallback(
        (info: ListRenderItemInfo<Track>) => (
            <TrackInfoWrapper onPress={openPlayer}>
                <TitleText>{info.item.title}</TitleText>
                <ArtistText>{info.item.artist}</ArtistText>
            </TrackInfoWrapper>
        ),
        []
    );

    return (
        <WidgetWrapper>
            <TrackControl>
                <Image
                    source={currentTrack.artwork}
                    style={{
                        width: imageDimension,
                        height: imageDimension,
                    }}
                />
                <SwipeableTrackChanger renderItem={renderItem} width={trackInfoWidth} />
                <PlayButton onPress={handlePlayPausePress}>
                    <Icon
                        name={currentState === State.Playing ? 'pause-sharp' : 'play-sharp'}
                        size={theme.widget.iconSize}
                        color={theme.colors.secondary}
                    />
                </PlayButton>
            </TrackControl>
            <ProgressLineWrapper>
                <ProgressLine width={progress} />
            </ProgressLineWrapper>
        </WidgetWrapper>
    );
};
