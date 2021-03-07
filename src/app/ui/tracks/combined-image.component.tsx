import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import styled from 'styled-components/native';

import { Playlist, Album } from '../../../types/music';
import { Image } from '../image.component';
import { RegularText } from '../styled/text.styled';
import { DEVICE_SIZE } from '../themes/themes';

export const PlaylistContainer = styled.TouchableOpacity`
    width: ${DEVICE_SIZE.width}px;
    height: ${DEVICE_SIZE.height * 0.09}px;
    background-color: ${(props) => props.theme.colors.screenBackground};
    margin-bottom: ${(props) => props.theme.spacer * 3}px;
    flex-direction: row;
`;

export const PlaylistImage = styled(Image)`
    margin-top: ${(props) => props.theme.spacer * 3}px;
    width: 220px;
    height: 220px;
`;

export const PlaylistIconWrapper = styled.View`
    width: 90px;
    height: 90px;
    background-color: ${(props) => props.theme.colors.main};
    padding: 18px;
`;

export const PlaylistIcon = styled.View`
    align-self: center;
`;

export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
`;

export const InfoWrapper = styled.View`
    margin-left: ${(props) => props.theme.spacer * 2}px;
    margin-top: ${(props) => props.theme.spacer * 3}px;
`;

export const TracksAmount = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fontSize.small}px;
`;

export const CombinedImageContainer = styled.View`
    margin-top: ${(props) => props.theme.spacer * 3}px;
    width: 220px;
    height: 220px;
`;
export const CombinedImage = styled(Image)`
    width: 110px;
    height: 110px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
`;

export type Props = {
    data: Playlist | Album;
};

export const CombinedPlaylistImage: React.FC<Props> = (data: Props) => {
    const CombinedImageFunc = () => {
        if (data.data.tracks === undefined) return null;
        return (
            <CombinedImageContainer>
                <Wrapper>
                    <CombinedImage source={{ uri: `${data.data.tracks[0].artwork}` }} />
                    <CombinedImage source={{ uri: `${data.data.tracks[1].artwork}` }} />
                </Wrapper>
                <Wrapper>
                    <CombinedImage source={{ uri: `${data.data.tracks[2].artwork}` }} />
                    <CombinedImage source={{ uri: `${data.data.tracks[3].artwork}` }} />
                </Wrapper>
            </CombinedImageContainer>
        );
    };

    if (data.data.tracks === undefined) {
        return (
            <PlaylistIconWrapper>
                <PlaylistIcon>
                    <Icon name={'music-note'} size={50} color={'white'} />
                </PlaylistIcon>
            </PlaylistIconWrapper>
        );
    }
    if (data.data.tracks.length <= 4) {
        switch (data.data.tracks.length) {
            case 0:
                return (
                    <PlaylistIconWrapper>
                        <PlaylistIcon>
                            <Icon name={'music-note'} size={50} color={'white'} />
                        </PlaylistIcon>
                    </PlaylistIconWrapper>
                );
            case 1:
            case 2:
            case 3:
                return <PlaylistImage source={{ uri: data.data.tracks[0].artwork }} />;
            case 4:
                return <CombinedImageFunc />;
        }
    } else return <CombinedImageFunc />;
    return null;
};
