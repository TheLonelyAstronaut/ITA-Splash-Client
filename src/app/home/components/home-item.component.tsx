import React from 'react';
import styled from 'styled-components/native';

import { Album } from '../../../mocks/albums';
import { Artist, Playlist } from '../../../types/music';
import { Image } from '../../ui/image.component';
import { RegularText } from '../../ui/text.component';
import { DEVICE_SIZE } from '../../ui/themes/themes';

export type PlaylistProps = {
    data: Playlist | Artist | Album;
};

export const Wrapper = styled.TouchableOpacity`
    height: ${DEVICE_SIZE.height * 0.16};
    width: ${DEVICE_SIZE.width * 0.22};
    background-color: ${(props) => props.theme.colors.screenBackground};
    margin-bottom: 5px;
    margin-left: ${(props) => props.theme.spacer * 3};
`;
export const PlaylistImage = styled(Image)`
    height: 100px;
    width: 100px;
    align-self: center;
`;
export const ArtistImage = styled(PlaylistImage)`
    border-radius: 100px;
`;
export const PlaylistName = styled(RegularText)`
    color: ${(props) => props.theme.colors.secondary};
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.small};
    margin-top: ${(props) => props.theme.spacer};
`;

export const HomeItemComponent: React.FC<PlaylistProps> = (data: PlaylistProps) => {
    const isArtist = (data.data as Artist).popularTracks;
    return (
        <Wrapper>
            {isArtist ? <ArtistImage source={data.data.image} /> : <PlaylistImage source={data.data.image} />}
            <PlaylistName>{data.data.name}</PlaylistName>
        </Wrapper>
    );
};
