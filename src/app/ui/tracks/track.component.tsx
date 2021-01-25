import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { Track } from '../../player/player.state';

export const TrackContainer = styled.View`
    background-color: black;
    width: 100%;
    height: 70px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

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
