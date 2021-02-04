import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { Track } from '../../../types/music';

export const TrackContainer = styled.View`
    background-color: black;
    width: 100%;
    height: 70px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const TrackText = styled.Text`
    color: white;
`;

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
    onLongPress?: (track: Track) => void;
};

export const TrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(props.track);
        }
    }, [props]);

    return (
        <TouchableOpacity onPress={() => props.onPress(props.track)} onLongPress={handleLongPress}>
            <TrackContainer>
                <TrackText>{props.track.title}</TrackText>
                <TrackText>{props.track.artist}</TrackText>
            </TrackContainer>
        </TouchableOpacity>
    );
};
