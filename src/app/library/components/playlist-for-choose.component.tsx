import React from 'react';

import I18n from '../../utils/i18n';
import { LibraryData, LibraryElementType } from '../library.types';

import { PlaylistImageRender } from './playlist-item.component';
import { PlaylistContainer, InfoWrapper, PlaylistName, TracksAmount } from './playlist-styles.component';

export interface Props {
    name: string;
    data: LibraryData;
    onPress: () => void;
}

export const PlaylistToChooseItem: React.FC<Props> = (props: Props) => {
    return (
        <PlaylistContainer onPress={props.onPress}>
            <PlaylistImageRender type={props.data.type} data={props.data.data} />
            <InfoWrapper>
                <PlaylistName>
                    {props.data.type === LibraryElementType.LIKED ? I18n.t('library.favoriteTracks') : props.name}
                </PlaylistName>
                <TracksAmount>
                    {props.data.data.tracks === undefined
                        ? '0 ' + I18n.t('library.tracks')
                        : props.data.data.tracks.length.toString() + ' ' + I18n.t('library.tracks')}
                </TracksAmount>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
