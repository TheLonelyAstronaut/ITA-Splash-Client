import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
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
import { getLibrary, getLikedPlaylist } from '../../library/selectors';
import { ADD_TO_PLAYLIST } from '../../music-stack/actions';
import { getCurrentTrack } from '../../player/selectors';
import I18n from '../../utils/i18n';

import { Icons, Index, TrackContainer, TrackImage, TrackInfoWrapper, TrackName } from './styled/popular-track.styled';
import { Liked, LikeWrapper, Plus } from './styled/track.styled';

type TrackComponentProps = {
    track: Track;
    onPress: (track: Track) => void;
    onLongPress?: (track: Track) => void;
    index: number;
};

export const PopularTrackComponent: React.FC<TrackComponentProps> = (props: TrackComponentProps) => {
    const currentTrack = useSelector(getCurrentTrack);
    const theme = useTheme();
    const isPlaying = useMemo(() => props.track.id === currentTrack.id, [props, currentTrack]);
    const dispatch = useDispatch();
    const data = useSelector(getLibrary);
    const [visible, setVisible] = useState(false);
    const likedPlaylist = useSelector(getLikedPlaylist);
    const liked = useMemo(() => likedPlaylist.tracks.findIndex((value) => value.id === props.track.id) !== -1, [
        likedPlaylist.tracks,
        props.track.id,
    ]);

    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(props.track);
        }
    }, [props]);

    const handleAddToPlaylist = (id: number) => {
        try {
            setVisible(true);
            dispatch(ADD_TO_PLAYLIST.TRIGGER({ trackId: props.track.id, playlistId: id }));
            setVisible(false);
        } catch (e) {
            return null;
        }
    };

    const handleLike = useCallback(() => {
        dispatch(ADD_TO_PLAYLIST.TRIGGER({ trackId: props.track.id, playlistId: likedPlaylist.id }));
    }, [dispatch, props.track.id, likedPlaylist]);

    const handleChangeModalVisibility = useCallback(() => setVisible(!visible), [visible]);

    const handleTrackPress = useCallback(() => props.onPress(props.track), [props]);

    return (
        <TrackContainer onPress={handleTrackPress} onLongPress={handleLongPress}>
            <TrackInfoWrapper>
                <Index>{props.index + 1}</Index>
                <TrackImage source={{ uri: props.track.artwork }} />
                <TrackName isPlaying={isPlaying}>{props.track.title}</TrackName>
            </TrackInfoWrapper>
            <Icons>
                {liked ? (
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
            <AddPlaylistModal
                animationType={'slide'}
                transparent={true}
                visible={visible}
                onRequestClose={handleChangeModalVisibility}
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
                                name={item.item.name}
                                data={item.item}
                                onPress={() => handleAddToPlaylist(item.item.id)}
                            />
                        )}
                        keyExtractor={(item) => item.toString()}
                        directionalLockEnabled={true}
                    />
                </ModalView>
            </AddPlaylistModal>
        </TrackContainer>
    );
};
