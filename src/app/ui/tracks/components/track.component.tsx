import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Track } from '../../../player/player.state';
import { TrackContainer } from '../track';

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
};

export const TrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.track)}>
            <TrackContainer>
                <Text>{props.track.title}</Text>
                <Text>{props.track.artist}</Text>
            </TrackContainer>
        </TouchableOpacity>
    );
};
