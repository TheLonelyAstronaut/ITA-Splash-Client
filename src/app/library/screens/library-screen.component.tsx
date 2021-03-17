import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { Container } from '../../ui/styled/container.styled';
import I18n from '../../utils/i18n';
import { ADD_PLAYLIST } from '../actions';
import { AddPlaylistItem } from '../components/add-playlist.component';
import { PlaylistItem } from '../components/playlist-item.component';
import {
    AddPlaylistModal,
    CrossButton,
    HeaderText,
    Indicator,
    ModalText,
    ModalView,
    PlaylistInput,
} from '../components/styled/library-screen.styled';
import { LibraryScreenParams } from '../routing.params';
import { getIsFetchingLibrary, getLibrary, getRootLibraryState } from '../selectors';

export const LibraryScreen: React.FC<LibraryScreenParams> = () => {
    const [visible, setVisible] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const dispatch = useDispatch();
    const theme = useTheme();
    const isFetching = useSelector(getIsFetchingLibrary);
    const extraData = useSelector(getRootLibraryState);
    const data = useSelector(getLibrary);

    const handleAddPlaylist = useCallback(
        (name: string) => {
            dispatch(ADD_PLAYLIST.TRIGGER({ name }));
        },
        [dispatch]
    );

    const handleModal = useCallback(() => {
        setVisible(true);
    }, []);

    const handleChangeModalVisibilityState = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    const handleCreatePlaylist = useCallback(() => {
        try {
            if (playlistName === '') {
                handleAddPlaylist('Unknown playlist');
                setVisible(false);
            } else {
                handleAddPlaylist(playlistName);
                setVisible(false);
            }
        } catch (e) {
            console.log(e);
        }
    }, [handleAddPlaylist, playlistName]);

    const handlePlaylistNameChange = useCallback((val) => setPlaylistName(val), []);

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
                style={{ flex: 1, paddingTop: getStatusBarHeight() }}
            >
                <HeaderText>{I18n.t('library.music')}</HeaderText>
                {isFetching ? (
                    <Indicator />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={(item) => <PlaylistItem name={item.item.name} data={item.item} />}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={extraData}
                        ListHeaderComponent={<AddPlaylistItem onPress={handleModal} />}
                        contentContainerStyle={{ marginLeft: theme.spacer * 3 }}
                    />
                )}
            </AnimatedGradientTransition>
            <AddPlaylistModal
                animationType={'slide'}
                transparent={true}
                visible={visible}
                onRequestClose={handleChangeModalVisibilityState}
            >
                <ModalView>
                    <CrossButton onPress={handleChangeModalVisibilityState}>
                        <Icon name={'close'} size={24} color={theme.colors.secondary} />
                    </CrossButton>
                    <ModalText>{I18n.t('library.comeUpPlaylistName')}</ModalText>
                    <PlaylistInput autoFocus={true} onChangeText={handlePlaylistNameChange} />
                    <LinearButton title={'library.create'} onPress={handleCreatePlaylist} />
                </ModalView>
            </AddPlaylistModal>
        </Container>
    );
};
