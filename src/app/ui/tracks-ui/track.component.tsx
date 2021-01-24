import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { MUSIC_ACTIONS } from '../../player/actions';
import { Track } from '../../player/player.state';
import { TrackContainer } from '../track';

type TrackComponentProps = {
    track: Track;
};

export const TrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    const dispatch = useDispatch();
    const currentTrack = props.track;
    return (
        <TouchableOpacity
            onPress={() =>
                dispatch(
                    MUSIC_ACTIONS.PLAY.TRIGGER({
                        id: props.track.id,
                        title: props.track.title,
                        artwork: props.track.artwork,
                        artist: props.track.artist,
                        url: props.track.url,
                    })
                )
            }
        >
            <TrackContainer>
                <Text style={{ color: 'white', textAlign: 'center' }}>{props.track.title}</Text>
                <Text style={{ color: 'white', textAlign: 'center' }}>{props.track.artist}</Text>
            </TrackContainer>
        </TouchableOpacity>
    );
};
