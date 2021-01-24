import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { MUSIC_ACTIONS, PlayActionPayload } from '../../player/actions';
import { ControlActions, Track } from '../../player/player.state';
import { TrackContainer } from '../track';

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
};

export const TrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.track)}>
            <TrackContainer>
                <Text style={{ color: 'white', textAlign: 'center' }}>{props.track.title}</Text>
                <Text style={{ color: 'white', textAlign: 'center' }}>{props.track.artist}</Text>
            </TrackContainer>
        </TouchableOpacity>
    );
};
