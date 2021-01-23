import React from 'react';
import { Text } from 'react-native';
import { Event, usePlaybackState, useTrackPlayerEvents } from 'react-native-track-player';
import { useDispatch } from 'react-redux';

import { RegisterButton } from '../authentication/screens/register-screen.component';
import { Container } from '../ui/player';

import { MUSIC_CONTROL } from './actions';

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
    const isPlaying = usePlaybackState();
    console.log(isPlaying);

    return (
        <Container>
            <RegisterButton
                style={{ marginTop: 100 }}
                onPress={() =>
                    dispatch(
                        MUSIC_CONTROL.PLAY({
                            id: 'trackId',
                            url: require('../assets/track.mp3'),
                            title: 'Sunflower',
                            artist: 'Post Malone',
                            artwork: require('../assets/light-logo.jpg'),
                            isPlaying: isPlaying,
                        })
                    )
                }
            >
                <Text style={{ textAlign: 'center' }}>Play</Text>
            </RegisterButton>
            <RegisterButton style={{ marginTop: 100 }} onPress={() => dispatch(MUSIC_CONTROL.PAUSE())}>
                <Text style={{ textAlign: 'center' }}>Pause</Text>
            </RegisterButton>
            <RegisterButton style={{ marginTop: 100 }} onPress={() => dispatch(MUSIC_CONTROL.NEXT())}>
                <Text style={{ textAlign: 'center' }}>Next</Text>
            </RegisterButton>
            <RegisterButton style={{ marginTop: 100 }} onPress={() => dispatch(MUSIC_CONTROL.PREV())}>
                <Text style={{ textAlign: 'center' }}>Prev</Text>
            </RegisterButton>
        </Container>
    );
};
