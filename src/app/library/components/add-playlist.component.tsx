import React from 'react';
import styled from 'styled-components/native';

import I18n from '../../utils/i18n';

import { PlaylistContainer, PlaylistImage, InfoWrapper, PlaylistName } from './playlist-item.component';

export interface Props {
    onPress?: () => void;
}

export const AddPlaylistName = styled(PlaylistName)`
    margin-top: ${(props) => props.theme.spacer * 1.5};
`;

export const AddPlaylistItem: React.FC<Props> = (props: Props) => {
    return (
        <PlaylistContainer onPress={props.onPress}>
            <PlaylistImage source={require('../../../assets/add-icon.png')} />
            <InfoWrapper>
                <AddPlaylistName>{I18n.t('library.addNewPlaylist')}</AddPlaylistName>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
