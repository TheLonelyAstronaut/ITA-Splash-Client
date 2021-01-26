import React, { useEffect, useRef } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import Animated from 'react-native-reanimated';
import { State, usePlaybackState } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { tracks } from '../../../mocks/tracks';
import { AvoidingContainer } from '../../ui/container.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import { MUSIC_ACTIONS } from '../actions';
import { ControlActions, Track } from '../player.state';
import { getCurrentTrack, getWasTriggeredByUser } from '../selectors';

import { PlayerArtwork } from './player-artwork.component';
import { ControlButton } from './control-button.component';

export const InfoWrapper = styled.SafeAreaView`
    height: ${DEVICE_SIZE.height}px;
    width: ${DEVICE_SIZE.width}px;
    position: absolute;
    flex: 1;
`;

export const HeaderWrapper = styled.View`
    height: ${(props) => props.theme.player.headerHeight}px;
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
    margin-top: ${(props) => props.theme.player.marginVertical * 4}px;
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const Player: React.FC = () => {
    const dispatch = useDispatch();
    const currentTrack = useSelector(getCurrentTrack);
    const wasTriggeredByUser = useSelector(getWasTriggeredByUser);
    const slider = useRef<typeof AnimatedFlatList>(null);
    const theme = useTheme();
    const currentState = usePlaybackState();
    const [local, setLocal] = React.useState<Track>(currentTrack);
    //const currentTrackNumber = React.useMemo(() => currentTrack, []);

    useEffect(() => {
        dispatch(
            MUSIC_ACTIONS.PLAY.TRIGGER({
                track: tracks[0],
                queue: tracks,
            })
        );
    }, [dispatch]);

    /*const handleViewableItemsChanged = React.useCallback((item) => {
        if(item.changed.length === 2) {
            dispatch(MUSIC_ACTIONS.SET_USER_TRIGGERED_FLAG(true));

            const firstIndex = item.changed[0].index;
            const secondIndex = item.changed[1].index;

            if(firstIndex < secondIndex) {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS }));
            } else {
                dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }));
            }
        }
    }, [dispatch]);*/

    const renderItem = React.useCallback((info: ListRenderItemInfo<Track>) => <PlayerArtwork track={info.item} />, []);

    const animateSwipeToNext = React.useCallback(
        (track?: Track) => {
            const index =
                tracks.findIndex((value) => (track ? track.id === value.id : currentTrack.id === value.id)) +
                (track ? 1 : 0);

            if (index >= tracks.length) return;

            slider.current.getNode().scrollToIndex({
                animated: true,
                index,
            });
        },
        [slider, currentTrack]
    );

    const animateSwipeToPrevious = React.useCallback(() => {
        const index = tracks.findIndex((value) => currentTrack.id === value.id) - 1;

        if (index < 0) return;

        slider.current.getNode().scrollToIndex({
            animated: true,
            index,
        });
    }, [slider, currentTrack]);

    useEffect(() => {
        if (currentTrack && !wasTriggeredByUser) {
            animateSwipeToNext();
        }
    }, [currentTrack, local, dispatch, wasTriggeredByUser, animateSwipeToNext]);

    useEffect(() => {
        if (currentState === State.Playing) {
            dispatch(MUSIC_ACTIONS.SET_USER_TRIGGERED_FLAG(false));
        }
    }, [currentState, dispatch]);

    const handleNextTrackPress = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.SET_USER_TRIGGERED_FLAG(true));

        animateSwipeToNext(currentTrack);
    }, [animateSwipeToNext, currentTrack, dispatch]);

    const handlePreviousTrackPress = React.useCallback(() => {
        animateSwipeToPrevious();
    }, [animateSwipeToPrevious]);

    const handlePlayPausePress = React.useCallback(() => {
        dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.PAUSE_RESUME }));
    }, [dispatch]);

    return (
        <AvoidingContainer>
            <AnimatedFlatList<Track>
                ref={slider}
                data={tracks}
                scrollEventThrottle={16}
                pagingEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                //onViewableItemsChanged={handleViewableItemsChanged}
            />
            <InfoWrapper pointerEvents={'box-none'}>
                <HeaderWrapper>
                    <HeaderText>Playlist info</HeaderText>
                </HeaderWrapper>
                <GestureProvider pointerEvents={'box-none'} />
                <PlayerControlWrapper>
                    <TrackName>{currentTrack.title}</TrackName>
                    <ArtistName>{currentTrack.artist}</ArtistName>
                    <ButtonWrapper>
                        <ControlButton
                            onPress={handlePreviousTrackPress}
                            iconName={'stepbackward'}
                            iconSize={theme.player.controlButtonSize}
                        />
                        <ControlButton
                            onPress={handlePlayPausePress}
                            iconName={currentState === State.Playing ? 'pausecircle' : 'play'}
                            iconSize={theme.player.controlButtonSize}
                        />
                        <ControlButton
                            onPress={handleNextTrackPress}
                            iconName={'stepforward'}
                            iconSize={theme.player.controlButtonSize}
                        />
                    </ButtonWrapper>
                </PlayerControlWrapper>
            </InfoWrapper>
        </AvoidingContainer>
    );
};

/*
const dispatch = useDispatch();

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occurred while playing the current track.');
        }
        if (event.type === Event.PlaybackState) {
            //alert('HERE');
        }
    });

    const handleTrackPress = useCallback(
        (track: Track) => {
            dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: track, queue: tracks }));
        },
        [dispatch]
    );

    const handleTrackLongPress = useCallback(
        (track: Track) => {
            dispatch(MUSIC_ACTIONS.ADD_TO_THE_QUEUE.TRIGGER(track));
            alert('IN THE QUEUE');
        },
        [dispatch]
    );

<View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS }))}
                >
                    <Text style={{ marginRight: 20 }}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.PAUSE_RESUME }))}
                >
                    <Text style={{ marginRight: 20 }}>Play/pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }))}
                >
                    <Text style={{ marginRight: 20 }}>Next</Text>
                </TouchableOpacity>
            </View>
 */
