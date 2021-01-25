import React, { useCallback } from 'react';
import { Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { useDispatch } from 'react-redux';

import { tracks } from '../../../mocks/tracks';
import { TrackComponent } from '../../ui/tracks/track.component';
import { MUSIC_ACTIONS } from '../actions';
import { ControlActions, Track } from '../player.state';

const events = [Event.PlaybackState, Event.PlaybackError];

export const Player: React.FC = () => {
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

    return (
        <View>
            <FlatList
                data={tracks}
                renderItem={({ item }) => <TrackComponent track={item} onPress={handleTrackPress} />}
                keyExtractor={(item) => item.id}
            />
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
        </View>
    );
};
