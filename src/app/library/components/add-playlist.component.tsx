import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import I18n from '../../utils/i18n';

import {
    PlaylistContainer,
    PlaylistIconWrapper,
    PlaylistIcon,
    InfoWrapper,
    PlaylistName,
} from './playlist-styles.component';

export interface Props {
    onPress?: () => void;
}

export const AddPlaylistName = styled(PlaylistName)`
    margin-top: ${(props) => props.theme.spacer * 1.5 + 5};
`;

export const AddPlaylistItem: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <PlaylistContainer onPress={props.onPress}>
            <PlaylistIconWrapper>
                <PlaylistIcon>
                    <Icon name={'plus'} size={55} color={'white'} />
                </PlaylistIcon>
            </PlaylistIconWrapper>
            <InfoWrapper>
                <AddPlaylistName>{I18n.t('library.addNewPlaylist')}</AddPlaylistName>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
