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
import { RegularText } from '../text.component';
import { DEVICE_SIZE } from '../themes/themes';
import I18n from '../../utils/i18n';
import { LibraryElementType } from '../../library/library.types';

export const BackButtonWrapper = styled.View`
    position: absolute;
    margin-top: ${getStatusBarHeight()};
`;

export type MusicListTemplateScreenProps = {
    data: Album | Playlist;
    type?: LibraryElementType;
};

export const Wrapper = styled.View`
    padding-vertical: ${(props) => props.theme.widgetHeight + 8};
`;

export const EmptyText = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    align-self: center;
    margin-top: ${DEVICE_SIZE.height * 0.2};
`;
export const EmptyPlaylistComponent = (data: MusicListTemplateScreenProps) => {
    return (
        <Wrapper>
            <MusicListHeader data={data.data} />
            <EmptyText>{I18n.t('library.emptyPlaylist')}</EmptyText>
        </Wrapper>
    );
};

export const MusicListTemplateScreen: React.FC<MusicListTemplateScreenProps> = (
    props: MusicListTemplateScreenProps
) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigation = useNavigation();
    const isAlbum = (props.data as Album).year;
    console.log(props.type);

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
                {props.data.tracks.length > 0 ? (
                    <FlatList
                        data={props.data.tracks}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id + ''}
                        renderItem={(item) => <TrackComponent track={item.item} onPress={handleTrackPlay} />}
                        contentContainerStyle={{ paddingVertical: theme.widgetHeight + theme.spacer }}
                        ListHeaderComponent={<MusicListHeader data={props.data} type={props.type} />}
                    />
                ) : (
                    <EmptyPlaylistComponent data={props.data} />
                )}

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
