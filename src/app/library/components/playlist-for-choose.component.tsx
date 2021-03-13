import React from 'react';

import I18n from '../../utils/i18n';
import { LibraryData } from '../library.types';

import { PlaylistImageRender } from './playlist-item.component';
import { PlaylistContainer, InfoWrapper, PlaylistName, TracksAmount } from './styled/library.styles';

export interface Props {
    name: string;
    data: LibraryData;
    onPress: () => void;
}

export const PlaylistToChooseItem: React.FC<Props> = (props: Props) => {
    return (
        <PlaylistContainer onPress={props.onPress}>
            <PlaylistImageRender data={props.data} />
            <InfoWrapper>
                <PlaylistName>{props.data.liked ? I18n.t('library.favoriteTracks') : props.name}</PlaylistName>
                <TracksAmount>
                    {props.data.tracks === undefined
                        ? '0 ' + I18n.t('library.tracks')
                        : props.data.tracks.length.toString() + ' ' + I18n.t('library.tracks')}
                </TracksAmount>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
