import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { Track } from '../../../types/music';
import { ADD_TO_LIKED, LOAD_LIBRARY } from '../../library/actions';
import { PlaylistToChooseItem } from '../../library/components/playlist-for-choose.component';
import {
    AddPlaylistModal,
    CrossButton,
    ModalText,
    ModalView,
} from '../../library/components/styled/library-screen.styled';
import { getLibrary } from '../../library/selectors';
import { ADD_TO_PLAYLIST } from '../../music-stack/actions';
import { getCurrentTrack } from '../../player/selectors';
import I18n from '../../utils/i18n';

import {
    Icons,
    Liked,
    LikeWrapper,
    Plus,
    TrackArtist,
    TrackContainer,
    TrackInfoWrapper,
    TrackName,
} from './styled/track.styled';

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
    onLongPress?: (track: Track) => void;
};

export const TrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    const currentTrack = useSelector(getCurrentTrack);
    const theme = useTheme();
    const dispatch = useDispatch();
    const data = useSelector(getLibrary);
    const [visible, setVisible] = useState(false);
    const isPlaying = useMemo(() => props.track.id === currentTrack.id, [props, currentTrack]);

    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(props.track);
        }
    }, [props]);

    const handleAddToPlaylist = useCallback(
        (id: number) => {
            try {
                setVisible(true);
                dispatch(ADD_TO_PLAYLIST.TRIGGER({ trackId: props.track.id, playlistId: id }));
                setVisible(false);
            } catch (e) {
                return null;
            }
        },
        [dispatch, props.track.id]
    );

    const handleTrackPress = useCallback(() => props.onPress(props.track), [props]);

    const handleLike = useCallback(() => {
        dispatch(ADD_TO_LIKED.TRIGGER({ id: parseInt(props.track.id) }));
        dispatch(LOAD_LIBRARY.TRIGGER());
    }, [dispatch, props.track.id]);

    const handleChangeModalVisibility = useCallback(() => setVisible(!visible), [visible]);

    return (
        <View>
            <TrackContainer onPress={handleTrackPress} onLongPress={handleLongPress}>
                <TrackInfoWrapper>
                    <TrackName isPlaying={isPlaying}>{props.track.title}</TrackName>
                    <TrackArtist>{props.track.artist}</TrackArtist>
                </TrackInfoWrapper>
                <Icons>
                    {props.track.liked ? (
                        <LikeWrapper onPress={handleLike}>
                            <Liked source={require('../../../assets/like-button-color.png')} />
                        </LikeWrapper>
                    ) : (
                        <LikeWrapper onPress={handleLike}>
                            <Liked source={require('../../../assets/like-button-blank.png')} />
                        </LikeWrapper>
                    )}
                    <Plus onPress={handleChangeModalVisibility}>
                        <Icon name={'plus'} color={theme.colors.secondary} size={20} />
                    </Plus>
                </Icons>
            </TrackContainer>
            <AddPlaylistModal
                animationType={'slide'}
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}
            >
                <ModalView>
                    <CrossButton onPress={handleChangeModalVisibility}>
                        <Icon name={'cross'} size={24} color={theme.colors.secondary} />
                    </CrossButton>
                    <ModalText>{I18n.t('additional.choosePlaylist')}</ModalText>
                    <FlatList
                        data={data}
                        renderItem={(item) => (
                            <PlaylistToChooseItem
                                name={item.item.data.name}
                                data={item.item}
                                onPress={() => handleAddToPlaylist(item.item.data.id)}
                            />
                        )}
                        keyExtractor={(item) => item.data.toString()}
                    />
                </ModalView>
            </AddPlaylistModal>
        </View>
    );
};
