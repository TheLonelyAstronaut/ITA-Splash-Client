import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

import { Album, Playlist, Track } from '../../../types/music';
import { MUSIC_ACTIONS, PlayActionPayload } from '../../player/actions';
import AnimatedGradientTransition from '../animated-gradient-transition.component';
import { BackButton } from '../back-button.component';
import { Container } from '../container.component';

import { MusicListHeader } from './music-list-header.component';
import { TrackComponent } from './track.component';

export const BackButtonWrapper = styled.View`
    position: absolute;
    margin-top: ${getStatusBarHeight()};
`;

export type MusicListTemplateScreenProps = {
    data: Album | Playlist;
};

export const MusicListTemplateScreen: React.FC<MusicListTemplateScreenProps> = (
    props: MusicListTemplateScreenProps
) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigation = useNavigation();
    const isAlbum = (props.data as Album).year;

    const handleTrackPlay = useCallback(
        (item: Track) => {
            dispatch(MUSIC_ACTIONS.PLAY.TRIGGER({ track: item, queue: props.data.tracks } as PlayActionPayload));
        },
        [dispatch, props]
    );

    return (
        <Container>
            <AnimatedGradientTransition
                colors={[
                    theme.colors.additiveBlue,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                    theme.colors.screenBackground,
                ]}
            >
                <FlatList
                    data={props.data.tracks}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                    contentContainerStyle={{ paddingVertical: theme.widgetHeight + theme.spacer }}
                    ListHeaderComponent={<MusicListHeader data={props.data} />}
                />
                <BackButtonWrapper pointerEvents={'box-none'}>
                    <BackButton
                        onPress={useCallback(() => {
                            {
                                isAlbum ? navigation.goBack() : navigation.navigate('PlaylistsScreen');
                            }
                        }, [isAlbum, navigation])}
                    />
                </BackButtonWrapper>
            </AnimatedGradientTransition>
        </Container>
    );
};
