import React, { useCallback, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Track } from '../../../types/music';
import { getCurrentTrack } from '../../player/selectors';
import { Image } from '../image.component';
import { RegularText } from '../text.component';
import { Liked, LikeWrapper, Plus } from '../tracks/track.component';
import { ADD_TO_PLAYLIST } from '../../music-stack/actions';
import { AddPlaylistModal, CrossButton, ModalText, ModalView } from '../../library/screens/library-screen.component';
import { FlatList } from 'react-native';
import { PlaylistToChooseItem } from '../../library/components/playlist-for-choose.component';
import { getLibrary } from '../../library/selectors';
import I18n from '../../utils/i18n';
import { ADD_TO_LIKED, LOAD_LIBRARY } from '../../library/actions';

export const TrackContainer = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin-top: 5px;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
`;

// export const TrackImage = styled.Image`
//   width: 45px;
//   height: 45px;
// `

export type Props = {
    isPlaying: boolean;
};

export const TrackInfoWrapper = styled.View`
    justify-content: flex-start;
    flex-direction: row;
`;

export const TrackName = styled(RegularText)<Props>`
    color: ${(props) => (props.isPlaying ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    font-size: ${(props) => props.theme.fontSize.medium};
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const Icons = styled.View`
    margin-right: ${(props) => props.theme.spacer};
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
    flex-direction: row;
`;

export const TrackImage = styled(Image)`
    height: 45px;
    width: 45px;
    margin-left: ${(props) => props.theme.spacer * 2};
`;

export const Index = styled(RegularText)`
    margin-top: ${(props) => props.theme.spacer * 2 - 5};
`;

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
        dispatch(ADD_TO_LIKED.TRIGGER({ id: props.track.id }));
        dispatch(LOAD_LIBRARY.TRIGGER(1));
    }, [dispatch, props.track.id]);

    return (
        <TrackContainer onPress={() => props.onPress(props.track)} onLongPress={handleLongPress}>
            <TrackInfoWrapper>
                <Index>{props.index + 1}</Index>
                <TrackImage source={{ uri: props.track.artwork }} />
                <TrackName isPlaying={isPlaying}>{props.track.title}</TrackName>
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
                <Plus onPress={() => setVisible(true)}>
                    <Icon name={'plus'} color={theme.colors.secondary} size={20} />
                </Plus>
            </Icons>
            <AddPlaylistModal
                animationType={'slide'}
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}
            >
                <ModalView>
                    <CrossButton onPress={() => setVisible(!visible)}>
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
                        directionalLockEnabled={true}
                    />
                </ModalView>
            </AddPlaylistModal>
        </TrackContainer>
    );
};
