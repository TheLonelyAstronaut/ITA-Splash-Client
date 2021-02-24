import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { Input } from '../../authentication/components/styled.component';
import AnimatedGradientTransition from '../../ui/animated-gradient-transition.component';
import { Container } from '../../ui/container.component';
import { LinearButton } from '../../ui/linear-gradient-button.component';
import { BoldText, RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { ADD_PLAYLIST, LOAD_LIBRARY } from '../actions';
import { AddPlaylistItem } from '../components/add-playlist.component';
import { PlaylistItem } from '../components/playlist-item.component';
import { LibraryStackNavigationProps } from '../routing.params';
import { getIsFetchingLibrary, getLibrary, getRootLibraryState } from '../selectors';

export const HeaderText = styled(BoldText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.extraLarge};
    margin-left: ${(props) => props.theme.spacer * 3};
    margin-top: ${(props) => props.theme.spacer * 3};
    margin-bottom: ${(props) => props.theme.spacer * 3};
`;

export const AddPlaylistModal = styled.Modal``;

export const ModalView = styled.View`
    flex: 1;
    margin-top: ${(props) => props.theme.spacer * 12 - 5}px;
    border-radius: 20px;
    padding: ${(props) => props.theme.spacer * 4}px;
    align-items: center;
    background-color: ${(props) => props.theme.colors.main};
    height: ${DEVICE_SIZE.height}px;
`;

export const ModalText = styled(RegularText)`
    margin-top: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export const PlaylistInput = styled(Input)`
    margin-top: ${(props) => props.theme.spacer * 2};
    font-size: ${(props) => props.theme.fontSize.large};
    margin-bottom: ${(props) => props.theme.spacer * 2};
`;

export const CrossButton = styled.TouchableOpacity`
    align-self: flex-end;
`;
export const Indicator = styled.ActivityIndicator`
    margin-top: 60%;
`;

export type LibraryScreenParams = LibraryStackNavigationProps<'PlaylistsScreen'>;

export const LibraryScreen: React.FC<LibraryScreenParams> = (props: LibraryScreenParams) => {
    const [visible, setVisible] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const dispatch = useDispatch();
    const theme = useTheme();
    const isFetching = useSelector(getIsFetchingLibrary);
    const extraData = useSelector(getRootLibraryState);

    const handleAddPlaylist = useCallback(
        (name: string) => {
            dispatch(ADD_PLAYLIST.TRIGGER({ name }));
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(LOAD_LIBRARY.TRIGGER(1));
    }, [dispatch]);

    const handleModal = useCallback(() => {
        setVisible(true);
    }, []);

    const data = useSelector(getLibrary);

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
                        renderItem={(item) => <PlaylistItem name={item.item.data.name} data={item.item} />}
                        keyExtractor={(item) => item.data.toString()}
                        extraData={extraData}
                        ListHeaderComponent={<AddPlaylistItem onPress={handleModal} />}
                    />
                )}
            </AnimatedGradientTransition>
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
                        <Icon name={'close'} size={24} color={theme.colors.secondary} />
                    </CrossButton>
                    <ModalText>{I18n.t('library.comeUpPlaylistName')}</ModalText>
                    <PlaylistInput autoFocus={true} onChangeText={(val) => setPlaylistName(val)} />
                    <LinearButton
                        title={'library.create'}
                        onPress={() => {
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
                        }}
                    />
                </ModalView>
            </AddPlaylistModal>
        </Container>
    );
};
