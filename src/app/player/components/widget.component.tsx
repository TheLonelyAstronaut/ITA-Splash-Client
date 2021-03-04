import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { Track } from '../../../types/music';
import { Image } from '../../ui/image.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { MUSIC_ACTIONS } from '../actions';
import { openPlayer } from '../player.ref';
import { ControlActions } from '../player.types';
import { getCurrentTrack } from '../selectors';

import {
    ArtistText,
    PlayButton,
    TitleText,
    TrackControl,
    TrackInfoWrapper,
    WidgetWrapper,
} from './styled/widget.styled';
import { SwipeableTrackChanger } from './swipeable-track-changer.component';

export const Widget: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentState = usePlaybackState();
    const trackInfoWidth = React.useMemo(() => DEVICE_SIZE.width - theme.widget.iconSize - theme.widgetHeight, [theme]);
    const imageDimension = React.useMemo(() => theme.widgetHeight - theme.separator.borderWidth, [theme]);

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
                    source={{ uri: currentTrack.artwork }}
                    style={{
                        width: imageDimension,
                        height: imageDimension,
                    }}
                />
                <SwipeableTrackChanger renderItem={renderItem} width={trackInfoWidth} height={theme.widgetHeight} />
                <PlayButton onPress={handlePlayPausePress}>
                    <Icon
                        name={currentState === State.Playing ? 'pause-sharp' : 'play-sharp'}
                        size={theme.widget.iconSize}
                        color={theme.colors.secondary}
                    />
                </PlayButton>
            </TrackControl>
        </WidgetWrapper>
    );
};
