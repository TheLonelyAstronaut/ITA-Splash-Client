import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { useDispatch } from 'react-redux';

import { RegisterButton } from '../authentication/screens/register-screen.component';
import { tracks } from '../mocks/tracks';
import { Container } from '../ui/player';
import { TrackComponent } from '../ui/tracks-ui/track.component';

import { MUSIC_ACTIONS } from './actions';
import { ControlActions, Track } from './player.state';

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
        // <Container>
        //     <RegisterButton
        //         style={{ marginTop: 100 }}
        //         onPress={() =>
        //             dispatch(
        //                 MUSIC_ACTIONS.PLAY.TRIGGER({
        //                     id: '1',
        //                     url: require('../assets/postmalone.mp3'),
        //                     title: 'Sunflower',
        //                     artist: 'Post Malone',
        //                     artwork: require('../assets/light-logo.jpg'),
        //                 })
        //             )
        //         }
        //     >
        //         <Text style={{ textAlign: 'center' }}>Play</Text>
        //     </RegisterButton>
        //     <RegisterButton
        //         style={{ marginTop: 100 }}
        //         onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_NEXT }))}
        //     >
        //         <Text style={{ textAlign: 'center' }}>Next</Text>
        //     </RegisterButton>
        //     <RegisterButton
        //         style={{ marginTop: 100 }}
        //         onPress={() => dispatch(MUSIC_ACTIONS.CONTROL.TRIGGER({ action: ControlActions.SKIP_TO_PREVIOUS }))}
        //     >
        //         <Text style={{ textAlign: 'center' }}>Prev</Text>
        //     </RegisterButton>
        // </Container>
        <View>
            <FlatList
                data={tracks}
                renderItem={({ item }) => <TrackComponent track={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};
