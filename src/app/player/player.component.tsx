import React from 'react';
import { Text } from 'react-native';
import { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { useDispatch } from 'react-redux';

import { RegisterButton } from '../authentication/screens/register-screen.component';
import { Container } from '../ui/player';

import { MUSIC_ACTIONS } from './actions';
import { ControlActions } from './player.state';

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

    return (
        <Container>
            <RegisterButton style={{ marginTop: 100 }} onPress={() => dispatch(MUSIC_ACTIONS.PLAY.TRIGGER())}>
                <Text style={{ textAlign: 'center' }}>Play</Text>
            </RegisterButton>
            <RegisterButton
                style={{ marginTop: 100 }}
                onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }))}
            >
                <Text style={{ textAlign: 'center' }}>Next</Text>
            </RegisterButton>
            <RegisterButton
                style={{ marginTop: 100 }}
                onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS }))}
            >
                <Text style={{ textAlign: 'center' }}>Prev</Text>
            </RegisterButton>
        </Container>
    );
};
