import React from 'react';
import styled from 'styled-components/native';

import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';
import I18n from '../../utils/i18n';
import { LibraryData, LibraryElementType } from '../library.types';

export interface Props {
    name: string;
    data: LibraryData;
}

export const PlaylistContainer = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width};
    height: ${DEVICE_SIZE.height * 0.09};
    background-color: ${(props) => props.theme.colors.screenBackground};
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    flex-direction: row;
`;

export const PlaylistImage = styled.Image`
    width: 90px;
    height: 90px;
    margin-left: ${(props) => props.theme.spacer * 3}px;
`;
export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
`;
export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 2};
    margin-top: ${(props) => props.theme.spacer * 3};
`;
export const TracksAmount = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small};
`;
export const CombinedImageContainer = styled.View`
    width: 90px;
    height: 90px;
    background-color: white;
    margin-left: ${(props) => props.theme.spacer * 3}px;
`;
export const Img = styled.Image`
    width: 45px;
    height: 45px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
`;
export const CombinedPlaylistImage: React.FC<LibraryData> = (data: LibraryData) => {
    return (
        <CombinedImageContainer>
            <Wrapper>
                <Img source={{ uri: `${data.data.tracks[0].artwork}` }} />
                <Img source={{ uri: `${data.data.tracks[1].artwork}` }} />
            </Wrapper>
            <Wrapper>
                <Img source={{ uri: `${data.data.tracks[2].artwork}` }} />
                <Img source={{ uri: `${data.data.tracks[3].artwork}` }} />
            </Wrapper>
        </CombinedImageContainer>
    );
};

export const PlaylistImageRender: React.FC<LibraryData> = (data: LibraryData) => {
    if (data.type === LibraryElementType.LIKED) {
        return <PlaylistImage source={require('../../../assets/fav-icon.png')} />;
    }
    if (data.data.tracks.length <= 4) {
        switch (data.data.tracks.length) {
            case 0:
                return <PlaylistImage source={require('../../../assets/blank-playlist.png')} />;
            case 1:
            case 3:
                return <PlaylistImage source={{ uri: data.data.tracks[0].artwork }} />;
            case 4:
                return <CombinedPlaylistImage data={data.data} type={data.type} />;
        }
    } else return <CombinedPlaylistImage data={data.data} type={data.type} />;

    return null;
};

export const PlaylistItem: React.FC<Props> = (props: Props) => {
    return (
        <PlaylistContainer>
            <PlaylistImageRender type={props.data.type} data={props.data.data} />
            <InfoWrapper>
                <PlaylistName>
                    {props.data.type === LibraryElementType.LIKED ? I18n.t('library.favoriteTracks') : props.name}
                </PlaylistName>
                <TracksAmount>{props.data.data.tracks.length.toString() + ' ' + I18n.t('library.tracks')}</TracksAmount>
            </InfoWrapper>
        </PlaylistContainer>
    );
};
