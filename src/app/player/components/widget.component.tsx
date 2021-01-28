import { useBottomSheet } from '@gorhom/bottom-sheet';
import React from 'react';
import { Pressable } from 'react-native';
import { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { Image } from '../../ui/image.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { MUSIC_ACTIONS } from '../actions';
import { ControlActions } from '../player.state';
import { getCurrentTrack } from '../selectors';

export const WidgetWrapper = styled(Pressable)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.main};
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: black;
`;

export const TrackInfoWrapper = styled.View`
    flex: 1;
    padding-horizontal: 20px;
    justify-content: center;
`;

export const ArtistText = styled(RegularText)`
    font-size: 14px;
`;

export const TitleText = styled(BoldText)`
    font-size: 18px;
    margin-bottom: 3px;
`;
export const Separator = styled.View`
    border-width: 1px;
    border-color: black;
`;

export const PlayButton = styled.TouchableOpacity`
    align-self: center;
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

export const Widget: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const { expand } = useBottomSheet();
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentState = usePlaybackState();

    const handlePlayPausePress = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.PAUSE_RESUME }));
    }, [dispatch]);

    return (
        <WidgetWrapper onPress={expand}>
            <Image
                source={currentTrack.artwork}
                style={{
                    width: theme.widgetHeight,
                    height: theme.widgetHeight,
                }}
            />
            <TrackInfoWrapper>
                <TitleText>{currentTrack.title}</TitleText>
                <ArtistText>{currentTrack.artist}</ArtistText>
            </TrackInfoWrapper>
            <PlayButton onPress={handlePlayPausePress}>
                <Icon
                    name={currentState === State.Playing ? 'pause-sharp' : 'play-sharp'}
                    size={26}
                    color={theme.colors.secondary}
                />
            </PlayButton>
        </WidgetWrapper>
    );
};
