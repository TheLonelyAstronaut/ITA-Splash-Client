import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Track } from '../../../types/music';
import { PlaylistToChooseItem } from '../../library/components/playlist-for-choose.component';
import { AddPlaylistModal, CrossButton, ModalText, ModalView } from '../../library/screens/library-screen.component';
import { getLibrary } from '../../library/selectors';
import { ADD_TO_PLAYLIST } from '../../music-stack/actions';
import { getCurrentTrack } from '../../player/selectors';
import I18n from '../../utils/i18n';
import { RegularText } from '../text.component';

export const TrackContainer = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    margin-top: 10px;
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
    margin-left: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 1.6};
`;
export const TrackName = styled(RegularText)<Props>`
    color: ${(props) => (props.isPlaying ? props.theme.colors.additivePink : props.theme.colors.secondary)};
    font-size: ${(props) => props.theme.fontSize.medium};
`;
export const TrackArtist = styled(RegularText)`
    color: ${(props) => props.theme.colors.inputBackground};
    font-size: ${(props) => props.theme.fontSize.extraSmall};
`;
export const Plus = styled.TouchableOpacity``;
export const Icons = styled.View`
    margin-right: ${(props) => props.theme.spacer * 4};
    margin-top: ${(props) => props.theme.spacer * 2};
    flex-direction: row;
`;
export const Liked = styled.Image`
    width: 10px;
    height: 10px;
    margin-top: 6px;
    margin-right: ${(props) => props.theme.spacer * 3}px;
`;

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

    const handleAddToPlaylist = (id: number) => {
        setVisible(true);
        dispatch(ADD_TO_PLAYLIST.TRIGGER({ trackId: props.track.id, playlistId: id }));
    };

    return (
        <View>
            <TrackContainer onPress={() => props.onPress(props.track)} onLongPress={handleLongPress}>
                <TrackInfoWrapper>
                    <TrackName isPlaying={isPlaying}>{props.track.title}</TrackName>
                    <TrackArtist>{props.track.artist}</TrackArtist>
                </TrackInfoWrapper>
                <Icons>
                    {props.track.liked ? <Liked source={require('../../../assets/like-button-color.png')} /> : null}
                    <Plus onPress={() => setVisible(true)}>
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
                    />
                </ModalView>
            </AddPlaylistModal>
        </View>
    );
};
